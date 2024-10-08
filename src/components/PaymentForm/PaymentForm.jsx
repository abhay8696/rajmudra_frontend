import React, { useState } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
//styles
import "./PaymentForm.css";
//helper functions
import { formatDateToYYYYMMDD } from "../../functions/functions";
//backend functions
import { paymentsRequests } from "../../functions/backendFunctions";
//components
import Button from "../Button/Button";
import PopUp from "../PopUp/PopUp";

const PaymentForm = (props) => {
    const { shopNo, closeForm, re_fetchPayments } = props;

    //states
    const [formData, setFormData] = useState({
        date: formatDateToYYYYMMDD(new Date()), //today's date
        amount: "",
        shopNo: shopNo || "",
        paymentMethod: "cash",
    });
    const [requestPending, setRequestPending] = useState(false);
    const [popUpState, setPopUpState] = useState({
        status: "none", // none/show/hide
        text: "",
    });

    //redux
    const token = useSelector((state) => state.token.value);
    const shops = useSelector((state) => state.shops.value);

    //functions
    const closePopUp = () => {
        setPopUpState({ ...popUpState, status: "hide" });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setRequestPending(true);
        try {
            const payment = await paymentsRequests({
                method: "post",
                paymentObject: {
                    ...formData,
                },
                token,
                type: "create",
            });
            if (payment) {
                re_fetchPayments();
                closeForm("success");
            }
        } catch (err) {
            const text = err?.message || "Internal server error";
            // console.log(text);

            setPopUpState({ status: "show", text });
        }
        setRequestPending(false);
    };
    const handleChange = (event) => {
        const { value, name } = event.target;

        if (popUpState.status === "show") closePopUp();

        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <PopUp
                text={popUpState.text}
                closePopUp={closePopUp}
                status={popUpState.status}
                errorPopUp={true}
            />
            <div className="PaymentForm-wrapper fixed top-0 left-0 right-0 bottom-0 bg-[#00000069] backdrop-blur-sm commonPadding_with_Nav">
                <div className="flex flex-col items-center justify-center gap-4 h-[100%]">
                    <h3 className="capitalize">add new payment</h3>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className="flex flex-wrap justify-center items-stretch gap-4">
                            <input
                                placeholder="Date"
                                value={formData.date}
                                type="date"
                                onChange={handleChange}
                                name="date"
                                className="max-w-[75vw] w-[300px] px-4 py-2 bg-semi-dark-blue border border-semi-dark-blue focus:border-primary border-solid rounded-lg"
                            />
                            <input
                                placeholder="amount"
                                value={formData.amount}
                                type="number"
                                onChange={handleChange}
                                name="amount"
                                className="max-w-[75vw] w-[300px] px-4 py-2 bg-semi-dark-blue border border-semi-dark-blue focus:border-primary border-solid rounded-lg"
                                required
                            />
                            <select
                                disabled={shopNo ? true : false}
                                placeholder="shop number"
                                name="shopNo"
                                onChange={handleChange}
                                value={shopNo || formData.shopNo}
                                className="capitalize max-w-[75vw] w-[300px] px-4 py-2 bg-semi-dark-blue border border-semi-dark-blue focus:border-primary border-solid rounded-lg"
                            >
                                {shops.map((shop) => (
                                    <option value={shop.shopNo}>
                                        shop: {shop.shopNo}
                                    </option>
                                ))}
                            </select>

                            <select
                                name="paymentMethod"
                                onChange={handleChange}
                                value={formData.paymentMethod}
                                className="capitalize max-w-[75vw] w-[300px] px-4 py-2 bg-semi-dark-blue border border-semi-dark-blue focus:border-primary border-solid rounded-lg"
                            >
                                <option value="cash" selected>
                                    cash
                                </option>
                                <option value="debit">debit</option>
                                <option value="credit">credit</option>
                                <option value="online">online</option>
                            </select>
                            <Button
                                text={"submit"}
                                type={"submit"}
                                requestPending={requestPending}
                                customClass="bg-primary px-4 py-2 flex item-center justify-center"
                            />
                        </div>
                    </form>
                    <Button
                        text={"cancel"}
                        type={"cancel"}
                        customClass="border border-primary px-4 py-2 flex item-center justify-center"
                        clickFunction={closeForm}
                    />
                </div>
            </div>
        </>
    );
};

export default PaymentForm;
