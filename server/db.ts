import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is required')
}

export const pool = new Pool({
  connectionString,
  max: 5,
  ssl: connectionString.includes('localhost')
    ? undefined
    : { rejectUnauthorized: false },
})
