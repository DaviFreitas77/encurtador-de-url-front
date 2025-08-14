import React, { useEffect } from "react";
import Sidebar from "../component/sideBar";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate()
 const token = localStorage.getItem("token")
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-8 flex-1">
        <h2 className="text-3xl font-bold mb-4">Conteúdo Principal</h2>
        <p>Aqui vai o conteúdo da página...</p>
      </div>
    </div>
  );
}
