import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//redux
import { useSelector, useDispatch } from "react-redux";
//styles
import "./ShopCard.css";
//assets
import shopIcon from "../../assets/shop.svg";
//components
import LoadingImg from "../LoadingImg/LoadingImg";
import Button from "../Button/Button";

const CardText = ({ text, subText, bg, padding, textClass, customClass }) => {
    return (
        <div className={`flex flex-col ${customClass} `}>
            <span
                className={`${textClass} font-bold text-[18px] leading-[1] ${padding} ${bg} rounded-sm`}
            >
                {text}
            </span>
            <span className="text-[10px] opacity-90 uppercase">{subText}</span>
        </div>
    );
};

const ShopCard = (props) => {
    const { data } = props;

    //router
    const navigate = useNavigate();

    //redux
    const token = useSelector((state) => state.token.value);

    //functions
    const handleClick = () => navigate(`/shop/${data.shopNo}`);

    return (
        <div className="flex flex-col gap-4 ShopCard p-4 bg-semi-dark-blue rounded-lg">
            <div className="flex justify-between items-start">
                <img src={shopIcon} alt="shop icon" className="w-[40px]" />
                <CardText
                    customClass="items-center"
                    textClass="uppercase"
                    text={data?.shopNo}
                    // subText={"shop no"}
                    bg={"bg-primary"}
                    padding={"px-2 py-1"}
                />
            </div>

            <CardText
                customClass="items-start"
                textClass="capitalize"
                text={data?.ownerName || "Owner"}
                subText={"owner"}
            />
            <CardText
                customClass="items-start"
                textClass="uppercase"
                text={data?.registrationNo || "REG123"}
                subText={"registration"}
            />
            <CardText
                customClass="items-start"
                text={`₹${data?.monthlyRent || 10000}/-`}
                subText={"rent"}
            />
            <div className="flex-1 flex items-end justify-center">
                <Button
                    clickFunction={handleClick}
                    customClass="flex items-center justify-center align-end border border-white rounded-lg text-white w-[100%] py-2 cursor-pointer "
                    text={"More Info"}
                />
            </div>
        </div>
    );
};

export default ShopCard;
