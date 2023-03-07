import { useQuery } from 'react-query'
import { supabase } from 'utils/supabase'
import { Database } from 'schema'
type Counter = Database['public']['Views']['counters_view']['Row']

export const useQueryCounters = () => {
  const getCounters = async () => {
    const { data, error } = await supabase
      .from('counters_view')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }
    console.table(data)
    console.log(data)
    return data
  }
  return useQuery<Counter[], Error>({
    queryKey: 'counters',
    queryFn: getCounters,
    staleTime: Infinity,
  })
}
