import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardConfigReport from "../components/CardConfigReport";
import { BiHome, BiUser, BiKey, BiBot, BiBriefcase } from "react-icons/bi";
import toast from "react-hot-toast";
import background from "../assets/Background.webp";

const ConfigPage = () => {
  const { ruc } = useParams();
  const navigate = useNavigate();
  const url = "127.0.0.1:8000"
  const handleCreateReport = async (ruc, cod_est, cod_exp) => {
    if (cod_est && cod_exp) {
      console.log(`
        Cod_est: ${cod_est}
        Cod_exp: ${cod_exp}
        RUC: ${ruc}
        `);
      await fetch(
        `http://${url}/crear_reporte/${cod_est}/${cod_exp}/${ruc}/` /* `https://back-server-report.onrender.com/crear_reporte/${cod_est}/${cod_exp}/${ruc}/` */,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      )
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.message || "Error al crear el reporte");
            });
          }
          return response.json();
        })
        .then((data) => {
          toast.success("Reporte creado con éxito", {
            style: {
              background: "#202020",
              color: "white",
            },
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error al crear el reporte: " + error.message, {
            style: {
              background: "#202020",
              color: "white",
            },
          });
        });
    } else {
      toast.warning("Debe seleccionar códigos de establecimiento y expedición");
    }
  };
  return (
    <div
      className="flex min-h-screen text-white"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-16 bg-zinc-800 flex flex-col items-center py-20 space-y-10">
        <BiHome
          size={28}
          className="hover:text-zinc-600 cursor-pointer transition duration-200"
          onClick={() => navigate(`/home/${ruc}`)}
        />
        <BiUser
          size={28}
          className="hover:text-zinc-600 cursor-pointer transition duration-200"
        />
        <BiKey
          size={28}
          className="hover:text-zinc-600 cursor-pointer transition duration-200"
        />
        <BiBot
          size={28}
          className="hover:text-zinc-600 cursor-pointer transition duration-200"
          onClick={() => navigate(`/chat/${ruc}`)}
        />
        <BiBriefcase
          size={28}
          className="hover:text-zinc-600 cursor-pointer transition duration-200"
        />
      </div>
      <div className="flex-1 p-6 flex justify-center items-center">
        <CardConfigReport ruc={ruc} onCreateReport={handleCreateReport} />
      </div>
    </div>
  );
};

export default ConfigPage;
