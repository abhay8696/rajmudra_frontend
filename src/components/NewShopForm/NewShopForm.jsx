import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
//assets
import personIcon from "../../assets/person.svg";

const NewShopForm = () => {
    //states
    const [formData, setFormData] = useState({
        ownerName: "",
        shopNo: "",
        registrationNo: "",
        ownerContact: "",
        ownerAddress: "",
        ownerAdhaar: "",
        rentAgreementStartDate: "",
        rentAgreementEndDate: "",
        tenure: "",
        monthlyRent: "",
        ownerPhoto: personIcon,
        ownerAdhaarPhoto: personIcon,
    });

    //functions
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    };
    const handleChange = (event) => {
        setFormData((preFormData) => ({
            ...preFormData,
            [event.target.name]: event.target.value,
        }));
    };
    const formInputDiv = (id, labelValue, inputType) => {
        return (
            <span>
                <label htmlFor={id} className="capitalize">
                    {labelValue}
                </label>
                <input
                    type={inputType}
                    id={id}
                    value={formData[id]}
                    onChange={handleChange}
                    name={id}
                    required
                    className="px-4 py-2 bg-inherit border border-greyish-blue border-solid"
                />
            </span>
        );
    };
    const displayInputs = () => {
        const inputs = [
            "ownerName",
            "shopNo",
            "registrationNo",
            "ownerContact",
            "ownerAddress",
            "ownerAdhaar",
            "rentAgreementStartDate",
            "rentAgreementEndDate",
            "tenure",
            "monthlyRent",
            // "ownerPhoto",
            // "ownerAdhaarPhoto",
        ];

        const labels = [
            "owner name",
            "shop no",
            "registration no",
            "owner contact",
            "owner address",
            "owner adhaar",
            "rent agreement start date",
            "rent agreement end date",
            "tenure",
            "monthly rent",
            // "owner photo",
            // "owner adhaar photo",
        ];

        let arr = [];

        inputs.forEach((item, idx) => {
            let type = "text";
            if (item.includes("rentAgreement")) type = "date";
            if (item.includes("tenure")) type = "number";
            arr.push(formInputDiv(item, labels[idx], type));
        });

        return arr;
    };
    return (
        <>
            <Navbar />
            <div className="NewShopForm-wrapper commonPadding_with_Nav">
                <h1>Add New Shop</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {displayInputs()}
                    <button type="submit">go</button>
                </form>
            </div>
        </>
    );
};

export default NewShopForm;
