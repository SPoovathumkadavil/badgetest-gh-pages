import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Avatar from './Avatar'
import { Button } from '../components/Button'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    async function getProfile() {
      setLoading(true)
      const { user } = session

      let { data, error } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error) {
        console.warn(error)
      } else if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }

      setLoading(false)
    }

    getProfile()
  }, [session])

  async function updateProfile(event, avatar_url) {
    event.preventDefault()

    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      username,
      avatar_url,
      updated_at: new Date(),
    }

    let { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } else {
      setAvatarUrl(avatar_url)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={updateProfile} className="form-widget">
      <Avatar
        url={avatar_url}
        size={150}
        onUpload={(event, url) => {
          updateProfile(event, url)
        }}
      />
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          required
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <button className="button block primary" type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </form>
  )
}