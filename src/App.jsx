import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
//redux
import { useDispatch } from "react-redux";
import { setToken } from "./redux/token/tokenSlice";
import { setAdmin } from "./redux/admin/adminSlice";
//components
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { useEffect } from "react";
import { getFromLocal } from "./functions/functions";
import NewShopForm from "./components/NewShopForm/NewShopForm";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
    //redux
    const dispatch = useDispatch();

    //load token and admin data from local storage
    useEffect(() => {
        const tokenFromLocal = getFromLocal("token");
        const adminFromLocal = getFromLocal("admin");

        //set to global states
        if (tokenFromLocal && adminFromLocal) {
            dispatch(setToken(tokenFromLocal));
            dispatch(setAdmin(adminFromLocal));
        }
    }, []);
    //functions
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Dashboard />,
        },
        {
            path: "/dashboard",
            element: <Dashboard />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/newShopForm",
            element: <NewShopForm />,
        },
        {
            path: "/error",
            element: <ErrorPage />,
        },
    ]);

    return (
        <main className="">
            <RouterProvider router={router} />
        </main>
    );
}

export default App;
