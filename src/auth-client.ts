import { createAuthClient } from 'better-auth/react'
import { adminClient, magicLinkClient } from 'better-auth/client/plugins'

const configuredBaseUrl = import.meta.env.VITE_AUTH_BASE_URL?.trim()

export const authClient = createAuthClient({
  baseURL: configuredBaseUrl || window.location.origin,
  fetchOptions: {
    credentials: 'include',
  },
  plugins: [magicLinkClient(), adminClient()],
})
