import { Pool } from 'pg';

// Vercel and most cloud hosting platforms prefer a single DATABASE_URL connection string.
// This is the most reliable way to connect.
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // Log a severe error if the connection string is missing before trying to connect
  console.error("FATAL ERROR: DATABASE_URL environment variable is not set.");
  // Throwing an error here prevents the app from proceeding with a guaranteed failed connection.
  throw new Error("DATABASE_URL is missing.");
}


const pool = new Pool({
  // Use the single connection string
  connectionString: connectionString,
  // *** CRITICAL ADDITIONS FOR VERCEL/SUPABASE ***
  max: 2, // Limit connections to prevent serverless function memory exhaustion
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 10000, // Timeout connection after 10 seconds (increased from 2)
  // Add SSL settings required by Supabase/Render/many hosts for secure connection
  ssl: {
    // This allows the connection even if the certificate cannot be verified, 
    // which is common in development or certain cloud environments.
    rejectUnauthorized: false, 
  }
});

console.log('PostgreSQL Pool initialized using connectionString');

export default {
  // Use 'any' type for params array to match common usage in existing code
  query: (text: string, params: any[]) => pool.query(text, params),
}