import { FC, useEffect } from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import useStore from '@/store'
import { useMutateBrand } from '@/hooks/useMutateBrand'
import { useUser } from '@supabase/auth-helpers-react'
import { Database } from 'schema'
type Brand = Database['public']['Tables']['brands']['Row']

export const BrandItem: FC<Omit<Brand, 'created_at'>> = ({
  id,
  name,
  price,
  user_id,
}) => {
  const user = useUser()
  const update = useStore((state) => state.updateEditedBrand)
  const { deleteBrandMutation } = useMutateBrand()

  return (
    <li className="my-3 text-lg font-extrabold">
      <span>{name}</span>
      {user?.id === user_id && (
        <div className="float-right ml-20 flex">
          <PencilSquareIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              update({
                id: id,
                name: name,
                price: price,
              })
            }}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              deleteBrandMutation.mutate(id)
            }}
          />
        </div>
      )}
    </li>
  )
}