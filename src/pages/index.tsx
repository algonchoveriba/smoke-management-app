import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import AuthUI from '@/components/AuthUI'

const Home = () => {
  return (
    <div>
      <AuthUI />
    </div>
  )
}

export default Home
