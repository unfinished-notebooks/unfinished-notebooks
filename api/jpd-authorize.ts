import type {VercelRequest,VercelResponse} from '@vercel/node';
import {createHash,randomBytes,timingSafeEqual} from 'node:crypto';
import {auth} from '../server/auth.js';
import {pool} from '../server/db.js';

const callback='https://apps.josiahpdunham.com/api/auth/callback';
const digest=(s:string)=>createHash('sha256').update(s).digest('hex');
export default async function handler(req:VercelRequest,res:VercelResponse){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='GET')return res.status(405).end();
  const state=typeof req.query.state==='string'?req.query.state:'';
  if(!/^[a-f0-9]{64}$/.test(state))return res.status(400).json({error:'Invalid state'});
  const session=await auth.api.getSession({headers:new Headers({cookie:req.headers.cookie||''})});
  if(!session?.user?.id){
    const returnUrl=new URL('/login','https://unfinishednotebooks.com');
    returnUrl.searchParams.set('redirectTo',new URL(req.url||'','https://unfinishednotebooks.com').toString());
    return res.redirect(302,returnUrl.toString());
  }
  const code=randomBytes(32).toString('hex');
  try{
    await pool.query('INSERT INTO jpd_auth_codes(code_hash,user_id,expires_at) VALUES($1,$2,now()+interval \'2 minutes\')',[digest(code),session.user.id]);
  }catch{return res.status(503).json({error:'Identity bridge not initialized'})}
  const url=new URL(callback);url.searchParams.set('code',code);url.searchParams.set('state',state);
  return res.redirect(302,url.toString());
}
