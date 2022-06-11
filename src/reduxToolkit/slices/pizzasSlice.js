import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//Для запросов на сервер можем использовать асинхроннийєкшн от тулкита в котором нужно прокинуть названия слайса єто pizza в нашем случае и  
//указать название кастомное в нащем лучае фетчпизастатус
export const fetchPizzasToolKit = createAsyncThunk("pizza/fetchPizzasStatus", async (params) => {
    const { sortBy,order,category,search, currentPage } = params;
    const {data} = await axios.get(`https://62989024de3d7eea3c6aad4a.mockapi.io/items?page=${currentPage}&limit=6&${category}&sortBy=${sortBy}&order=${order}&search=${search}`)
    return data
})

const initialState = {
   items: [],
   status: "loading",
}


export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action){
            state.items = action.payload;
        }
    },

    //В Єкстра редюсере нам приходит три состояния от промиса которие ми можем обработать по аналогии с трай кетч ожидание ответа успешний овтет и ошибка
    extraReducers: {
        [fetchPizzasToolKit.pending]: (state) => {
            state.status = "loading";
            state.items = [];
        },

        [fetchPizzasToolKit.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = "success";
        },
        [fetchPizzasToolKit.rejected]: (state, action) => {
            state.status = "error";
            state.items = [];
        }
    }
})

export const selectPizzaData = state => state.pizzas;

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer