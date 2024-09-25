import React from "react";
//styles
import "./ShopCard.css";
//assets
import addShopIcon from "../../assets/addShop.svg";
//router
import { Link } from "react-router-dom";

const NewShopCard = (props) => {
    const { data } = props;

    return (
        <div className="flex flex-col justify-center items-center gap-4 NewShopCard ShopCard p-4 rounded-lg">
            <Link
                to="/newShopForm"
                className="flex p-4 items-center justify-between sm:flex-col sm:justify-center gap-4"
            >
                <img
                    src={addShopIcon}
                    alt="add shop icon"
                    className="w-[50px] sm:w-[100px]"
                />
                <span className="font-bold">Add New Shop</span>
            </Link>
        </div>
    );
};

export default NewShopCard;
