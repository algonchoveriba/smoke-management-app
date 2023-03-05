import { FormEvent, FC } from 'react'
import useStore from '@/store'
import { useMutateCounter } from '@/hooks/useMutateCounter'
import { useUser } from '@supabase/auth-helpers-react'

export const CounterForm: FC = () => {
  const user = useUser()
  const { editedCounter } = useStore()
  const update = useStore((state) => state.updateEditedCounter)
  const { createCounterMutation, updateCounterMutation } = useMutateCounter()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedCounter.id === '' && user)
      createCounterMutation.mutate({
        number: editedCounter.number,
        user_id: user.id,
        brand_id: editedCounter.brand_id,
      })
    else {
      updateCounterMutation.mutate({
        id: editedCounter.id,
        number: editedCounter.number,
        brand_id: editedCounter.brand_id,
      })
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <input
        type="number"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="本数？"
        value={editedCounter.number}
        onChange={(e) =>
          update({ ...editedCounter, number: e.target.valueAsNumber })
        }
      />
      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="銘柄？"
        value={editedCounter.number}
        onChange={(e) =>
          update({ ...editedCounter, number: e.target.valueAsNumber })
        }
      />
      <button
        type="submit"
        className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        {editedCounter.id ? 'Update' : 'Create'}
      </button>
    </form>
  )
}
