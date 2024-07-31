import React, { useState } from "react";
import CardSubXML from "../components/CardSubXML";
import { BiPrinter, BiUpload } from "react-icons/bi"; // Importar iconos de react-icons

const CardReport = ({
  title,
  description,
  svgImage,
  reportType,
  ruc,
  onPrintClick,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 p-4 rounded-lg shadow-lg text-center text-white hover:shadow-xl hover:shadow-blue-400/50 transition duration-500 ease-in-out w-85 h-80 font-poppins">
      <div className="flex flex-col items-center h-full justify-between">
        <div className="flex flex-col items-center">
          <img src={svgImage} alt={title} className="w-24 h-24 mb-4" />
          <h2 className="text-lg font-bold mb-1">{title}</h2>
          <p className="text-sm mb-4">{description}</p>
        </div>
        <div className="flex justify-between w-full px-2 mb-2 space-x-2">
          <select
            id="cod_est"
            className="p-1 rounded bg-zinc-800 text-white text-sm w-full"
          >
            <option value="001">001</option>
            <option value="002">002</option>
            <option value="003">003</option>
            <option value="004">004</option>
            <option value="005">005</option>
            <option value="006">006</option>
            <option value="007">007</option>
            <option value="008">008</option>
            <option value="009">009</option>
            <option value="010">010</option>
            {/* Otras opciones */}
          </select>
          <select
            id="cod_exp"
            className="p-1 rounded bg-zinc-800 text-white text-sm w-full"
          >
            <option value="001">001</option>
            <option value="002">002</option>
            <option value="003">003</option>
            <option value="004">004</option>
            <option value="005">005</option>
            <option value="006">006</option>
            <option value="007">007</option>
            <option value="008">008</option>
            <option value="009">009</option>
            <option value="010">010</option>
            {/* Otras opciones */}
          </select>
        </div>
        <div className="flex flex-col space-y-2 w-full px-2">
          <button
            className="p-2 rounded bg-transparent border border-zinc-600 text-white flex items-center justify-center text-xs"
            data-ruc={ruc}
            data-report-type={reportType}
            onClick={() => onPrintClick(ruc, reportType)}
          >
            <BiPrinter size={16} className="mr-1" />
            <span>Imprimir</span>
          </button>
          <button
            className="p-2 rounded bg-transparent border border-zinc-600 text-white flex items-center justify-center text-xs"
            onClick={() => setShowModal(true)}
          >
            <BiUpload size={16} className="mr-1" />
            <span>Subir XML</span>
          </button>
          {showModal ? (
              <CardSubXML />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CardReport;
