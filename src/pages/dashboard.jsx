import React, { useEffect, useState } from "react";
import Sidebar from "../component/sideBar";
import { useNavigate } from "react-router";
import { Pie, PieChart, Tooltip } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import url from '../../url.json'
export default function Dashboard() {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url.url}/api/countLink`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          },
        })

        const data = await response.json();
        console.log(data)
        setData(data)
      } catch (error) {
        console.log(error)
      }

    }
    fetchData()
  }, [])


  const acitveExpired = [
    { name: 'Ativos', uv: data.links_active || 0 },
    { name: 'Expirados', uv: data.links_expired || 0 },
  ]
  const totalClicks = [
    { name: 'total', uv: Number(data.total_click) || 0 },
    
  ]
const dataf = data.top_click?.map(link => ({
  name: link.original_url,
  click: Number(link.click_count) || 0,

})) || [];
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-8 flex-1">
        <h2 className="text-3xl font-bold mb-4">DASHBOARD</h2>

        <div className="flex mt-16">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl">links ativos e expirados</h1>
            <PieChart width={350} height={350}>
              <Pie
                activeShape={{
                  fill: 'red',
                }}
                data={acitveExpired}
                dataKey="uv"
              />
              <Tooltip defaultIndex={2} />
            </PieChart>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl">Total de clicks</h1>
            <PieChart width={350} height={350}>
              <Pie
                activeShape={{
                  fill: 'purple',
                }}

                data={totalClicks}
                dataKey="uv"
              />
              <Tooltip defaultIndex={2} />
            </PieChart>
          </div>
        </div>
        <div className="flex flex-col justify-center mt-14 gap-4">
          <h1 className="text-3xl">Total de clicks</h1>
          <BarChart width={600} height={300} data={dataf}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="click" fill="#8884d8" barSize={30} />
          </BarChart>
        </div>

      </div>
    </div>
  );
}
