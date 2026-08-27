import { betterAuth } from 'better-auth'
import { admin, magicLink } from 'better-auth/plugins'
import { Resend } from 'resend'
import { pool } from './db.js'

const isVercelPreview = process.env.VERCEL_ENV === 'preview'
const isProduction =
  process.env.NODE_ENV === 'production' && !isVercelPreview

const vercelUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined

const authBaseUrl =
  process.env.BETTER_AUTH_URL ??
  vercelUrl ??
  (isProduction
    ? 'https://unfinishednotebooks.com'
    : 'http://localhost:3000')

async function sendMagicLink(email: string, url: string) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    if (!isProduction) {
      console.info(`[auth] Magic link for ${email}: ${url}`)
      return
    }

    throw new Error('RESEND_API_KEY is required in production')
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from:
      process.env.AUTH_EMAIL_FROM ??
      'Unfinished Notebooks <login@unfinishednotebooks.com>',
    to: email,
    subject: 'Your Unfinished Notebooks sign-in link',
    html: `
      <div style="background:#f4efe4;color:#25231f;font-family:Georgia,serif;padding:40px 24px">
        <div style="background:#fbf8f0;border:1px solid rgba(37,35,31,.16);border-radius:18px;max-width:520px;margin:0 auto;padding:36px">
          <p style="color:#7d503b;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase">Unfinished Notebooks</p>
          <h1 style="font-size:30px;font-weight:500;margin:18px 0 12px">Come back to your notebook.</h1>
          <p style="color:#6e675d;font-family:Arial,sans-serif;line-height:1.65;margin:0 0 28px">Use this link to sign in. It expires shortly and can only be used once.</p>
          <a href="${url}" style="background:#25231f;border-radius:999px;color:#fbf8f0;display:inline-block;font-family:Arial,sans-serif;font-size:14px;font-weight:700;padding:14px 22px;text-decoration:none">Sign in to Unfinished Notebooks</a>
        </div>
      </div>`,
    text: `Sign in to Unfinished Notebooks: ${url}`,
  })

  if (error) {
    throw new Error(`Unable to send magic link: ${error.message}`)
  }
}

export const auth = betterAuth({
  appName: 'Unfinished Notebooks',
  baseURL: authBaseUrl,
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://unfinishednotebooks.com',
    'https://www.unfinishednotebooks.com',
    'https://*.unfinishednotebooks.com',
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
  },
  advanced: {
    useSecureCookies: isProduction,
    crossSubDomainCookies: {
      enabled: isProduction,
      domain: isProduction ? '.unfinishednotebooks.com' : undefined,
    },
  },
  plugins: [
    magicLink({
      expiresIn: 60 * 10,
      storeToken: 'hashed',
      sendMagicLink: async ({ email, url }) => sendMagicLink(email, url),
    }),
    admin({
      defaultRole: 'user',
      adminRoles: ['admin'],
    }),
  ],
})
