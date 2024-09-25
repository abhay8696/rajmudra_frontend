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
import Payments from "../Payments/Payments";

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
            <div className="Dashboard commonPadding_with_Nav flex flex-col gap-4">
                {/* <h1 className="text-left">Dashboard</h1> */}
                {/* <h2>hello {admin.name}</h2> */}
                <div className="flex gap-2 flex items-center justify-start">
                    <h1 className="text-left">
                        <span className="text-primary">{"Dash"}</span>
                        <span>board</span>
                    </h1>
                </div>
                <div className="breaker border-b border-semi-dark-blue"></div>
                <ShopOverview />
                <div className="breaker border-b border-semi-dark-blue"></div>
                <Payments paymentsByEveryShop={true} />
            </div>
        </>
    );
};

export default Dashboard;
