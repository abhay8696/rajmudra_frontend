import React from "react";
//router
import { useNavigate } from "react-router-dom";
//asstes
import backIcon from "../../assets/backArrow.svg";

const styles = {
    border: "1px solid #fc4747",
    borderRadius: "50%",
    transition: "all 250ms",
};
const BackButton = () => {
    //router
    const navigate = useNavigate();

    return (
        <span
            className="flex items-center justify-center w-[30px] h-[30px] opacity-50 hover:opacity-100 cursor-pointer"
            style={styles}
            onClick={() => navigate(-1)}
        >
            <img src={backIcon} alt="back button" className="w-[16px]" />
        </span>
    );
};

export default BackButton;
