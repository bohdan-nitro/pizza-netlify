import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  searchValue: "",
  categoryId: 0,
  sort: {
    name: "Популярности",
    sortProperty: "rating"
  },
    currentPage: 1,
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
      state.currentPage = action.payload
     },
     setSort(state, action){
      state.sort = action.payload
     },
     setSearchValue(state, action){
      state.searchValue = action.payload;
     },
     setFilters(state, action){
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
     },
    },
  })
  
  export const { setCategoryId, setPaginationId, setSort, setSearchValue, setFilters } = filterSlice.actions
  
  export default filterSlice.reducer