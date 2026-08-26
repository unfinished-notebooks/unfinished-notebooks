import { FormEvent, useState, type ReactNode } from 'react'
import { authClient } from './auth-client'

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-page">
      <a className="auth-wordmark" href="/">UNFINISHED NOTEBOOKS</a>
      <section className="auth-paper">{children}</section>
      <p className="auth-footnote">One account. Every unfinished notebook.</p>
    </main>
  )
}

export function LoginPage() {
  const { data: session, isPending } = authClient.useSession()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  if (!isPending && session) {
    window.location.replace('/account')
    return null
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSending(true)

    const callbackURL = new URL('/account', window.location.origin).toString()
    const { error: authError } = await authClient.signIn.magicLink({
      email,
      callbackURL,
      errorCallbackURL: new URL('/login', window.location.origin).toString(),
    })

    setSending(false)
    if (authError) {
      setError(authError.message ?? 'We could not send that link. Please try again.')
      return
    }

    setSubmitted(true)
  }

  return (
    <AuthLayout>
      <p className="kicker">Welcome back</p>
      <h1>Open your notebooks.</h1>
      {submitted ? (
        <div className="auth-message" role="status">
          <strong>Check your inbox.</strong>
          <p>We sent a one-time sign-in link to {email}.</p>
          <button className="text-button" type="button" onClick={() => setSubmitted(false)}>
            Use a different email
          </button>
        </div>
      ) : (
        <form className="auth-form" onSubmit={submit}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-primary" type="submit" disabled={sending}>
            {sending ? 'Sending…' : 'Email me a sign-in link'}
          </button>
        </form>
      )}
      <p className="auth-helper">No password to remember. The link expires in ten minutes.</p>
    </AuthLayout>
  )
}

export function AccountPage() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return <AuthLayout><p>Opening your notebook…</p></AuthLayout>
  }

  if (!session) {
    window.location.replace('/login')
    return null
  }

  const role = session.user.role ?? 'user'

  async function signOut() {
    await authClient.signOut()
    window.location.replace('/')
  }

  return (
    <AuthLayout>
      <p className="kicker">Your account</p>
      <h1>Good to have you back.</h1>
      <dl className="account-details">
        <div><dt>Email</dt><dd>{session.user.email}</dd></div>
        <div><dt>Role</dt><dd className="role-pill">{role}</dd></div>
      </dl>
      <div className="account-actions">
        <a className="button button-primary" href="/">Go to Unfinished Notebooks</a>
        {role === 'admin' && <a className="text-link" href="/admin">Manage users →</a>}
        <button className="text-button" type="button" onClick={signOut}>Sign out</button>
      </div>
    </AuthLayout>
  )
}

export function AdminPage() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return <AuthLayout><p>Checking permissions…</p></AuthLayout>
  }

  if (!session) {
    window.location.replace('/login')
    return null
  }

  if (session.user.role !== 'admin') {
    return (
      <AuthLayout>
        <p className="kicker">Private page</p>
        <h1>This margin is admin-only.</h1>
        <a className="text-link" href="/account">Return to your account →</a>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <p className="kicker">Administration</p>
      <h1>User management is ready.</h1>
      <p className="auth-helper">
        The shared identity service recognizes this account as an administrator.
        User-management controls can grow here as the notebooks gain members.
      </p>
      <a className="text-link" href="/account">Return to your account →</a>
    </AuthLayout>
  )
}
