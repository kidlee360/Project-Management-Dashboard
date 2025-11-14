// pages/api/tasks.js (Requires the 'pages/api' folder structure)
import db from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next'; 
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = cookie.parse(req.headers.cookie || '');
  if (req.method === 'GET') {
    try {
      const userId = cookies.user_id;
      const result = await db.query(
        'SELECT * FROM tasks WHERE user_id = $1 ORDER BY id ASC',
        [userId]
      );
      // 💡 Fix: Use the standard Pages Router method for JSON response
      res.status(200).json(result.rows); 
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Failed to fetch tasks.' });
    }
  } else if (req.method === 'POST') {
    try {
      const [ task, description, due_date, columnname, priority ] = req.body;
      const userId = cookies.user_id;
        const result = await db.query(
        'INSERT INTO tasks (task, description, due_date, columnname, priority, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [task, description, due_date, columnname, priority, userId]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Failed to create task.' });
    }
  } else if(req.method === 'PUT'){
    try {
        const { id, task, description, due_date, columnname, priority } = req.body;
        const userId = cookies.user_id;
        const result = await db.query(
            'UPDATE tasks SET task = $1, description = $2, due_date = $3, columnname = $4, priority = $5 WHERE id = $6 RETURNING *',
            [task, description, due_date, columnname, priority, id]
        );
            res.status(200).json(result.rows[0])
    } catch (error){
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Failed to update task.' });
    }
  } else if(req.method === 'DELETE'){
    try {
        // 1. Get the task ID from the request body
        // Note: DELETE requests typically send data in the body or query params.
        // Sending in the body (req.body) is often cleaner for complex data.
        const { id } = req.body; 
        const userId = cookies.user_id; // Assuming auth checks later

        // 2. Execute the PostgreSQL DELETE command
        const result = await db.query(
            'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id',
            [id, userId] // Use parameterized query for security
        );

        // 3. Check if a row was actually deleted
        if (result.rowCount === 0) {
            // Task not found or not owned by the user
            return res.status(404).json({ error: 'Task not found or unauthorized.' });
        }

        // 4. Send a success response (typically status 204 or the ID of the deleted item)
        // 200 is also acceptable if you want to send JSON back.
        res.status(200).json({ id: id, message: 'Task deleted successfully.' });

    } catch (error) {
        console.error('Database Delete Error:', error);
        res.status(500).json({ error: 'Failed to delete task.' });
    }
  } else if (req.method === 'PATCH') {
    try {
        const { id, columnname } = req.body;
        if (!id || !columnname) {
            return res.status(400).json({ error: 'Task ID and column name are required.' });
        }
        const result = await db.query(
            'UPDATE tasks SET columnname = $1 WHERE id = $2 RETURNING *',
            [columnname, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Task not found.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Failed to update task column.' });
    }
  } else {
    // Handle other methods like POST, PUT, DELETE
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}