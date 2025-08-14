import React, { useEffect, useState } from "react";
import Sidebar from "../component/sideBar";
import { useNavigate } from "react-router";
import { Pie, PieChart, Tooltip } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import url from '../../url.json'
export default function Dashboard() {
  const [data, setData] = useState([])
  const [totClick, setTotClick] = useState([])
  const [linkActive, setLinkActive] = useState([])
  const [linkExpired, setLinkExpired] = useState([])
  const [topClick,setTopClick] = useState([])
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
        const response = await fetch(`${url.url}/api/metrics/total`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          },
        })

        const data = await response.json();
        setData(data)
      } catch (error) {
        console.log(error)
      }

    }
    const fetchTotalClick = async () => {
      try {
        const response = await fetch(`${url.url}/api/metrics/total-click`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          },
        })

        const data = await response.json();
        setTotClick(data)
      } catch (error) {
        console.log(error)
      }

    }
    const fetchLinkActive = async () => {
      try {
        const response = await fetch(`${url.url}/api/metrics/active-expired`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          },
        })

        const data = await response.json();
    
        setLinkActive(data.links_active)
        setLinkExpired(data.links_expired)
      } catch (error) {
        console.log(error)
      }

    }
    const fetchTopClick = async () => {
      try {
        const response = await fetch(`${url.url}/api/metrics/top`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          },
        })

        const data = await response.json();

        setTopClick(data)
       
      } catch (error) {
        console.log(error)
      }

    }
    fetchData()
    fetchTotalClick()
    fetchLinkActive()
    fetchTopClick()
  }, [])


  const acitveExpired = [
    { name: 'Ativos', uv: linkActive || 0 },
    { name: 'Expirados', uv: linkExpired || 0 },
  ]
  const totalLink = [
    { name: 'total', uv: data.total_links || 0 },

  ]

  const totalClick = [
    { name: 'total', uv: Number(totClick.total_click) || 0 },

  ]

  const dataf = topClick.top_click?.map(top => ({
    name: top.original_url,
    click: top.click_count || 0,
  })) || [];

  

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-8 flex-1">
        <h2 className="text-3xl font-bold mb-4">DASHBOARD</h2>

        <div className="flex flex-wrap mt-16 gap-8 justify-center">

          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl">total de click</h1>
            <PieChart width={350} height={350}>
              <Pie
                activeShape={{
                  fill: 'red',
                }}
                data={totalClick}
                dataKey="uv"
              />
              <Tooltip defaultIndex={2} />
            </PieChart>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl">Total de links</h1>
            <PieChart width={350} height={350}>
              <Pie
                activeShape={{
                  fill: 'purple',
                }}

                data={totalLink}
                dataKey="uv"
              />
              <Tooltip defaultIndex={2} />
            </PieChart>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl">ativos e expirados</h1>
            <PieChart width={350} height={350}>
              <Pie
                activeShape={{
                  fill: 'purple',
                }}

                data={acitveExpired}
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
