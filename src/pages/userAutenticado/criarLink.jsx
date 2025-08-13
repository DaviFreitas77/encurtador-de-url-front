import Sidebar from "../../component/sideBar"
import urll from '../../../url.json'
import { useEffect, useState } from "react"

export default function CriarLink() {
    const token = localStorage.getItem("token")
    const [dateTime,setDateTime] = useState('')
    const [originlUrl, setOriginalUrl] = useState('')

    const createLink = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${urll.url}/api/links`, {
                method: "POST",
                headers: {
                    'Content-Type': "appliation/json",
                    'Accept': "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({original_url:originlUrl,expires_at:dateTime})
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <Sidebar />
            <div className="flex w-full justify-center items-center flex-col h-screen">
                <h1 className="text-4xl font-medium text-gray-700 text-center mb-10">
                    Cole a URL para ser encurtada
                </h1>

                <form
                    onSubmit={createLink}
                    className="flex flex-col gap-4 w-full max-w-xl bg-white shadow p-6 rounded-lg"
                >

                    <input
                        className="border pl-2 focus:outline-0 focus:border-[#2D87C6] h-10 w-full rounded"
                        type="url"
                        name="url"
                        placeholder="Digite a URL completa (http/https)"
                        value={originlUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        required
                    />

                    {/* Campo Data/Hora */}
                    <label className="flex flex-col">
                        Data e Hora de Expiração (opcional):
                        <input
                            className="border pl-2 focus:outline-0 focus:border-[#2D87C6] h-10 rounded mt-1"
                            type="datetime-local"
                            value={dateTime}
                            onChange={(e) => setDateTime(e.target.value)}
                        />
                    </label>


                    <button
                        type="submit"
                        className="bg-[#2D87C6] hover:bg-[#256fa3] transition text-white font-medium h-10 rounded cursor-pointer"
                    >
                        Encurtar URL
                    </button>
                </form>
            </div>
        </div>
    )
}