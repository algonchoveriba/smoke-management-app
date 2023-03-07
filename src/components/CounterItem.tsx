import { FC } from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import useStore from '@/store'
import { useMutateCounter } from '@/hooks/useMutateCounter'
import { Database } from 'schema'
import { useUser } from '@supabase/auth-helpers-react'
type Counter = Database['public']['Views']['counters_view']['Row']

export const CounterItem: FC<Omit<Counter, 'created_at'>> = ({
  id,
  number,
  name,
  user_id,
  brands_id,
}) => {
  const user = useUser()
  const update = useStore((state) => state.updateEditedCounter)
  const { deleteCounterMutation } = useMutateCounter()
  const { editedBrand, editedCounter } = useStore()
  console.log(CounterItem)

  return (
    <li className="my-3 text-lg font-extrabold">
      <span>{number}本</span>
      {user?.id === user_id && editedBrand.id === editedCounter.brands_id ? (
        <span>/{name}</span>
      ) : (
        ''
      )}
      {user?.id === user_id && (
        <div className="float-right ml-20 flex">
          <PencilSquareIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              update({
                id: id,
                number: number,
                brands_id: brands_id,
                name: name,
              })
            }}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              deleteCounterMutation.mutate(id)
            }}
          />
        </div>
      )}
    </li>
  )
}
