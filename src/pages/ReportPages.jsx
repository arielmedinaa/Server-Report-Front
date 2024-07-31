import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CardReport from "../components/CardReport";
import background from "../assets/Background.webp";
import svgImage1 from "../assets/undraw_aircraft_re_m05i.svg";
import { BiHome, BiUser, BiKey, BiBot, BiBriefcase } from "react-icons/bi"; // Importar iconos de react-icons
import CardSubXML from "../components/CardSubXML";

const ReportPage = () => {
  const { ruc } = useParams();
  const navigate = useNavigate();
  const url = '127.0.0.1:8000';
  const reports = [
    {
      title: "Factura Electrónica",
      description: "Track your team's activity and progress.",
      svgImage: svgImage1,
      report_type: "factura"
    },
    {
      title: "Nota de Crédito",
      description: "Manage your team members and their roles.",
      svgImage: svgImage1,
      report_type: "nota_credito"
    },
    {
      title: "Nota de Remisión",
      description: "Manage your team members and their roles.",
      svgImage: svgImage1,
      report_type: "nota_remision"
    },
    {
      title: "Nota de Débito",
      description: "Manage your team members and their roles.",
      svgImage: svgImage1,
      report_type: "nota_debito"
    },
    {
      title: "Autofactura",
      description: "Manage your team members and their roles.",
      svgImage: svgImage1,
      report_type: "autofactura"
    },
    {
      title: "Factura de Exportación",
      description: "Manage your team members and their roles.",
      svgImage: svgImage1,
      report_type: "exportación"
    },
  ];

  const handlePrint = async (ruc, reportType) => {
    const cod_est = document.getElementById("cod_est").value;
    const cod_exp = document.getElementById("cod_exp").value;

    try {
      const res = await fetch(
        `http://${url}/reportes/generar_pdf/${ruc}/${cod_est}/${cod_exp}/${reportType}/` /* `https://4ff6-200-108-139-198.ngrok-free.app/reportes/generar_pdf/${ruc}/${cod_est}/${cod_exp}/${reportType}/` */,
        {
          method: "GET",
          //credentials: "include"
        }
      );
      if (!res.ok) {
        console.log(`Error ${res.status}`);
        toast.error(`Faltan campos requeridos o no existe reportes a este ruc: ${ruc}`, {
          style:{
            background: "#202020",
            color: "white"
          }
        });
      } else {
        window.location.href =  `http://${url}/reportes/generar_pdf/${ruc}/${cod_est}/${cod_exp}/${reportType}/` /* `https://4ff6-200-108-139-198.ngrok-free.app/reportes/generar_pdf/${ruc}/${cod_est}/${cod_exp}/${reportType}/` */;
      }
    } catch (e) {
      console.error(e);
      toast.error("Ocurrió un error")
    }
  };

  return (
    <div className="flex min-h-screen text-white"
    style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-16 bg-zinc-800 flex flex-col items-center py-20 space-y-10">
        <BiHome
          size={28}
          className="hover:text-zinc-600 cursor-pointer transition duration-200"
        />
        <BiUser
          size={28}
          className="hover:text-zinc-600 cursor-pointer transition duration-200"
          onClick={() => navigate(`/configuraciones/${ruc}`)}
        />
        <BiKey
          size={28}
          className="hover:text-zinc-600 cursor-pointer transition duration-200"
          onClick={() => navigate(`/404/${ruc}`)}
        />
        <BiBot
          size={28}
          className="hover:text-zinc-600 cursor-pointer transition duration-200"
          onClick={() => navigate(`/chat/${ruc}`)}
        />
        <BiBriefcase
          size={28}
          className="hover:text-zinc-600 cursor-pointer transition duration-200"
          onClick={() => navigate(`/404/${ruc}`)}
        />
      </div>
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <CardReport
              key={index}
              title={report.title}
              description={report.description}
              svgImage={report.svgImage}
              reportType={report.report_type}
              ruc={ruc}
              onPrintClick={handlePrint}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
