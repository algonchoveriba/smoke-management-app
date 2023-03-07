import { FormEvent, FC } from 'react'
import useStore from '@/store'
import { useMutateBrand } from '@/hooks/useMutateBrand'
import { useUser } from '@supabase/auth-helpers-react'
import { useQuery } from 'react-query'

export const BrandForm: FC = () => {
  const user = useUser()
  const { editedBrand } = useStore()
  const {} = useQuery('brands')
  const update = useStore((state) => state.updateEditedBrand)
  const { createBrandMutation, updateBrandMutation } = useMutateBrand()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedBrand.id === '' && user)
      createBrandMutation.mutate({
        name: editedBrand.name,
        price: editedBrand.price,
        user_id: user.id,
      })
    else {
      updateBrandMutation.mutate({
        id: editedBrand.id,
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
        {editedBrand.id ? 'Update' : 'Create'}
      </button>
    </form>
  )
}
