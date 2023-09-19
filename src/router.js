import { Routes, Route } from "react-router-dom";
import Products from "./pages/product/Products";
import Dasboard from "./pages/Dashboard/Dashboard";
import Order from "./pages/orders/Order";
import Setting from "./pages/settings/Settings";
import OneOrder from "./pages/aboutOneOrder";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./pages/Layout";
import SignUp from "./pages/SignUp";

export default () => (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Dasboard />} />
            <Route path="product" element={<Products />} />
            <Route path="order" element={<Order />} />
            <Route path="order/:id" element={<OneOrder />} />
            <Route path="setting" element={<Setting />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/sign" element={<SignUp />} />
    </Routes>
);