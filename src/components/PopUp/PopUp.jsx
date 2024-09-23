import React from "react";
//assets
import closeIcon from "../../assets/close.svg";
//styles
import "./PopUp.css";

/**
 * parent comp state onject
 *  {
        status: "none", // none/show/hide
        text: "",
    })
 */
const PopUp = (props) => {
    const {
        text,
        position,
        customClass,
        directions,
        closePopUp,
        status,
        errorPopUp,
    } = props;

    let bgColor = "bg-green-800";

    if (errorPopUp) bgColor = "bg-red-800";

    return (
        <div
            onClick={closePopUp}
            className={`${bgColor} ${customClass} flex justify-between text-[0.9rem] popUp-${status} PopUp fixed z-50 bottom-4 left-4 right-4 md:bottom-4 md:left-4 md:right-auto p-2 flex gap-4 rounded-lg`}
        >
            <span className="capitalize">{text}</span>
            <img
                src={closeIcon}
                alt="close"
                className="w-[25px] cursor-pointer opacity-50 hover:opacity-100"
            />
        </div>
    );
};

export default PopUp;
