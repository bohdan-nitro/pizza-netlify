import React, { useEffect, useRef, useState } from 'react';
import {Link} from "react-router-dom";

import { Categories, PizzaBlock, SortPopUp, PizzaLoadingBlock } from "../components";

import qs from "qs"

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom"

import { setCategoryId, setPaginationId, setFilters, setSort, selectFilter, selectSort } from '../reduxToolkit/slices/filterSlice';

import { fetchPizzasToolKit, selectPizzaData } from "../reduxToolkit/slices/pizzasSlice";

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

    const {items, status} = useSelector(selectPizzaData);

    const {currentPage, categoryId, searchValue} = useSelector(selectFilter);

    const {sortProperty} = useSelector(selectSort)

    //Как било без селекторов

    // const categoryIdToolkit = useSelector(state => state.filter.categoryId);

    // const paginatinToolkit = useSelector(state => state.filter.currentPage);

    // const sortProperty = useSelector(state => state.filter.sort.sortProperty);

    // const searchValue = useSelector(state => state.filter.searchValue);

 


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
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue;

    const getPizzas = async () => {
        dispatch(fetchPizzasToolKit({
            sortBy,
            order,
            category,
            search,
            currentPage
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

    }}, [categoryId, currentPage, sortProperty, searchValue])


    //Отлавливаем url 

    useEffect(() => {

        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortProperty ? sortProperty : "raiting",
                categoryIdToolki: categoryId ? categoryId : 0,
                paginatinToolkit: currentPage ? currentPage : 0
            })
            navigate(`?${queryString}`)
        }

        isMounted.current = true;

    }, [categoryId, currentPage, sortProperty])


    const onChangeCategoryId = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePaginationPage = (num) => {
        dispatch(setPaginationId(num))
    }


    //Получает названия типа и будет его передавать в редакс
    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSort(type));
    }, []);




    const pizzas = items.map((obj) => (
         <PizzaBlock
            {...obj}
        />
        ))

    const skeleton = [...new Array(8)].map((_, index) => <PizzaLoadingBlock key={index} />);



    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={categoryId} onClickCategory={onChangeCategoryId} items={categoryNames} value={categoryId} />
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
            <Pagination activePage={currentPage} onChangePage={onChangePaginationPage} />
        </div>
    );
}

export default Home;