import React from 'react';
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';

import { setSort } from '../reduxToolkit/slices/filterSlice';

export const sortList = [
    { name: 'популярности (DESC)', sortProperty:"raiting", type: "популярности" },
    { name: 'популярности (ASC)', sortProperty: "-raiting", type: "рейтинг" },
    { name: 'цене (DESC)', sortProperty: "price", type: "цена" },
    { name: 'цене (ASC)', sortProperty: "-price" },
    { name: 'алфавиту (DESC)', sortProperty: "title"},
    { name: 'алфавиту (ASC)', sortProperty: "-title"},
  ];

 

 

const SortPopUp = () => {
    const sortData = useSelector(state => state.filter.sort)
    const dispatch = useDispatch();

    //Состояние для попапа
    const [visiblePopUp, setVisiblePopUp] = React.useState(false);
    //Состояние для выбора в попапе( мы указываем что как только он отрендерится на странице чтобы он начинался с 0 элемента
    // const [activeItem, setactiveItem] = React.useState(0);
    // //Создаем сортреф для хранения ссылок чтобы использовать в дальнейшем(она сосздает обьект со значением current
    const sortRef = React.useRef();

    // const activeLabel = items.find(obj => obj.type === activeSortType).name;



    const onSelectItem = (obj) => {
        // if (onClickSortType) {
        //     onClickSortType(index);
        // }
        dispatch(setSort(obj))
        

        setVisiblePopUp(false);
        console.log(obj)
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
    //Отлавливаем первый рендер на странице задаем лиснер для клика по всему документу
    // Передаем хендлер, который будет показывать область клика
    React.useEffect(() => {
        document.body.addEventListener("click", handeOutSideClick)
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
                        //Следим за каждым обьектом в котором есть тип и провряем его на наличия данных если есть то даем актив
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