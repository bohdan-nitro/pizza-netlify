import React from 'react';
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';

import { setSort, selectSort } from '../reduxToolkit/slices/filterSlice';

export const sortList = [
    { name: 'популярности (DESC)', sortProperty:"raiting" },
    { name: 'популярности (ASC)', sortProperty: "-raiting"},
    { name: 'цене (DESC)', sortProperty: "price" },
    { name: 'цене (ASC)', sortProperty: "-price" },
    { name: 'алфавиту (DESC)', sortProperty: "title"},
    { name: 'алфавиту (ASC)', sortProperty: "-title"},
  ];


const SortPopUp = () => {
    const sortData = useSelector(selectSort)

    const dispatch = useDispatch();

    const [visiblePopUp, setVisiblePopUp] = React.useState(false);

    const sortRef = React.useRef();




    const onSelectItem = (obj) => {
        dispatch(setSort(obj))
        setVisiblePopUp(false);
    };

    const toggleVisiblePopup = () => {
        setVisiblePopUp(!visiblePopUp);
    };
    //Указываем  конкретную область клика, и спрашиваем содержит ли эта область те значения которые нам нужны через сортреф
    const handeOutSideClick = (event) => {
        const path = event.path || (event.composedPath && event.composedPath());
        if (!path.includes(sortRef.current)) {
            setVisiblePopUp(false);
        }  
    };
    React.useEffect(() => {
        document.body.addEventListener("click", handeOutSideClick)
        return () => {
            document.body.removeEventListener("click", handeOutSideClick)
        }
    }, []);

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    className={visiblePopUp ? "rotated" : ""}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={toggleVisiblePopup}>{sortData.name}</span>
            </div>
            {visiblePopUp && <div className="sort__popup">
                <ul>
                    {sortList &&
                    sortList.map((obj, index) => (
                        <li onClick={() => onSelectItem(obj)} className={sortData.sortProperty === obj.sortProperty ? "active" : ""}
                            key={`${obj.type}_${index}`}>{obj.name}</li>))}
                </ul>
            </div>}
        </div>
    );
}
       


SortPopUp.defaultProps = {
    activeSortType: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickSortType: PropTypes.func.isRequired,
};


SortPopUp.defaultProps = {
    items: [],
};
export default SortPopUp;