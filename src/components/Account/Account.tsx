import { useState, useEffect } from 'react'
import {
  useUser,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react'
import { Database } from 'schema'
import { Avatar } from './Avatar'
type Profiles = Database['public']['Tables']['profiles']['Row']

export const Account = ({ session }: { session: Session }) => {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [avatar_url, setAvatar_url] = useState<Profiles['avatar_url']>(null)

  useEffect(() => {
    getProfile()
    console.log('更新')
    console.log(session)
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      console.log('get profile ...')

      let { data, error, status } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setAvatar_url(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  async function updateProfile({
    username,
    avatar_url,
  }: {
    username: Profiles['username']
    avatar_url: Profiles['avatar_url']
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      console.log('profile update ...')

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-96 w-80 rounded-md border border-gray-200/30 bg-gray-200/30 p-4 shadow-lg backdrop-blur-lg">
      <Avatar
        uid={user!.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatar_url(url)
          updateProfile({ username, avatar_url: url })
        }}
      />
      {/* ... */}
      <div className="">
        <div className="flex flex-col">
          <label className="mt-1 px-1 text-gray-100" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-sm border border-gray-200/30 bg-gray-200/10 px-1 text-gray-100 shadow-sm"
            id="email"
            type="text"
            value={session.user.email}
            disabled
          />
        </div>
        <div className="flex flex-col">
          <label className="mt-1 px-1 text-gray-100" htmlFor="username">
            Username
          </label>
          <input
            className="rounded-sm border border-gray-200/30 bg-gray-200/10 px-1 text-gray-100 shadow-sm"
            id="username"
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>

      <div className="">
        <button
          className="my-2 w-32 rounded-full bg-indigo-500/80 px-2 text-gray-100"
          onClick={() => updateProfile({ username, avatar_url })}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button
          className="my-2 w-28 rounded-full bg-indigo-700/80 px-2 text-gray-100"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
