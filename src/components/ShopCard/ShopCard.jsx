import React from "react";
//styles
import "./ShopCard.css";
//assets
import shopIcon from "../../assets/shop.svg";

const CardText = ({ text, subText, bg, padding }) => {
    return (
        <div className={`flex flex-col items-start`}>
            <span
                className={`font-bold text-[18px] leading-[1] ${padding} ${bg} rounded-sm`}
            >
                {text}
            </span>
            <span className="text-[10px] opacity-90 uppercase">{subText}</span>
        </div>
    );
};

const ShopCard = (props) => {
    const { data } = props;

    return (
        <div
            onClick={() => console.log(data)}
            className="flex flex-col gap-4 ShopCard p-4 bg-semi-dark-blue rounded-lg"
        >
            <div className="flex justify-between items-start">
                <img src={shopIcon} alt="shop icon" className="w-[40px]" />
                <CardText
                    text={data?.shopNo}
                    subText={"shop no"}
                    bg={"bg-primary"}
                    padding={"px-2 py-1"}
                />
            </div>

            <CardText text={data?.ownerName || "Owner"} subText={"owner"} />
            <CardText
                text={data?.registrationNo || "REG123"}
                subText={"registration"}
            />
            <CardText
                text={`₹${data?.monthlyRent || 10000}/-`}
                subText={"rent"}
            />
            <div className="flex-1 flex items-end justify-center">
                <button className="align-end border border-white rounded-lg text-white w-[100%] py-2 cursor-pointer hover:border-primary hover:text-primary">
                    More Info
                </button>
            </div>
        </div>
    );
};

export default ShopCard;
