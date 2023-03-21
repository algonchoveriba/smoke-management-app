import { FC } from 'react'
import { BrandForm } from './BrandForm'
import { BrandList } from './BrandList'

export const BrandPanel: FC = () => {
  return (
    <div className="snap-center">
      <div className="mx-14 h-96 w-80 rounded-md border border-gray-200/30 bg-gray-200/30 p-4 shadow-lg backdrop-blur-lg">
        <span className="text-xl font-extrabold">本数登録</span>
        <BrandForm />
        <BrandList />
      </div>
    </div>
  )
}
