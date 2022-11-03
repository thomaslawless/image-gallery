// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){
  //check for secret to confirm if valid
  if(req.query.secret !== process.env.REVALIDATE_SECRET){
    return res.status(401).json({message: 'invalid token'})
  }

  try{
    //regenerate index route 
    await res.revalidate('/')
    return res.json({revalidated: true})
  } catch (err){
    return res.status(500).send('Error revalidating')
  }
}