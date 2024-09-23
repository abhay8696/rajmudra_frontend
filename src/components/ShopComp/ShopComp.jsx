import React, { useEffect, useState } from "react";
//router
import { useParams, useNavigate } from "react-router-dom";
//redux
import { useSelector, useDispatch } from "react-redux";
//styles
import "./ShopComp.css";
//backend functions
import { shopRequests } from "../../functions/backendFunctions";
//helper functions
import { formatDate } from "../../functions/functions";
//components
import Navbar from "../Navbar/Navbar";
import Button from "../Button/Button";
import BackButton from "../BackButton/BackButton";
import LoadingImg from "../LoadingImg/LoadingImg";
import Payments from "../Payments/Payments";
import PopUp from "../PopUp/PopUp";

const ShopComp = () => {
    //states
    const [shopData, setShopData] = useState();
    const [requestPending, setRequestPending] = useState(false);
    const [popUpState, setPopUpState] = useState({
        status: "none", // none/show/hide
        text: "",
    });

    //router
    const navigate = useNavigate();
    const { shopNo } = useParams();

    //redux
    const token = useSelector((state) => state.token.value);

    //side effects
    useEffect(() => {
        if (!token) navigate("/");
        loadShop();
    }, []);

    //sub-components
    const ShopInfo = ({ keyy, val }) => {
        return (
            <div className="flex gap-2 justify-start items-start">
                <span className="w-[20%] uppercase text-sm text-primary font-thin">
                    {keyy}
                </span>
                {requestPending ? (
                    <LoadingImg
                        customClass={`w-[25px] transition-all duration-[250ms] "opacity-100"`}
                    />
                ) : (
                    <span className="">{val}</span>
                )}
            </div>
        );
    };

    //functions
    const closePopUp = () => setPopUpState({ ...popUpState, status: "hide" });
    const loadShop = async () => {
        setRequestPending(true);

        try {
            const shop = await shopRequests({
                method: "get",
                token,
                type: "condition",
                conditionKey: "shopNo",
                conditionVal: shopNo,
            });
            // console.log(shop);

            if (shop) {
                if (!shop.length) setPopUpState({ status: "show", text });
                setShopData(shop[0]);
            }
        } catch (err) {
            console.log(err);
            console.log(err.status);

            const text = JSON.parse(
                err?.message || '{"message": "Internal server error"}'
            );
            // console.log(text);

            setPopUpState({ status: "show", text });
        }

        setRequestPending(false);
    };

    return (
        <>
            <PopUp
                text={popUpState.text}
                closePopUp={closePopUp}
                status={popUpState.status}
                errorPopUp={true}
            />
            <Navbar />
            <div className="ShopComp-wrapper commonPadding_with_Nav flex flex-col gap-4">
                <div className="flex gap-2 flex items-center justify-start">
                    <BackButton />
                    <h1
                        className="text-left uppercase"
                        onClick={() => console.log(shopData)}
                    >
                        <span className="text-primary">{"shop "}</span>
                        <span>{shopNo}</span>
                    </h1>
                </div>
                <div className="shopComp-div-1 flex flex-col sm:flex-row flex-wrap gap-4">
                    <div className="flex-1 shopComp-owner flex flex-col gap-2 text-left">
                        <h3 className="text-left capitalize text-greyish-blue font-bold">
                            owner
                        </h3>

                        <div className="flex flex-col gap-2">
                            {/* <div className="w-[200px] flex flex-col justify-center items-center gap-2">
                                <img
                                    className="w-[200px]"
                                    src={shopData?.ownerPhoto}
                                    alt="owner photo"
                                />
                                <span>{shopData?.ownerName}</span>
                            </div> */}
                            <div className="flex-1 flex flex-col gap-2 text-left">
                                <ShopInfo
                                    keyy={"name"}
                                    val={shopData?.ownerName}
                                />
                                <ShopInfo
                                    keyy="adhaar"
                                    val={shopData?.ownerAdhaar}
                                />
                                <ShopInfo
                                    keyy="address"
                                    val={shopData?.ownerAddress}
                                />
                                <ShopInfo
                                    keyy="contact"
                                    val={shopData?.ownerContact}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 shopComp-shop flex flex-col gap-2 text-left">
                        <h3 className="text-left capitalize text-greyish-blue font-bold">
                            Shop
                        </h3>
                        <ShopInfo
                            keyy="reg no."
                            val={shopData?.registrationNo}
                        />
                        <ShopInfo keyy="shop no." val={shopData?.shopNo} />
                    </div>

                    <div className="flex-1 shopComp-agreement flex flex-col gap-2 text-left">
                        <h3 className="text-left capitalize text-greyish-blue font-bold">
                            rent agreement
                        </h3>
                        <ShopInfo
                            keyy="start date"
                            val={formatDate(shopData?.rentAgreement?.startDate)}
                        />
                        <ShopInfo
                            keyy="end date"
                            val={formatDate(shopData?.rentAgreement?.endDate)}
                        />
                        <ShopInfo
                            keyy="monthly rent"
                            val={shopData?.monthlyRent}
                        />
                        <ShopInfo keyy="tenure" val={shopData?.tenure} />
                    </div>
                </div>
                <Payments shopNo={shopNo} shopId={shopData?.shopId} />
            </div>
        </>
    );
};

export default ShopComp;
