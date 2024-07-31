import React from "react";
import {useParams, useNavigate} from "react-router-dom"
import AI_Logo from "../assets/AI_Logo.webp";
import { BiHome, BiUser, BiKey, BiBot, BiBriefcase } from "react-icons/bi";

const NavBarChat = () => {
  const {ruc} = useParams();
  const navigate = useNavigate();

  return (
    <nav className="w-full flex items-center justify-between p-1 px-4 bg-zinc-900 backdrop-filter backdrop-blur-lg bg-opacity-40 rounded-full mt-4">
      <div className="flex items-center space-x-2">
        <img src={AI_Logo} alt="Wrong" className="w-20" />
        <div className="text-2xl font-bold">AI-Reports</div>
      </div>
      <ul className="flex space-x-10 px-4">
        <BiHome
          size={28}
          className="hover:text-zinc-600 cursor-pointer transition duration-200"
          onClick={() => navigate(`/home/${ruc}`)}
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
      </ul>
    </nav>
  );
};

export default NavBarChat;
