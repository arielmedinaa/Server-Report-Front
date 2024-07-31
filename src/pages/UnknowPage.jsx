import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import image from "../assets/Backup_Image.webp";
import { BiHome, BiUser, BiKey, BiBot, BiBriefcase } from "react-icons/bi";

const UnknowPage = () => {
  const { ruc } = useParams();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-700">
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
      <div className="flex flex-col md:flex-row items-center justify-center space-x-8">
        <section className="flex flex-col items-center text-center md:items-start md:text-left">
          <h2 className="text-5xl font-bold mb-4">En Mantenimiento</h2>
          <p className="text-2xl mb-8">Página en desarrollo</p>
        </section>
        <img src={image} alt="Maintenance" className="ml-8 max-w-full h-auto" />
      </div>
    </div>
  );
};

export default UnknowPage;
