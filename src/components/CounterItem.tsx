import { FC } from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import useStore from '@/store'
import { useMutateCounter } from '@/hooks/useMutateCounter'
import { Database } from 'schema'
type Counter = Database['public']['Tables']['counters']['Row']

export const CounterItem: FC<Omit<Counter, 'created_at' | 'user_id'>> = ({
  id,
  number,
  brand_id,
}) => {
  const update = useStore((state) => state.updateEditedCounter)
  const { deleteCounterMutation } = useMutateCounter()

  return (
    <li className="my-3 text-lg font-extrabold">
      <span>{number}</span>
      <div className="float-right ml-20 flex">
        <PencilSquareIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            update({
              id: id,
              number: number,
              brand_id: brand_id,
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
    </li>
  )
}
