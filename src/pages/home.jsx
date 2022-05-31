import React from 'react';
import {Categories, PizzaBlock, SortPopUp, PizzaLoadingBlock} from "../components";

import {useDispatch, useSelector} from "react-redux";

import { setCategory, setSortBy } from "../redux/actions/filters";

import {fetchPizzas} from "../redux/actions/pizzas";
import axios from "axios";


const categoryNames = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];
const sortItems = [
    {name:"популярности", type: "popular", order: "desc"},
    {name:"цене", type: "price", order: "desc"},
    {name:"алфавиту", type: "name", order: "asc"}
];

function Home() {
    const dispatch = useDispatch();

    const items = useSelector(({pizzas}) => pizzas.items);
    const cartItems = useSelector(({cart}) => cart.items);
    const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded);
    const { category, sortBy } = useSelector(({filter}) => filter);


    React.useEffect(() => {
        dispatch(fetchPizzas(sortBy, category));
        axios.get("https://6295fb94c558d5000918b91b--gleeful-flan-b138e8.netlify.app/db.json/pizzas").then(res => console.log(res.data))
    },[sortBy, category]);


    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index));
    }, []);

    //Получает названия типа и будет его передавать в редакс

    const onSelectSortType = React.useCallback((type )=> {
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
                <Categories activeCategory={category} onClickCategory={onSelectCategory} items={categoryNames}/>
                <SortPopUp activeSortType={sortBy.type} items={sortItems} onClickSortType={onSelectSortType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                  isLoaded ? items.map((obj) => (
                       <PizzaBlock
                           onClickAddPizza={handleAddPizzaToCart }
                           key={obj.id}
                           addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                           isLoading={true}
                           {...obj}
                       />
                   )) : Array(12).fill(0).map((_, index) => <PizzaLoadingBlock key={index} />)}

            </div>
        </div>
    );
}

export default Home;