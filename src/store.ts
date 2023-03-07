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
  editedCounter: { id: '', number: 1, brands_id: '', name: '' },
  editedBrand: { id: '', name: '', price: 30 },
  updateEditedCounter: (payload) =>
    set({
      editedCounter: {
        id: payload.id,
        number: payload.number,
        brands_id: payload.brands_id,
        name: payload.name,
      },
    }),
  resetEditedCounter: () =>
    set({ editedCounter: { id: '', number: 1, brands_id: '', name: '' } }),
  updateEditedBrand: (payload) =>
    set({
      editedBrand: {
        id: payload.id,
        name: payload.name,
        price: payload.price,
      },
    }),
  resetEditedBrand: () => set({ editedBrand: { id: '', name: '', price: 30 } }),
}))
export default useStore
