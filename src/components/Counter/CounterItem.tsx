import { FC, useEffect } from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import useStore from '@/store'
import { useMutateCounter } from '@/hooks/useMutateCounter'
import { useUser } from '@supabase/auth-helpers-react'
import { Database } from 'schema'
import { useQueryBrands } from '@/hooks/useQueryBrands'
type Counter = Database['public']['Tables']['counters']['Row']

export const CounterItem: FC<Omit<Counter, 'created_at'>> = ({
  id,
  number,
  brand_id,
  user_id,
}) => {
  const user = useUser()
  const { data: brands } = useQueryBrands()
  let name
  brands?.forEach((brand) => {
    if (brand.brand_id === brand_id) {
      name = brand.name
    }
  })

  const update = useStore((state) => state.updateEditedCounter)
  const { deleteCounterMutation } = useMutateCounter()

  return (
    <li className="my-3 text-lg font-medium">
      <span>{number}本</span>
      <span>/{name}</span>
      {user?.id === user_id && (
        <div className="float-right m-2 flex">
          <PencilSquareIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-700"
            onClick={() => {
              update({
                id: id,
                number: number,
                brand_id: brand_id,
              })
            }}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-blue-700"
            onClick={() => {
              deleteCounterMutation.mutate(id)
            }}
          />
        </div>
      )}
    </li>
  )
}
