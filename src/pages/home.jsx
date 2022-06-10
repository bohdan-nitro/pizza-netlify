import React, { useEffect, useRef, useState } from 'react';

import { Categories, PizzaBlock, SortPopUp, PizzaLoadingBlock } from "../components";

import qs from "qs"

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom"

import { setCategory, setSortBy } from "../redux/actions/filters";

import { setCategoryId, setPaginationId, setFilters } from '../reduxToolkit/slices/filterSlice';

import { fetchPizzasToolKit } from "../reduxToolkit/slices/pizzasSlice";

import axios from "axios";

import Pagination from '../components/Pagination';

import { sortList } from '../components/sortPopUp';

import Footer from '../components/Footer/Footer';




const categoryNames = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

const sortItems = [
    { name: "популярности", type: "popular", order: "desc" },
    { name: "цене", type: "price", order: "desc" },
    { name: "алфавиту", type: "name", order: "asc" }

];

function Home() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const isSearch = useRef(false);

    const isMounted = useRef(null);

    const categoryIdToolkit = useSelector(state => state.filter.categoryId);

    const paginatinToolkit = useSelector(state => state.filter.currentPage);

    const sortProperty = useSelector(state => state.filter.sort.sortProperty);

    const searchValue = useSelector(state => state.filter.searchValue);

   



    // const items = useSelector(({ pizzas }) => pizzas.items);sort

    /////////////////////////////////////////////////////////////
   



    const {items, status} = useSelector(state => state.pizzas);

    console.log(status, items)

  




    ////////////////////////////////////////////////////////////////

    // useEffect(() => {
    //     dispatch(fetchPizzas(sortBy, category));
    // }, [sortBy, category]);



    useEffect(() => {
        if (window.location.search) {
            //Сабстрингом убираем знак вопроса которий ми передаем внизу для запросов
            const params = qs.parse(window.location.search.substring(1));

            const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty)

            dispatch(setFilters({
                ...params,
                sort
            }))
            isSearch.current = true
        }
    }, []);

    //Получение пиц
    const sortBy = sortProperty.replace("-", "");
    const order = sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryIdToolkit > 0 ? `category=${categoryIdToolkit}` : "";

    const search = searchValue;

    const getPizzas = async () => {
        dispatch(fetchPizzasToolKit({
            sortBy,
            order,
            category,
            search,
            paginatinToolkit
          })) 
    }

    

    useEffect(() => {

        getPizzas();
        if (!isSearch.current) {
            
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            }, 200) 
        isSearch.current = false;

    }}, [categoryIdToolkit, paginatinToolkit, sortProperty, searchValue])


    //Отлавливаем url 

    useEffect(() => {

        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortProperty ? sortProperty : "raiting",
                categoryIdToolki: categoryIdToolkit ? categoryIdToolkit : 0,
                paginatinToolkit: paginatinToolkit ? paginatinToolkit : 0
            })
            navigate(`?${queryString}`)
        }

        isMounted.current = true;

    }, [categoryIdToolkit, paginatinToolkit, sortProperty])


    const onChangeCategoryId = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePaginationPage = (num) => {
        dispatch(setPaginationId(num))
    }


    //Получает названия типа и будет его передавать в редакс
    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type));
    }, []);




    const pizzas = items.map((obj) => (
        <PizzaBlock
            onClickAddPizza={() => console.log("ds")}
            key={obj.id}
            {...obj}
        />))

    const filteredWithSearch = pizzas.filter(obj => {
        if (obj.props.name.toLowerCase().includes(searchValue.toLowerCase())) {
            return true
        }
        return false
    }).map(obj => <PizzaBlock
            onClickAddPizza={() => console.log("ds")}
            key={obj.id}
            
            {...obj}
        />
    )

    const skeleton = [...new Array(8)].map((_, index) => <PizzaLoadingBlock key={index} />);



    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={categoryIdToolkit} onClickCategory={onChangeCategoryId} items={categoryNames} value={categoryIdToolkit} />
                <SortPopUp value={sortProperty} items={sortItems} onClickSortType={onSelectSortType} />
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


                { status === "loading" ? skeleton : pizzas }
            </div>
            <Pagination currentPage={paginatinToolkit} onChangePage={onChangePaginationPage} />
             <Footer/>
        </div>
    );
}

export default Home;