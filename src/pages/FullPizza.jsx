import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { PizzaLoadingBlock } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addItem, cartSelectById } from "../reduxToolkit/slices/cartSlice";
import {Button} from "../components";


const FullPizza = () => {


    const [pizza, setPizza] = useState();
    const {userId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const totalCartItems = useSelector(cartSelectById(userId));


    const totalCountItems = totalCartItems ? totalCartItems.count : 0

    const onClickAddItem = () => {
        const {id,name,imageUrl,price} = pizza;

        const item = {id, name, imageUrl, price};

        dispatch(addItem(item))
    }

    useEffect(() => {
        async function fetchPizza(){
            try {
                const {data} =  await axios.get("https://62989024de3d7eea3c6aad4a.mockapi.io/items/" + userId)
                setPizza(data)
            } catch (error) {
                alert(`Something went wrong ${error}`)
                navigate("/")
            }
        }
        fetchPizza()
    }, [])

    if(!pizza){
        return <PizzaLoadingBlock/>
    }

    return (
        <div className="container">
            <div className="pizza-wrapper">
                <div className="left-side">
                    <div className="image-item">
                        <img src={pizza.imageUrl} alt={pizza.name} />
                    </div>
                </div>
                <div className="right-side">
                    <div className="content-wrapper">
                        <div className="content-box">
                            <div className="title-wrapper">
                            <h2 className="title">{pizza.name}</h2>
                            </div>
                            <div className="description-wrapper">
                            <p className="description">{pizza.description ? pizza.description : "Без описания"}</p>
                            </div>
                            <div className="info-wrapper">
                            <h4 className="price">{pizza.price} UAH</h4>
                            <Button onClick={onClickAddItem} className={"button--add"} outline>
                             <svg
                             width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"/>
                            </svg>
                    <span>Добавить</span>
                    {totalCountItems > 0 && <i>{totalCountItems}</i>}
                </Button>
                </div>
            </div>
        </div>
                </div>
            </div>
        </div>
    )
}
export default FullPizza;