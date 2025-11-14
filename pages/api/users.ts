import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {username, email, password, account} = req.body;
    if (account){
    try {
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
      const result  = await pool.query(
        'SELECT * FROM users WHERE username = $1 OR email = $2',
        [username, email]
      );
      const user = result.rows[0];
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      res.setHeader('Set-Cookie', [
        `user_id=${user.id}; HttpOnly; Path=/; Max-Age=60*60*24*7; Secure; SameSite=Lax`
      ]);
      res.status(201).json({ message: 'Login successful'});
      return(user.id);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });


    }}else{  
    try {
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email and password are required' });
      }
      const cUser  = await pool.query(
        'SELECT * FROM users WHERE username = $1 AND email = $2',
        [username, email]
      );
      if (cUser.rows.length > 0) {
        return res.status(401).json({ message: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, hashedPassword]
      );
      res.setHeader('Set-Cookie', [
        `user_id=${user.rows[0].id}; HttpOnly; Path=/; Max-Age=60*60*24*7; Secure; SameSite=Lax`
      ]);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error. It did not work' });
    }}

  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
