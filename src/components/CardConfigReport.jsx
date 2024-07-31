import React, {useState} from "react";
import toast from "react-hot-toast"

const CardConfigReport = ({ onCreateReport, ruc }) => {
  const [cod_est, setCodEst] = useState('001');
  const [cod_exp, setCodExp] = useState('001');
  const handleCreateReport = () => {
    if (cod_est && cod_exp) {
      onCreateReport(ruc, cod_est, cod_exp);
    } else {
      toast.error(`No es posible crear puntos 001-001 (Ariel no sabe programar)`, {
        style: {
          background: "#202020",
          color: "white"
        }
      });
    }
  };
  return (
    <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 p-6 rounded-lg shadow-lg text-center text-white w-96 h-70 backdrop-filter backdrop-blur-lg bg-opacity-10">
      <h2 className="text-xl font-bold mb-4">Soporte para crear reportes</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">
          Código de Establecimiento
        </label>
        <select
          value={cod_est}
          onChange={(e) => setCodEst(e.target.value)}
          className="p-2 rounded bg-zinc-800 text-white text-sm w-full"
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
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">
          Código de Expedición
        </label>
        <select
          value={cod_exp}
          onChange={(e) => setCodExp(e.target.value)}
          className="p-2 rounded bg-zinc-800 text-white text-sm w-full"
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
        </select>
      </div>
      <button
        className="p-2 w-full bg-transparent border border-zinc-600 text-white rounded"
        data-ruc={ruc}
        onClick={handleCreateReport}
      >
        Crear Reporte
      </button>
    </div>
  );
};

export default CardConfigReport;
