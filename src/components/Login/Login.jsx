import React, { useState } from "react";
//styles
import "./Login.css";
//variables
const serverUrl = import.meta.env; //development/production backend url

const Login = () => {
    //states
    const [formData, setFormData] = useState({ contact: "", password: "" });

    //functions
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        // if (contact.length < 10) alert("Invalid Contact Number!");
        console.log(serverUrl);
    };
    const handleChange = (event) =>
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });

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
                        // required
                        className="px-4 py-2 bg-inherit border border-greyish-blue border-solid"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        // required
                        className="px-4 py-2 bg-inherit border border-greyish-blue border-solid"
                    />
                    <button className="bg-primary self-center w-[100px] px-4 py-2 bg-inherit rounded-lg">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
