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
        <div className="flex flex-col justify-center items-center gap-4 NewShopCard ShopCard p-4 bg-semi-dark-blue rounded-lg">
            <Link to="/newShopForm">
                <img
                    src={addShopIcon}
                    alt="add shop icon"
                    className="w-[100px]"
                />
                <span>Add New Shop</span>
            </Link>
        </div>
    );
};

export default NewShopCard;
