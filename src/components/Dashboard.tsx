import { useQueryClient } from '@tanstack/react-query'
import {
  ArrowLeftOnRectangleIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/solid'
import { Session } from '@supabase/supabase-js'
import { Account } from './Account/Account'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from 'schema'
import { CounterPanel } from './Counter/CounterPanel'
import { BrandPanel } from './Brand/BrandPanel'

export const Dashboard = ({ session }: { session: Session }) => {
  const supabase = useSupabaseClient<Database>()
  const queryClient = useQueryClient()
  const signOut = () => {
    supabase.auth.signOut()
    queryClient.removeQueries(['counters'])
    queryClient.removeQueries(['brands'])
  }

  return (
    <div className="flex snap-x overflow-x-auto">
      <CounterPanel />
      <span className="my-auto">
        <ArrowsRightLeftIcon className="h-10 w-10 text-gray-300" />
      </span>
      <BrandPanel />
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
