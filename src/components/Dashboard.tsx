import { useQueryClient } from 'react-query'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import { CounterForm } from '@/components/CounterForm'
import { CounterList } from '@/components/CounterList'
import { BrandForm } from '@/components/BrandForm'
import { BrandList } from '@/components/BrandList'
import { Session } from '@supabase/supabase-js'
import { Account } from './Account'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from 'schema'

export const Dashboard = ({ session }: { session: Session }) => {
  const supabase = useSupabaseClient<Database>()
  const queryClient = useQueryClient()
  const signOut = () => {
    supabase.auth.signOut()
    queryClient.removeQueries('counters')
    queryClient.removeQueries('brands')
  }

  return (
    <div className="flex snap-x overflow-x-auto">
      <div className="snap-center">
        <div className="mx-2 h-96 w-80 rounded-md border border-gray-200/30 bg-gray-200/30 p-4 shadow-lg backdrop-blur-lg">
          <span className="text-xl font-extrabold">本数登録</span>
          <CounterForm />
          <CounterList />
        </div>
      </div>

      <div className="snap-center">
        <div className="mx-2 h-96 w-80 rounded-md border border-gray-200/30 bg-gray-200/30 p-4 shadow-lg backdrop-blur-lg">
          <span className="text-xl font-extrabold">銘柄登録</span>
          <BrandForm />
          <BrandList />
        </div>
      </div>

      <div className="snap-center">
        <div className="mx-2">
          <Account session={session} />
        </div>
      </div>
      <ArrowLeftOnRectangleIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
    </div>
  )
}
