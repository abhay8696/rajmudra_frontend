import React, { useEffect } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../redux/token/tokenSlice";
import { setAdmin } from "../../redux/admin/adminSlice";
//styles
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

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
        <div className="Dashboard">
            <h1>Dashboard</h1>
            <h2>hello {admin.name}</h2>
        </div>
    );
};

export default Dashboard;
