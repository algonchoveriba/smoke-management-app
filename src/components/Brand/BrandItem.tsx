import { FC } from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import useStore from '@/store'
import { useMutateBrand } from '@/hooks/useMutateBrand'
import { useUser } from '@supabase/auth-helpers-react'
import { Database } from 'schema'
type Brand = Database['public']['Tables']['brands']['Row']

export const BrandItem: FC<Omit<Brand, 'created_at'>> = ({
  brand_id,
  name,
  price,
  user_id,
}) => {
  const user = useUser()
  const update = useStore((state) => state.updateEditedBrand)
  const { deleteBrandMutation } = useMutateBrand()

  return (
    <li className="my-3 text-lg font-medium">
      <span>¥{price}</span>
      <span>/{name}</span>
      {user?.id === user_id && (
        <div className="float-right m-2 flex">
          <PencilSquareIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-700"
            onClick={() => {
              update({
                brand_id: brand_id,
                name: name,
                price: price,
              })
            }}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-blue-700"
            onClick={() => {
              deleteBrandMutation.mutate(brand_id)
            }}
          />
        </div>
      )}
    </li>
  )
}
