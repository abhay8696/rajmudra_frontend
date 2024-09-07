import React, { useState } from "react";
//styles
import "./Login.css";

const Login = () => {
    //states
    const [formData, setFormData] = useState({ contact: "", password: "" });

    //functions
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    };
    const handleChange = (event) =>
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });

    return (
        <div className="LoginWrapper">
            <h1 className="p-8">Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default Login;
