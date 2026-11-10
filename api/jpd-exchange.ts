import type {VercelRequest,VercelResponse} from '@vercel/node';
import {createHash,timingSafeEqual} from 'node:crypto';
import {pool} from '../server/db.js';
const digest=(s:string)=>createHash('sha256').update(s).digest('hex');
export default async function handler(req:VercelRequest,res:VercelResponse){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST')return res.status(405).end();
  const secret=process.env.JPD_AUTH_BRIDGE_SECRET;
  const supplied=req.headers.authorization?.replace(/^Bearer /,'')||'';
  if(!secret||!supplied||Buffer.byteLength(secret)!==Buffer.byteLength(supplied)||!timingSafeEqual(Buffer.from(secret),Buffer.from(supplied)))return res.status(401).end();
  const code=typeof req.body?.code==='string'?req.body.code:'';
  if(!/^[a-f0-9]{64}$/.test(code))return res.status(400).end();
  try{
    const result=await pool.query('UPDATE jpd_auth_codes SET consumed_at=now() WHERE code_hash=$1 AND consumed_at IS NULL AND expires_at>now() RETURNING user_id',[digest(code)]);
    if(!result.rowCount)return res.status(401).end();
    const identity=await pool.query('SELECT email FROM "user" WHERE id=$1',[result.rows[0].user_id]);
    if(!identity.rowCount)return res.status(401).end();
    return res.status(200).json({userId:result.rows[0].user_id,email:identity.rows[0].email});
  }catch{return res.status(503).end()}
}
