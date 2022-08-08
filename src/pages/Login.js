import { useState } from "react";
import { login } from "../firebase";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const navigate = useNavigate();
  
  const handleSubmit = async (e, email, password) => {
    e.preventDefault(); //form kendi kendine sayfayı yenilemesin diye verdiğimiz method
    const user = await login(email, password);
    if (user) {
      navigate("/", {
        replace: true,
      });
    }
  };

  return <LoginForm handleSubmit={handleSubmit} />
 
}
