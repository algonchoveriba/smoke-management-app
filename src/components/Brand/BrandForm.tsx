import { FormEvent, FC } from 'react'
import useStore from '@/store'
import { useMutateBrand } from '@/hooks/useMutateBrand'
import { useUser } from '@supabase/auth-helpers-react'

export const BrandForm: FC = () => {
  const user = useUser()
  const { editedBrand } = useStore()
  const update = useStore((state) => state.updateEditedBrand)
  const { createBrandMutation, updateBrandMutation } = useMutateBrand()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedBrand.brand_id === '' && user)
      createBrandMutation.mutate({
        name: editedBrand.name,
        price: editedBrand.price,
        user_id: user.id,
      })
    else {
      updateBrandMutation.mutate({
        brand_id: editedBrand.brand_id,
        name: editedBrand.name,
        price: editedBrand.price,
      })
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="銘柄名？"
        value={editedBrand.name}
        onChange={(e) => update({ ...editedBrand, name: e.target.value })}
      />
      <input
        type="number"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="１本の値段？"
        value={editedBrand.price}
        onChange={(e) =>
          update({ ...editedBrand, price: e.target.valueAsNumber })
        }
      />
      <button
        type="submit"
        className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        {editedBrand.brand_id ? 'Update' : 'Create'}
      </button>
    </form>
  )
}
