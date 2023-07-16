import { Routes, Route } from "react-router-dom";
import Products from "./pages/product/Products";
import Dasboard from "./pages/Dashboard";
import Order from "./pages/orders/Order";

export default function Router() {
    return (
        <>
            <Routes>
                <Route path="/" />
                <Route path="/product" element={<Products />} />
                <Route path="/dashboard" element={<Dasboard />} />
                <Route path="/order" element={<Order />} />
            </Routes>
        </>
    )
};