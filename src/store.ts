import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { EditedCounter, EditedBrand } from 'schema'
import { useQueryBrands } from './hooks/useQueryBrands'

type State = {
  editedCounter: EditedCounter
  editedBrand: EditedBrand
  updateEditedCounter: (payloadCounter: EditedCounter) => void
  updateEditedBrand: (payloadBrand: EditedBrand) => void
  resetEditedCounter: () => void
  resetEditedBrand: () => void
}

const useStore = create<State>()(
  devtools((set) => ({
    editedCounter: { id: '', number: 1, brand_id: '' },
    updateEditedCounter: (payloadCounter) =>
      set({
        editedCounter: {
          id: payloadCounter.id,
          number: payloadCounter.number,
          brand_id: payloadCounter.brand_id,
        },
      }),
    resetEditedCounter: () =>
      set({ editedCounter: { id: '', number: 1, brand_id: '' } }),

    editedBrand: { brand_id: '', name: '', price: 30 },
    updateEditedBrand: (payloadBrand) =>
      set({
        editedBrand: {
          brand_id: payloadBrand.brand_id,
          name: payloadBrand.name,
          price: payloadBrand.price,
        },
      }),
    resetEditedBrand: () =>
      set({ editedBrand: { brand_id: '', name: '', price: 30 } }),
  }))
)
export default useStore
