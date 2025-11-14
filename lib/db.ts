import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PGSQL_USER,
  password: process.env.PGSQL_PASSWORD,
  host: process.env.PGSQL_HOST,
  port: process.env.PGSQL_PORT ? parseInt(process.env.PGSQL_PORT, 10) : undefined,
  database: process.env.PGSQL_DATABASE,
});

export default pool;