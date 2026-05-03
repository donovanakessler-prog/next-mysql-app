import { getItems, countItems } from "./services/itemService";
import Link from "next/link";

export default async function Home({
  searchParams,
  }: {
    searchParams: Promise<{ page?: string }>;
  }) 
{
  const params = await searchParams;

  const page = parseInt(params.page || "1", 10);
  const limit = 5;
  const offset = (page - 1) * limit;

  let items = [];
  let total = 0;
  let error = null;

  try {
    items = await getItems(limit, offset);
    total = await countItems();
  } catch {
    error = "Failed to fetch data";
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">

        { /* Header */ }
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Item Dashboard
          </h1>
        </div>

        { /* Error */ }
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        { /* Card Container */ }
        <div className="bg-white shadow-sm rounded-xl border overflow-hidden">

          {/* Table Header */}
          <div className="grid grid-cols-3 bg-gray-100 text-gray-600 text-sm font-bold px-4 py-3">
            <div>ID</div>
            <div>Name</div>
            <div>Description</div>
          </div>

          { /* Rows */ }
          <div className="divide-y">
            {items.map((item: any) => (
              <div
                key={item.id}
                className="grid grid-cols-3 px-4 py-3 hover:bg-gray-50 transition"
              >
                <div className="text-gray-500">{item.id}</div>
                <div className="font-medium text-gray-900">
                  {item.name}
                </div>
                <div className="text-gray-600">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        { /* Pagination */ }       
        <div className="flex items-center justify-center mt-6 gap-2">

          { /* Previous button */ }
          <Link
            href={`/?page=${Math.max(page - 1, 1)}`}
            className={`px-3 py-2 rounded border text-sm ${
              page === 1
                ? "pointer-events-none opacity-40"
                : "hover:bg-gray-100"
            }`}
          >
            Prev
          </Link>

          { /* First page */ }
          {page > 2 && (
            <>
              <Link
                href="/?page=1"
                className="px-3 py-2 border rounded text-sm hover:bg-gray-100"
              >
                1
              </Link>

              {page > 3 && <span className="px-2 text-gray-400">...</span>}
            </>
          )}

          { /* Middle pages */ }
          {Array.from({ length: totalPages })
            .map((_, i) => i + 1)
            .filter(
              (p) =>
                p === page ||
                p === page - 1 ||
                p === page + 1
            )
            .map((p) => (
              <Link
                key={p}
                href={`/?page=${p}`}
                className={`px-3 py-2 border rounded text-sm ${
                  p === page
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {p}
              </Link>
            ))}

          { /* Last page */ }
          {page < totalPages - 1 && (
            <>
              {page < totalPages - 2 && (
                <span className="px-2 text-gray-400">...</span>
              )}

              <Link
                href={`/?page=${totalPages}`}
                className="px-3 py-2 border rounded text-sm hover:bg-gray-100"
              >
                {totalPages}
              </Link>
            </>
          )}

          { /* Next button */ }
          <Link
            href={`/?page=${Math.min(page + 1, totalPages)}`}
            className={`px-3 py-2 rounded border text-sm ${
              page === totalPages
                ? "pointer-events-none opacity-40"
                : "hover:bg-gray-100"
            }`}
          >
            Next
          </Link>
        </div>

      </div>
    </div>
  );
}