import { create } from 'zustand'
import { EditedCounter, EditedBrand } from 'schema'

type State = {
  editedCounter: EditedCounter
  editedBrand: EditedBrand
  updateEditedCounter: (payload: EditedCounter) => void
  updateEditedBrand: (payload: EditedBrand) => void
  resetEditedCounter: () => void
  resetEditedBrand: () => void
}
const useStore = create<State>((set) => ({
  editedCounter: { id: '', number: 0, brand_id: '' },
  editedBrand: { id: '', name: '', price: 0 },
  updateEditedCounter: (payload) =>
    set({
      editedCounter: {
        id: payload.id,
        number: payload.number,
        brand_id: payload.brand_id,
      },
    }),
  resetEditedCounter: () =>
    set({ editedCounter: { id: '', number: 0, brand_id: '' } }),
  updateEditedBrand: (payload) =>
    set({
      editedBrand: {
        id: payload.id,
        name: payload.name,
        price: payload.price,
      },
    }),
  resetEditedBrand: () => set({ editedBrand: { id: '', name: '', price: 0 } }),
}))
export default useStore
