import { pool } from '@/app/lib/db';

//* Getter
export const getItems = async (limit = 5, offset = 0) => {
  const [rows] = await pool.query(
    'SELECT * FROM items LIMIT ? OFFSET ?',
    [limit, offset]
  );
  return rows as any[];
};

export const countItems = async () => {
  const [rows]: any = await pool.query(
    'SELECT COUNT(*) as count FROM items'
  );
  return rows[0].count;
};