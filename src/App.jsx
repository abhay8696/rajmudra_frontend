import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
//components
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
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
        <>
            <h1 className="text-black">Rajmudra Food Junction</h1>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
