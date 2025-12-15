import React, { useState } from "react";
import CustomerSignup from "./CustomerSignup";
import ProviderSignup from "./ProviderSignup";

export default function Signup() {
  const [tab, setTab] = useState("customer");

  return (
    <div>
      {tab === "customer" ? <CustomerSignup /> : <ProviderSignup />}

      {/* Floating Tab Switch */}
      <div style={{
        position: "absolute",
        top: "70px",
        left: "50%",
        transform: "translateX(-50%)"
      }}>
        
      </div>
    </div>
  );
}
