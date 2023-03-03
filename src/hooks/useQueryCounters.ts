import { useQuery } from 'react-query'
import { supabase } from 'utils/supabase'
import { Database } from 'schema'
type Counter = Database['public']['Tables']['counters']['Row']

export const useQueryCounters = () => {
  const getCounters = async () => {
    const { data, error } = await supabase
      .from('counters')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }
    return data
  }
  return useQuery<Counter[], Error>({
    queryKey: 'counters',
    queryFn: getCounters,
    staleTime: Infinity,
  })
}
