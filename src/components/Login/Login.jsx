import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
//redux
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../redux/token/tokenSlice";
import { setAdmin } from "../../redux/admin/adminSlice";
//styles
import "./Login.css";
//assets
import logoIcon from "../../assets/logo.svg";

//helper functions
import { getFromLocal, saveToLocal } from "../../functions/functions";
import { loginReq_to_Server } from "../../functions/backendFunctions";
//components
import Button from "../Button/Button";
import PopUp from "../PopUp/PopUp";

const Login = () => {
    //redux
    const token = useSelector((state) => state.token.value);
    const admin = useSelector((state) => state.admin.value);
    const dispatch = useDispatch();
    //states
    const [formData, setFormData] = useState({ contact: "", password: "" });
    const [popUpState, setPopUpState] = useState({
        status: "none", // none/show/hide
        text: "",
    });
    const timeOutRef = useRef(null);

    //router
    const navigate = useNavigate();

    //side effects
    useEffect(() => {
        const tokenFromLocal = getFromLocal("token");
        const adminFromLocal = getFromLocal("admin");

        if (tokenFromLocal && adminFromLocal) navigate("/");

        if (timeOutRef.current) return clearTimeout(timeOutRef.current);
    }, []);

    //functions
    const closePopUp = () => setPopUpState({ ...popUpState, status: "hide" });

    const handleSubmit = (event) => {
        event.preventDefault();
        serverRequest();
    };

    const handleChange = (event) => {
        closePopUp();
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    const serverRequest = async () => {
        try {
            const loginData = await loginReq_to_Server(
                formData.contact,
                formData.password
            );
            if (loginData.status === 200) {
                console.log(loginData);
                dispatch(setToken(loginData?.data?.tokens?.access?.token));
                dispatch(setAdmin(loginData?.data?.admin));

                saveToLocal("token", loginData?.data?.tokens?.access?.token);
                saveToLocal("admin", loginData?.data?.admin);

                navigate("/");
            }
        } catch (err) {
            if (
                err.message === "Incorrect contact or password" ||
                err.message === "Admin does not exist"
            ) {
                setPopUpState({
                    status: "show",
                    text: "Incorrect contact or password",
                });
            } else {
                setPopUpState({
                    status: "show",
                    text: "Internal server error, please try again later",
                });
            }
        }
    };

    return (
        <>
            <PopUp
                text={popUpState.text}
                closePopUp={closePopUp}
                status={popUpState.status}
                errorPopUp={true}
            />
            <div className="LoginWrapper flex flex-col items-center justify-center gap-16">
                <div className="flex flex-col justify-center items-center gap-2">
                    <img src={logoIcon} alt="logo icon" />
                    <span className="uppercase">
                        <span className="text-primary">rajmudra</span>
                        <span>{" food "}</span>
                        <span>junction</span>
                    </span>
                </div>
                <div className="Login flex flex-col bg-semi-dark-blue rounded-lg p-8 gap-8">
                    <h2 className="">Login</h2>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-8"
                    >
                        <input
                            type="number"
                            placeholder="Contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                            className="px-4 py-2 bg-inherit border-b border-greyish-blue border-solid"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="px-4 py-2 bg-inherit border-b border-greyish-blue border-solid"
                        />
                        {/* <button className="bg-primary self-center w-[100px] px-4 py-2 bg-inherit rounded-lg">
                        Submit
                    </button> */}
                        <Button text={"login"} type={"submit"} />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
