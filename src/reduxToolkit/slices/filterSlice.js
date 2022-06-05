import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  categoryId: 0,
  sort: {
    name: "Популярности",
    sortProperty: "rating"
  },
    value: 1,
  }
  
  
  export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    //Мы можем хранить несколько редюсеров в нашем слайсе
    reducers: {
      
     setCategoryId(state, action){
      state.categoryId = action.payload;
     },
     setPaginationId(state, action){
      state.value = action.payload
     },
     setSort(state, action){
      state.sort = action.payload
     }
    },
  })
  
  export const { setCategoryId, setPaginationId, setSort } = filterSlice.actions
  
  export default filterSlice.reducer