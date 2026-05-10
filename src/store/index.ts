import { configureStore } from '@reduxjs/toolkit'
import { gamificationDialogReducer } from './gamificationDialogSlice'

export const store = configureStore({
  reducer: {
    gamificationDialog: gamificationDialogReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
