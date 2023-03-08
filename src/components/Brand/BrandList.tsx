import { FC } from 'react'
import { useQueryBrands } from '@/hooks/useQueryBrands'
import { Spinner } from '../Spinner'
import { BrandItem } from './BrandItem'

export const BrandList: FC = () => {
  const { data: brands, status } = useQueryBrands()
  if (status === 'loading') return <Spinner />
  if (status === 'error') return <p>{'Error'}</p>
  return (
    <ul className="my-2">
      {brands?.map((brand) => (
        <BrandItem
          key={brand.id}
          id={brand.id}
          name={brand.name}
          price={brand.price}
          user_id={brand.user_id}
        />
      ))}
    </ul>
  )
}
