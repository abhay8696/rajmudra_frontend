import React, { useEffect, useState } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../redux/token/tokenSlice";
import { setAdmin } from "../../redux/admin/adminSlice";
//styles
import "./ShopOverview.css";
import { getAllShops_from_server } from "../../functions/backendFunctions";
import ShopCard from "../ShopCard/ShopCard";
import NewShopCard from "../ShopCard/NewShopCard";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import LoadingImg from "../LoadingImg/LoadingImg";

const ShopOverview = (props) => {
    const { inDashBoard } = props;

    //states
    const [shops, setShops] = useState();
    const [requestPending, setRequestPending] = useState(false);

    //router
    const navigate = useNavigate();

    //redux
    const token = useSelector((state) => state.token.value);
    //on load
    useEffect(() => {
        // const getAllShop = await getAllShops_from_server(token);
        onLoad();
    }, []);

    //functions
    const onLoad = async () => {
        if (!token) return;

        setRequestPending(true);

        try {
            const allShops = await getAllShops_from_server(token);
            // console.log(allShops);
            setShops(allShops);
        } catch (err) {
            console.log(err.message);
            if (
                err.message === "admin not found" ||
                err.message === "Please authenticate, try logging in again"
            ) {
                navigate("/login");
                localStorage.setItem("admin", null);
                localStorage.setItem("token", null);
                dispatch(setToken(null));
                dispatch(setAdmin(null));
            }
            navigate("/error");
        }

        setRequestPending(false);
    };

    const DisplayCards = () => {
        if (!shops) return [];

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <NewShopCard key={`shopcard-newShopCard`} />
                {shops?.map((card) => (
                    <ShopCard data={card} key={`shopcard-${card?._id}`} />
                ))}
            </div>
        );
    };

    //components
    return (
        <>
            <div className="ShopOverview text-left rounded-xl flex flex-col gap-4">
                <h3 className="flex gap-4">
                    <span>Shops</span>
                    <LoadingImg
                        customClass={`w-[25px] transition-all duration-[250ms] ${
                            requestPending ? "opacity-100" : "opacity-0"
                        }`}
                    />
                </h3>
                {shops ? <DisplayCards /> : null}
            </div>
        </>
    );
};

export default ShopOverview;
