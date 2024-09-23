import React, { useEffect, useState } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
//backend functions
import { paymentsRequests } from "../../functions/backendFunctions";
import { formatDate } from "../../functions/functions";
import PaymentForm from "../PaymentForm/PaymentForm";
import Button from "../Button/Button";
import Notification from "../Notification/Notification";

const Payments = (props) => {
    const { shopNo, shopId } = props;

    //states
    const [paymentsArr, setPaymentsArr] = useState([]);
    const [formOn, setFormOn] = useState(false);

    //redux
    const token = useSelector((state) => state.token.value);

    // side-effects
    useEffect(() => {
        fetchPayments();
    }, []);

    //functions
    const fetchPayments = async () => {
        const getPayments = await paymentsRequests({
            method: "get",
            token,
            type: "condition",
            conditionKey: "shopNo",
            conditionVal: shopNo,
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
            />
        ));
    };

    const handleForm = () => setFormOn((pre) => !pre);

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
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between ">
                    <h3 className="text-left capitalize" onClick={handleForm}>
                        <span className="">{"payments "}</span>
                        {shopNo && `for ${shopNo}`}
                    </h3>
                    <span
                        onClick={handleForm}
                        className="bg-primary px-2 py-1 sm:px-4 sm:py-2 text-sm capitalize rounded-md cursor-pointer"
                    >
                        new payment
                    </span>
                </div>
                <table className="w-[100%]">
                    <thead className="">
                        <TableRow
                            amt="amount (₹)"
                            shop="shop"
                            method="method"
                            date="date"
                            headRow={true}
                        />
                    </thead>
                    <tbody>{displayPayments()}</tbody>
                </table>
            </div>
            {formOn && (
                <PaymentForm
                    shopNo={shopNo}
                    closeForm={handleForm}
                    re_fetchPayments={fetchPayments}
                />
            )}
            <Notification msg="New Payment Created" />
        </>
    );
};

export default Payments;
