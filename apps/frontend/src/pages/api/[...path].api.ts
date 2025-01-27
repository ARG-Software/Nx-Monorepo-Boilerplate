import type { NextApiRequest, NextApiResponse } from 'next';
import { API_BASE_URL } from '@/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, url } = req;
  
  if (method === 'GET' || method === 'POST' || method === 'DELETE') {
    try {
      const targetUrl = `${API_BASE_URL}${url}`;

      const options: RequestInit = {
        method: method,
        headers: {
          cookie: req.headers.cookie || '',
          accept: req.headers.accept || 'application/json',
          'content-type': req.headers['content-type'] || 'application/json',
        },
        body: method === 'POST' ? JSON.stringify(req.body) : undefined,
        credentials: 'include',
      };

      const response = await fetch(targetUrl, options);

      const cookies = response.headers.get('set-cookie');
      if (cookies) {
        res.setHeader('Set-Cookie', cookies);
      }

      const result = await response.json();
      res.status(response.status).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
