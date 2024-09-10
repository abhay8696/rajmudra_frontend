import React, { useEffect, useState } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
//styles
import "./ShopOverview.css";
import { getAllShop_from_server } from "../../functions/functions";
import ShopCard from "../ShopCard/ShopCard";

const ShopOverview = () => {
    const [shops, setShops] = useState();
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
        const allShops = await getAllShop_from_server(token);
        setShops(allShops);
    };

    const DisplayCards = () => {
        if (!shops) return;

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {shops.map((card) => (
                    <ShopCard data={card} />
                ))}
            </div>
        );
    };

    //components
    return (
        <div className="ShopOverview text-left h-[50vh] rounded-xl flex flex-col gap-4">
            <h3>All Shops</h3>
            <DisplayCards />
        </div>
    );
};

export default ShopOverview;
