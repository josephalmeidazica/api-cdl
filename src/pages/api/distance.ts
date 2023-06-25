import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

// GET /api/filterPosts?searchString=:searchString
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?mode=walking&units=metric&origins=${req.body.origin}&destinations=${req.body.destination}&key=${process.env.GOOGLE_KEY}`);
    const jsonData = await response.json();

    const distance = jsonData['rows'][0]['elements'][0]['distance']['text']

  return res.json(distance)
}
