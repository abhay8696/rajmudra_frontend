import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
//styles
import "./Login.css";
import { loginReq_to_Server } from "../../functions/functions";
import Notification from "../Notification/Notification";
//helper functions

const Login = () => {
    //states
    const [formData, setFormData] = useState({ contact: "", password: "" });
    const [loginError, setLoginError] = useState({
        msg: "",
        position: "bottom",
        display: false,
    });
    const timeOutRef = useRef(null);

    //router
    const navigate = useNavigate();

    //side effects
    useEffect(() => {
        if (timeOutRef.current) return clearTimeout(timeOutRef.current);
    }, []);

    //functions
    const handleSubmit = (event) => {
        event.preventDefault();
        serverRequest();
    };

    const handleChange = (event) =>
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });

    const serverRequest = async () => {
        const loginData = await loginReq_to_Server(
            formData.contact,
            formData.password
        );
        if (loginData.status !== 200) {
            let msg = "Contact / Password is wrong!";
            if (loginData.status !== 401) {
                msg = loginData?.message || "something went wrong!";
            }
            setLoginError({
                msg,
                position: "bottom",
                display: true,
            });
            timeOutRef.current = setTimeout(() => {
                setLoginError({ ...loginError, display: false });
            }, 7500);
        } else console.log(loginData.data);

        if (loginData.status === 200) navigate("/dashboard");
    };

    return (
        <div className="LoginWrapper flex flex-col items-center justify-center gap-8">
            <h1 className="text-primary">Rajmudra Food Junction</h1>
            <div className="Login flex flex-col bg-semi-dark-blue rounded-lg p-8 gap-8">
                <h2 className="">Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
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
                    <button className="bg-primary self-center w-[100px] px-4 py-2 bg-inherit rounded-lg">
                        Submit
                    </button>
                </form>
            </div>
            {loginError.display ? (
                <Notification
                    msg={loginError.msg}
                    position={loginError.position}
                />
            ) : null}
        </div>
    );
};

export default Login;
