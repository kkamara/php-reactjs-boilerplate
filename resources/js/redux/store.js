import { configureStore, } from '@reduxjs/toolkit'
import RootReducer from "./reducers/index"

const store = configureStore({
  reducer: RootReducer,
})

export default store
