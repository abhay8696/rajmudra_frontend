import React, { useEffect, useState } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
//router
import { useNavigate } from "react-router-dom";
//assets
import personIcon from "../../assets/person.svg";
//backend functions
import { shopRequests } from "../../functions/backendFunctions";
//styles
import "./NewShopForm.css";
//components
import Button from "../Button/Button";
import LoadingImg from "../LoadingImg/LoadingImg";
import BackButton from "../BackButton/BackButton";
import Navbar from "../Navbar/Navbar";
import PopUp from "../PopUp/PopUp";

const NewShopForm = () => {
    //states
    const [formData, setFormData] = useState({
        ownerName: "Jon snow",
        shopNo: "s-90",
        registrationNo: "reg500",
        ownerContact: "1234567890",
        ownerAddress: "123 Main Street, City, Country",
        ownerAdhaar: "123456789",
        rentAgreementStartDate: "2024-09-12",
        rentAgreementEndDate: "2025-09-11",
        tenure: "1",
        monthlyRent: "50000",
        ownerPhoto: personIcon,
        ownerAdhaarPhoto: personIcon,
        rentAgreement: {
            startDate: "",
            endDate: "",
        },
    });
    const [popUpState, setPopUpState] = useState({
        status: "none", // none/show/hide
        text: "",
    });
    const [requestPending, setRequestPending] = useState(false);
    const [newShop, setNewShop] = useState();

    //router
    const navigate = useNavigate();

    //redux
    const token = useSelector((state) => state.token.value);

    //functions
    const closePopUp = () => setPopUpState({ ...popUpState, status: "hide" });
    const handleSubmit = (event) => {
        event.preventDefault();
        closePopUp();
        if (!token) navigate("/login");
        sendReq();
    };

    const sendReq = async () => {
        setRequestPending(true);
        try {
            const shop = await shopRequests({
                method: "post",
                shopObject: {
                    ...formData,
                    rentAgreement: {
                        startDate: formData.rentAgreementStartDate,
                        endDate: formData.rentAgreementStartDate,
                    },
                },
                token,
                type: "create",
            });
            if (shop) {
                navigate(`/shop/${shop.shopNo}`);
            }
        } catch (err) {
            const text = err?.message || "Internal server error";
            console.log(text);

            setPopUpState({ status: "show", text });
        }
        setRequestPending(false);
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((preFormData) => ({
            ...preFormData,
            [name]: value,
        }));
    };
    const formInputDiv = (id, labelValue, inputType, classStr = "") => {
        classStr = classStr.concat(" ", "flex flex-col items-stretch gap-1");
        return (
            <span className={classStr}>
                <label
                    htmlFor={id}
                    className="capitalize text-greyish-blue text-left"
                >
                    {labelValue}
                </label>
                <input
                    type={inputType}
                    id={id}
                    value={formData[id]}
                    onChange={handleChange}
                    name={id}
                    required
                    className="flex-1 px-4 py-2 bg-semi-dark-blue border border-semi-dark-blue focus:border-primary border-solid rounded-lg"
                />
            </span>
        );
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
            <div className="NewShopForm-wrapper commonPadding_with_Nav flex flex-col gap-8 ">
                <div className="flex gap-2 flex items-center justify-start">
                    <BackButton />
                    <h1 className="text-left">
                        <span className="text-primary">{"Add "}</span>
                        <span>New Shop</span>
                    </h1>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex-1 flex flex-col gap-8 overflow-auto"
                >
                    {/* owner deatila */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-left capitalize text-greyish-blue font-bold">
                            owner
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {formInputDiv("ownerName", "name", "text")}
                            {formInputDiv("ownerContact", "contact", "number")}
                            {formInputDiv("ownerAdhaar", "adhaar", "text")}
                            {formInputDiv(
                                "ownerAddress",
                                "address",
                                "text",
                                "sm:col-span-2 lg:col-span-3"
                            )}
                        </div>
                    </div>

                    {/* shop details */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-left capitalize text-greyish-blue font-bold">
                            shop
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {formInputDiv("shopNo", "shop no", "text")}
                            {formInputDiv(
                                "registrationNo",
                                "registration no",
                                "text"
                            )}
                        </div>
                    </div>

                    {/* rent details */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-left capitalize text-greyish-blue font-bold">
                            Rent Agreement
                        </h3>
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                {formInputDiv(
                                    "rentAgreementStartDate",
                                    "Start Date",
                                    "date"
                                )}
                                {formInputDiv(
                                    "rentAgreementEndDate",
                                    "End Date",
                                    "date"
                                )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                {formInputDiv("tenure", "tenure", "number")}
                                {formInputDiv(
                                    "monthlyRent",
                                    "monthly rent",
                                    "number"
                                )}
                            </div>
                        </div>
                    </div>

                    <Button
                        text={"submit"}
                        type={"submit"}
                        requestPending={requestPending}
                        customClass="bg-primary w-[100px] px-4 py-2 w-[500px] max-w-[90vw] flex item-center justify-center"
                    />
                </form>
            </div>
        </>
    );
};

export default NewShopForm;
