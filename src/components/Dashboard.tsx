import { useQueryClient } from 'react-query'
import {
  ArrowLeftOnRectangleIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/solid'
import { CounterForm } from '@/components/Counter/CounterForm'
import { CounterList } from '@/components/Counter/CounterList'
import { BrandForm } from '@/components/Brand/BrandForm'
import { BrandList } from '@/components/Brand/BrandList'
import { Session } from '@supabase/supabase-js'
import { Account } from './Account/Account'
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
        <div className="mx-14 h-96 w-80 rounded-md border border-gray-200/30 bg-gray-200/30 p-4 shadow-lg backdrop-blur-lg">
          <span className="text-xl font-extrabold">本数登録</span>
          <CounterForm />
          <CounterList />
        </div>
      </div>
      <span className="my-auto">
        <ArrowsRightLeftIcon className="h-10 w-10 text-gray-300" />
      </span>
      <div className="snap-center">
        <div className="mx-14 h-96 w-80 rounded-md border border-gray-200/30 bg-gray-200/30 p-4 shadow-lg backdrop-blur-lg">
          <span className="text-xl font-extrabold">銘柄登録</span>
          <BrandForm />
          <BrandList />
        </div>
      </div>
      <span className="my-auto">
        <ArrowsRightLeftIcon className="h-10 w-10 text-gray-300" />
      </span>
      <div className="snap-center">
        <div className="mx-14">
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
