import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export const CardSubXML = () => {
  const url = "127.0.0.1:8000";
  const [cod_est, setCodEst] = useState("001");
  const [cod_exp, setCodExp] = useState("001");
  const { ruc } = useParams();

  const handleSubmit = function () {
    /* const cod_est = document.getElementById("cod_est").value;
    const cod_exp = document.getElementById("cod_exp").value; */
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const content = event.target.result;
        const xmlPrefix = content.match(/<DE[^>]*Id="(\d{2})/)[1];
        console.log(xmlPrefix);

        let newFileName;
        if (xmlPrefix === "01") {
          newFileName = "DE.xml";
        } else if (xmlPrefix === "05") {
          newFileName = "NC.xml";
        } else if (xmlPrefix === "07") {
          newFileName = "NR.xml";
        } else if (xmlPrefix === "04") {
          newFileName = "AU.xml";
        } else {
          alert("Tipo de archivo XML no reconocido.");
          return;
        }

        const id_ruc = ruc;
        const formData = new FormData();
        formData.append(
          "file",
          new Blob([content], { type: file.type }),
          newFileName,
          console.log(newFileName)
        );
        formData.append("ruc", id_ruc);

        fetch(
          `http://${url}/subir_xml/${cod_est}/${cod_exp}/`,
          /* `http://127.0.0.1:8000/subir_xml/${cod_est}/${cod_exp}/`, */ {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error al subir el XML");
            }
          })
          .then((data) => {
            if (data.success) {
              toast.success(`Archivo XML subido correctamente: ${ruc}`, {
                style: {
                  background: "#202020",
                  color: "white",
                },
              });
            } else {
              toast.error(`Error al subir el XML al ruc: ${ruc}`, {
                style: {
                  background: "#202020",
                  color: "white",
                },
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
      reader.readAsText(file);
    }
  };
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-filter backdrop-blur-lg bg-opacity-10 transition duration-400">
      <div className="bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 rounded-lg shadow-lg text-center text-white w-96 h-70 backdrop-filter backdrop-blur-lg bg-opacity-10">
        <h2 className="text-xl font-bold mb-4">Carga de XML</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            Código de Establecimiento
          </label>
          <select
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
        <input type="file" accept=".xml" className="mb-4 p-2 w-full" />
        <button
          className="p-2 w-full bg-transparent border border-zinc-600 text-white rounded"
          //data-ruc={ruc}
          onClick={handleSubmit}
        >
          Subir XML
        </button>
      </div>
    </div>
  );
};

export default CardSubXML;
