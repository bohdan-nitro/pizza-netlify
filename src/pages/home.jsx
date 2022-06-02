import React, { useEffect, useState } from 'react';
import { Categories, PizzaBlock, SortPopUp, PizzaLoadingBlock } from "../components";

import { useDispatch, useSelector } from "react-redux";

import { setCategory, setSortBy } from "../redux/actions/filters";

import { fetchPizzas } from "../redux/actions/pizzas";
import axios from "axios";

import Pagination from '../components/Pagination';


const categoryNames = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];
const sortItems = [
    { name: "популярности", type: "popular", order: "desc" },
    { name: "цене", type: "price", order: "desc" },
    { name: "алфавиту", type: "name", order: "asc" }
];

function Home() {
    const dispatch = useDispatch();

    const items = useSelector(({ pizzas }) => pizzas.items);
    const cartItems = useSelector(({ cart }) => cart.items);
    const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
    const { category, sortBy } = useSelector(({ filter }) => filter);

/////////////////////////////////////////////////////////////
    const [pizzaItems, setPizzasItems] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [categoryId, setCategoryId] = useState(0);

    const [sortByType, setSortByType] = useState(0);

////////////////////////////////////////////////////////////////

    // useEffect(() => {
    //     dispatch(fetchPizzas(sortBy, category));
    // }, [sortBy, category]);

    useEffect(() => {
        axios.get("https://62989024de3d7eea3c6aad4a.mockapi.io/items").then(res => {
            return res.data
        }).then(arr => {
            setPizzasItems(arr);
            setIsLoading(false);
        })  


    }, [])



    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index));
    }, []);

    //Получает названия типа и будет его передавать в редакс

    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type));
    }, []);

    const handleAddPizzaToCart = (obj) => {
        dispatch({
            type: "ADD_PIZZA_CART",
            payload: obj,
        });
    };

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={category} onClickCategory={setCategoryId} items={categoryNames} value={categoryId} />
                <SortPopUp activeSortType={sortBy.type} items={sortItems} onClickSortType={onSelectSortType} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {/* {
                  isLoaded ? items.map((obj) => (
                       <PizzaBlock
                           onClickAddPizza={handleAddPizzaToCart }
                           key={obj.id}
                           addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                           isLoading={true}
                           {...obj}
                       />
                   )) : Array(12).fill(0).map((_, index) => <PizzaLoadingBlock key={index} />)} */}
               

                        {
                            isLoading ? [...new Array(8)].map((_, index) => <PizzaLoadingBlock key={index} /> ) :  pizzaItems.map((obj) => (
                                <PizzaBlock
                                    onClickAddPizza={() => console.log("ds")}
                                    key={obj.id}
                                    addedCount = { cartItems[obj.id] && cartItems[obj.id].items.length }
                                    isLoading = { true}
                                    { ...obj }
                                    />))
                        }
            </div>
            <Pagination />
        </div>
    );
}

export default Home;