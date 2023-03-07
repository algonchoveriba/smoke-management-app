import { useQueryClient } from 'react-query'
import {
  ArrowLeftOnRectangleIcon,
  SignalIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/solid'
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
    <div>
      <div className="grid grid-cols-2 gap-20">
        <div>
          <div>
            <DocumentTextIcon className="h-8 w-8 text-blue-500" />
          </div>
          <CounterForm />
          <CounterList />
        </div>
        <div>
          <div className="my-3 flex justify-center">
            <SignalIcon className="h-8 w-8 text-blue-500" />
          </div>
          <BrandForm />
          <BrandList />
        </div>
      </div>
      <ArrowLeftOnRectangleIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />

      <Account session={session} />
    </div>
  )
}
