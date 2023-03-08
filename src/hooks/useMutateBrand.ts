import { useQueryClient, useMutation } from 'react-query'
import useStore from '@/store'
import { supabase } from 'utils/supabase'
import { Database, EditedBrand } from 'schema'
type Brand = Database['public']['Tables']['brands']['Row']

export const useMutateBrand = () => {
  const queryClient = useQueryClient()
  const reset = useStore((state) => state.resetEditedBrand)

  const createBrandMutation = useMutation(
    async (brand: Omit<Brand, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('brands').insert(brand)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        const previousBrands = queryClient.getQueryData<Brand[]>('brands')
        if (previousBrands) {
          console.log(`res:${res}`)
          queryClient.setQueryData('brands', [...previousBrands, res[0]])
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const updateBrandMutation = useMutation(
    async (brand: EditedBrand) => {
      const { data, error } = await supabase
        .from('brands')
        .update({ name: brand.name, price: brand.price })
        .eq('id', brand.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res, variables) => {
        if (res !== null) {
          const previousBrands = queryClient.getQueryData<Brand[]>('brands')
          if (previousBrands) {
            queryClient.setQueryData(
              'brands',
              previousBrands.map((brand) =>
                brand.id === variables.id ? res[0] : brand
              )
            )
          }
          reset()
        }
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const deleteBrandMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('brands')
        .delete()
        .eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (_, variables) => {
        const previousBrands = queryClient.getQueryData<Brand[]>('brands')
        if (previousBrands) {
          queryClient.setQueryData(
            'brands',
            previousBrands.filter((brand) => brand.id !== variables)
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
  return { deleteBrandMutation, createBrandMutation, updateBrandMutation }
}
