import React from "react";
import "./Notification.css";

const Notification = (props) => {
    const { msg, position } = props;
    const stylesStr1 = "fixed p-2 bg-red-800 w-[300px] rounded-lg";
    let stylesStr2;
    if (position === "bottom") {
        stylesStr2 = "bottom-[50px]";
    }
    return (
        <div
            className={`Notification ${stylesStr1} ${stylesStr2} ${position}-notification`}
        >
            {msg || "Something went wrong"}
        </div>
    );
};

export default Notification;
