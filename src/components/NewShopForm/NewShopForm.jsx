import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
//assets
import personIcon from "../../assets/person.svg";
import Button from "../Button/Button";

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
            <Navbar />
            <div className="NewShopForm-wrapper commonPadding_with_Nav flex flex-col gap-8 ">
                <h1 className="text-left">
                    <span className="text-primary">{"Add "}</span>
                    <span>New Shop</span>
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-8 overflow-auto"
                >
                    {/* owner deatila */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-left capitalize text-greyish-blue font-bold">
                            owner
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {formInputDiv("ownerName", "name", "text")}
                            {formInputDiv("ownerContact", "contact", "number")}
                            {formInputDiv("ownerAdhaar", "adhaar", "number")}
                            {formInputDiv(
                                "ownerAddress",
                                "address",
                                "text",
                                "md:col-span-2 lg:col-span-3"
                            )}
                        </div>
                    </div>

                    {/* shop details */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-left capitalize text-greyish-blue font-bold">
                            shop
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
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
                        customClass="w-[500px] max-w-[90vw]"
                    />
                </form>
            </div>
        </>
    );
};

export default NewShopForm;
