import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CustomerSignup from "./pages/CustomerSignup";
import ProviderSignup from "./pages/ProviderSignup";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<CustomerSignup />} />
      <Route path="/provider-signup" element={<ProviderSignup />} />
    </Routes>
  );
}
