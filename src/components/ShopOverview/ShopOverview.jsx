import React, { useEffect, useState } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
//styles
import "./ShopOverview.css";
import { getAllShop_from_server } from "../../functions/functions";
import ShopCard from "../ShopCard/ShopCard";
import NewShopCard from "../ShopCard/NewShopCard";
import { useNavigate } from "react-router-dom";

const ShopOverview = () => {
    const [shops, setShops] = useState();

    //router
    const navigate = useNavigate();

    //redux
    const token = useSelector((state) => state.token.value);
    //on load
    useEffect(() => {
        // const getAllShop = await getAllShop_from_server(token);
        onLoad();
    }, []);

    //functions
    const onLoad = async () => {
        if (!token) return;

        try {
            const allShops = await getAllShop_from_server(token);
            console.log(allShops);
            setShops(allShops);
        } catch (err) {
            navigate("/error");
        }
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
        <div className="ShopOverview text-left rounded-xl flex flex-col gap-4">
            <h3>Shops</h3>
            {shops ? <DisplayCards /> : null}
        </div>
    );
};

export default ShopOverview;
