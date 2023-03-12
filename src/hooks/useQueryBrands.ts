import { useQuery } from '@tanstack/react-query'
import { supabase } from 'utils/supabase'
import { Database } from 'schema'
type Brand = Database['public']['Tables']['brands']['Row']

export const useQueryBrands = () => {
  const getBrands = async () => {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      throw new Error(`${error.message}: ${error.details}`)
    }
    return data
  }
  return useQuery<Brand[], Error>({
    queryKey: ['brands'],
    queryFn: getBrands,
    staleTime: 0, //[ms]
    refetchOnWindowFocus: true,
  })
}
