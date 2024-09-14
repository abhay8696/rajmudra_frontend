import React from "react";
//assets
import closeIcon from "../../assets/close.svg";
//styles
import "./ErrorPopUp.css";

/**
 * parent comp state onject
 *  {
        status: "none", // none/show/hide
        text: "",
    })
 */
const ErrorPopUp = (props) => {
    const { text, position, customClass, directions, closePopUp, status } =
        props;
    return (
        <div
            onClick={closePopUp}
            className={`${customClass} popUp-${status} ErrorPopUp fixed bottom-4 left-4 bg-red-800 p-2 flex gap-4 rounded-lg`}
        >
            <span>{text}</span>
            <img
                src={closeIcon}
                alt="close"
                className="w-[25px] cursor-pointer opacity-50 hover:opacity-100"
            />
        </div>
    );
};

export default ErrorPopUp;
