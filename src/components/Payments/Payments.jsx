import React, { useEffect, useState } from "react";
//styles
import "./Payments.css";
//redux
import { useSelector, useDispatch } from "react-redux";
//backend functions
import { paymentsRequests } from "../../functions/backendFunctions";
import { formatDate } from "../../functions/functions";
import PaymentForm from "../PaymentForm/PaymentForm";
import PopUp from "../PopUp/PopUp";
//assets
import billIcon from "../../assets/billCheck.svg";

const Payments = (props) => {
    const { shopNo, paymentsByEveryShop, shopPayments } = props;

    //states
    const [paymentsArr, setPaymentsArr] = useState([]);
    const [formOn, setFormOn] = useState(false);
    const [popUpState, SetPopUpState] = useState({
        status: "none", // none/show/hide
        text: "",
    });

    //redux
    const token = useSelector((state) => state.token.value);

    // side-effects
    useEffect(() => {
        fetchPayments();
    }, []);

    //functions
    const closePopUp = () => {
        SetPopUpState({ ...popUpState, status: "hide" });
    };

    const fetchPayments = async () => {
        if (shopPayments?.length) {
            //if payments arr is recieved as props from shopComp
            return setPaymentsArr(shopPayments);
        }

        const getPayments = await paymentsRequests({
            method: "get",
            token,
            type: !paymentsByEveryShop ? "condition" : null,
            conditionKey: !paymentsByEveryShop ? "shopNo" : null,
            conditionVal: !paymentsByEveryShop ? shopNo : null,
            paymentId: paymentsByEveryShop ? "all" : null,
        });
        setPaymentsArr(getPayments);
    };

    const displayPayments = () => {
        // console.log(paymentsArr);
        return paymentsArr.map((item) => (
            <TableRow
                amt={item.amount}
                shop={item.shopNo}
                method={item.paymentMethod}
                date={formatDate(item.date)}
                key={item._id}
            />
        ));
    };

    const handleForm = (msg) => {
        setFormOn((pre) => !pre);
        console.log(msg);
        if (msg === "success")
            SetPopUpState({
                status: "show", // none/show/hide
                text: "payment added successfully !",
            });
    };

    //sub-component
    const TableRow = ({ amt, shop, method, date, headRow }) => {
        let class_tr = "",
            class_td = "";

        if (headRow) {
            class_tr += "bg-semi-dark-blue font-bold";
            class_td = "uppercase";
        }

        if (!headRow) {
            class_tr += "border-b border-collapse border-semi-dark-blue";
            class_td +=
                "capitalize border-x border-collapse border-semi-dark-blue";
        }

        return (
            <tr
                className={`${class_tr} grid grid-cols-4 text-sm sm:text-[1rem] `}
            >
                <td className={`${class_td} text-[12px] sm:text-[1rem] py-4`}>
                    {date}
                </td>
                <td className={`${class_td} text-[12px] sm:text-[1rem] py-4`}>
                    {amt}
                </td>
                <td className={`${class_td} text-[12px] sm:text-[1rem] py-4`}>
                    {shop}
                </td>
                <td className={`${class_td} text-[12px] sm:text-[1rem] py-4`}>
                    {method}
                </td>
            </tr>
        );
    };

    return (
        <>
            <PopUp
                text={popUpState.text}
                closePopUp={closePopUp}
                status={popUpState.status}
                errorPopUp={false}
            />
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between ">
                    <h3 className="text-left capitalize text-greyish-blue font-bold">
                        payments
                    </h3>
                    <div
                        onClick={handleForm}
                        className="flex gap-2 items-center bg-primary px-2 py-1 sm:px-4 sm:py-2 text-sm capitalize rounded-md cursor-pointer"
                    >
                        <img
                            src={billIcon}
                            alt="bill icon"
                            className="w-[25px]"
                        />
                        <span>new payment</span>
                    </div>
                </div>
                <table className="w-[100%]">
                    <thead className="w-[100%]">
                        <TableRow
                            amt="amount (₹)"
                            shop="shop"
                            method="method"
                            date="date"
                            headRow={true}
                        />
                    </thead>
                    <tbody className="paymentsTable-body flex flex-col">
                        {displayPayments()}
                    </tbody>
                </table>
            </div>
            {formOn && (
                <PaymentForm
                    shopNo={shopNo}
                    closeForm={handleForm}
                    re_fetchPayments={fetchPayments}
                />
            )}
        </>
    );
};

export default Payments;
