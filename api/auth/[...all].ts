import type { VercelRequest, VercelResponse } from '@vercel/node'
import { toNodeHandler } from 'better-auth/node'
import { auth } from '../../server/auth.js'

const handler = toNodeHandler(auth.handler)

function isTrustedOrigin(origin: string) {
  if (origin === 'http://localhost:3000' || origin === 'http://localhost:5173') {
    return true
  }

  try {
    const url = new URL(origin)
    return (
      url.protocol === 'https:' &&
      (url.hostname === 'unfinishednotebooks.com' ||
        url.hostname.endsWith('.unfinishednotebooks.com'))
    )
  } catch {
    return false
  }
}

export const config = {
  api: { bodyParser: false },
}

export default async function authHandler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const origin = request.headers.origin

  if (origin && isTrustedOrigin(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
    response.setHeader('Access-Control-Allow-Credentials', 'true')
    response.setHeader('Vary', 'Origin')
  }

  if (request.method === 'OPTIONS') {
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    response.setHeader('Access-Control-Max-Age', '86400')
    return response.status(204).end()
  }

  return handler(request, response)
}
