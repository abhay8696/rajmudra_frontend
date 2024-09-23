import React from "react";

const Payments = (props) => {
    const { shopNo } = props;

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
            class_td += "capitalize";
        }

        return (
            <tr
                className={`${class_tr} grid grid-cols-4 text-sm sm:text-[1rem] `}
            >
                <td className={`${class_td} py-4`}>{date}</td>
                <td className={`${class_td} py-4`}>{amt}</td>
                <td className={`${class_td} py-4`}>{shop}</td>
                <td className={`${class_td} py-4`}>{method}</td>
            </tr>
        );
    };

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-left mt-4 capitalize">
                <span className="">{"payments "}</span>
                {shopNo && `for ${shopNo}`}
            </h3>
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
                <tbody>
                    <TableRow
                        amt="5412"
                        shop="s-707"
                        method="debit"
                        date="22 Sept '24"
                    />
                </tbody>
            </table>
        </div>
    );
};

export default Payments;
