import { useQueryClient, useMutation } from 'react-query'
import useStore from '@/store'
import { supabase } from 'utils/supabase'
import { Database, EditedCounter } from 'schema'
type Counter = Database['public']['Tables']['counters']['Row']

export const useMutateCounter = () => {
  const queryClient = useQueryClient()
  const reset = useStore((state) => state.resetEditedCounter)

  const createCounterMutation = useMutation(
    async (counter: Omit<Counter, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('counters').insert(counter)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        const previousCounters = queryClient.getQueryData<Counter[]>('counters')
        if (previousCounters) {
          queryClient.setQueryData('counters', [...previousCounters, res![0]])
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const updateCounterMutation = useMutation(
    async (counter: EditedCounter) => {
      const { data, error } = await supabase
        .from('counters')
        .update({ number: counter.number, brand_id: counter.brand_id })
        .eq('id', counter.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res, variables) => {
        const previousCounters = queryClient.getQueryData<Counter[]>('counters')
        if (previousCounters) {
          queryClient.setQueryData(
            'counters',
            previousCounters.map((counter) =>
              counter.id === variables.id ? res![0] : counter
            )
          )
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const deleteCounterMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('counters')
        .delete()
        .eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (_, variables) => {
        const previousCounters = queryClient.getQueryData<Counter[]>('counters')
        if (previousCounters) {
          queryClient.setQueryData(
            'counters',
            previousCounters.filter((counter) => counter.id !== variables)
          )
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  return { deleteCounterMutation, createCounterMutation, updateCounterMutation }
}
