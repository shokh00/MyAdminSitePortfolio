import { Routes, Route } from "react-router-dom";
import Products from "./pages/product/Products";
import Dasboard from "./pages/Dashboard";
import Order from "./pages/orders/Order";
import Store from "./pages/store/Store";
import Setting from "./pages/settings/Settings";

export default function Router() {
    return (
        <>
            <Routes>
                <Route path="/" />
                <Route path="/product" element={<Products />} />
                <Route path="/dashboard" element={<Dasboard />} />
                <Route path="/order" element={<Order />} />
                <Route path="/store" element={<Store />} />
                <Route path="/setting" element={<Setting />} />
            </Routes>
        </>
    )
};