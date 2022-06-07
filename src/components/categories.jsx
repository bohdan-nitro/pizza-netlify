import React from 'react';
import PropTypes from "prop-types";


const Categories = React.memo(
    function Categories({ onClickCategory, value}) {
     

        const categories = ["Все","Мясные", "Гриль", "Острые", "Закрытые", "Вегетаринская"];

        return (
            <div>
                <div className="categories">
                    {/* <ul>
                        <li className={activeCategory === null ? "active" : ""}
                            onClick={() => onClickCategory(null)}>Все
                        </li>   console.log(isMounted)
                        {items &&
                        items.map((name, index) => (
                            <li className={activeCategory === index ? "active" : ""}
                                onClick={() => onClickCategory(index)} key={`${name}_${index}`}>{name}</li>))}
                    </ul> */}
                    <ul>
                        {categories.map((item, i) => <li className={value === i ? "active" : ""} onClick={() => onClickCategory(i)} key={i}>{item}</li>)}
                    </ul>

                </div>
            </div>
        );

    }
);


Categories.defaultProps = {
    // activeCategory: PropTypes.oneOf([PropTypes.number, null]),
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickCategory: PropTypes.func.isRequired,
};

Categories.defaultProps = {activeCategory: null, items: []};


export default Categories;
