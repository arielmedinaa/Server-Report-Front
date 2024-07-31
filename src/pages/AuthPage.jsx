import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import logo from "../assets/TF_horizontal.webp";
import background from "../assets/Background.webp";

const Auth = () => {
  const [ruc, setRuc] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();
  const url = '127.0.0.1:8000'

  const fetchAuthentication = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://${url}/auth_ruc/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ruc, contraseña })
      }); //fin del fetch
      if (!res.ok) {
        console.log("Something was wrong");
      }
      const data = await res.json();
      console.log(`Datos enviados ${data}`);
      navigate(`/home/${ruc}`)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white bg-opacity-30 p-10 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg text-center font-poppins">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <img src={logo} alt="Logo" className="w-40 mx-auto mb-6" />
        <form
          id="login-form"
          className="flex flex-col items-center"
          onSubmit={fetchAuthentication}
        >
          <input
            type="text"
            id="ruc"
            placeholder="RUC"
            required
            className="mb-4 p-2 border border-gray-300 rounded-full w-52"
            value={ruc}
            onChange={(e) => setRuc(e.target.value)}
          />
          <input
            type="password"
            id="contraseña"
            placeholder="123"
            required
            className="mb-4 p-2 border border-gray-300 rounded-full w-52"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <button
            type="submit"
            id="button"
            className="p-2 w-52 bg-zinc-900 text-white rounded-full cursor-pointer"
          >
            Ingresar
          </button>
        </form>
        <div className="mt-6">
          <p className="text-gray-300">&copy; 2024 Tu Factura prueba</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
