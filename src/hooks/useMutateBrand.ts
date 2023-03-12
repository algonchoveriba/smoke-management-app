import { useQueryClient, useMutation } from '@tanstack/react-query'
import useStore from '@/store'
import { supabase } from 'utils/supabase'
import { Database, EditedBrand } from 'schema'
type Brand = Database['public']['Tables']['brands']['Row']

export const useMutateBrand = () => {
  const queryClient = useQueryClient()
  const reset = useStore((state) => state.resetEditedBrand)

  const createBrandMutation = useMutation(
    async (brand: Omit<Brand, 'brand_id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('brands')
        .insert(brand)
        .select('*')
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        const previousBrands = queryClient.getQueryData<Brand[]>(['brands'])
        if (previousBrands) {
          queryClient.setQueryData(['brands'], [...previousBrands, res[0]])
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
        .eq('brand_id', brand.brand_id)
        .select('*')
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res, variables) => {
        const previousBrands = queryClient.getQueryData<Brand[]>(['brands'])
        if (previousBrands) {
          queryClient.setQueryData(
            ['brands'],
            previousBrands.map((brand) =>
              brand.brand_id === variables.brand_id ? res[0] : brand
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
  const deleteBrandMutation = useMutation(
    async (brand_id: string) => {
      const { data, error } = await supabase
        .from('brands')
        .delete()
        .eq('brand_id', brand_id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (_, variables) => {
        const previousBrands = queryClient.getQueryData<Brand[]>(['brands'])
        if (previousBrands) {
          queryClient.setQueryData(
            ['brands'],
            previousBrands.filter((brand) => brand.brand_id !== variables)
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
