import React, { useEffect } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../redux/token/tokenSlice";
import { setAdmin } from "../../redux/admin/adminSlice";
//styles
import "./Dashboard.css";
//router
import { useNavigate } from "react-router-dom";
//components
import Navbar from "../Navbar/Navbar";
import ShopOverview from "../ShopOverview/ShopOverview";

const Dashboard = () => {
    //redux
    const token = useSelector((state) => state.token.value);
    const admin = useSelector((state) => state.admin.value);

    //router
    const navigate = useNavigate();
    //
    useEffect(() => {
        if (!token || !admin) navigate("/login");
    }, []);
    return (
        <>
            <Navbar />
            <div className="Dashboard commonPadding_with_Nav">
                {/* <h1 className="text-left">Dashboard</h1> */}
                {/* <h2>hello {admin.name}</h2> */}
                <ShopOverview />
            </div>
        </>
    );
};

export default Dashboard;
