import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
//components
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { useState } from "react";

function App() {
    //states
    const [token, setToken] = useState(null);
    //functions
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Dashboard />,
        },
        {
            path: "/login",
            element: <Login />,
        },
    ]);

    return (
        <main className="">
            <RouterProvider router={router} />
        </main>
    );
}

export default App;
