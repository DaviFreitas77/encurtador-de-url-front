import Sidebar from "../../component/sideBar"
import url from '../../../url.json'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export default function Links() {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const [links, setLinks] = useState([])
    const [qlUrl, setQrUrl] = useState()

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])


    useEffect(() => {
        const myLinks = async () => {
            try {
                const response = await fetch(`${url.url}/api/links`, {
                    method: "GET",
                    headers: {
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                })
                const data = await response.json()
                setLinks(data)
            } catch (error) {
                console.log(error)
            }
        }
        myLinks()
    }, [])






    const generateQRCode = async (slug) => {
        try {
            const response = await fetch(`${url.url}/api/qrCode/${slug}`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                    "Accept": 'application/json'
                }
            })

            const blob = await response.blob();
            const qrObjectUrl = URL.createObjectURL(blob);
            setQrUrl(qrObjectUrl); 
            console.log(response)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div >
            <Sidebar />
            <div className="flex items-center 2xl:items-end justify-center flex-col">
                {qlUrl && (
                    <img src={qlUrl} alt="" />
                )}
                <div className="grid  2xl:grid-cols-3  xl:grid-cols-2 gap-2  ml-36">
                    {links && links.map((link) => (
                        <div
                            key={link.id}
                            className="border p-3 rounded bg-white shadow-sm flex flex-col mb-4"
                        >
                            <button
                                onClick={() => window.open(`${url.url}/api/s/${link.slug}`, "_blank")}
                                className="text-blue-500 font-medium break-all max:w-[500px] cursor-pointer"
                            >
                                {`${url.url}/s/${link.slug}`}
                            </button>
                            <button
                                onClick={() => generateQRCode(link.slug)}
                                className="text-blue-500 font-medium break-all max:w-[500px] cursor-pointer"
                            >
                                gerar qrcode
                            </button>
                            <span className="text-gray-600 text-sm">
                                Status: <b>{link.status}</b>
                            </span>
                            <span className="text-gray-600 text-sm">
                                {link.expires_at && (
                                    link.status === 'expired' ? (
                                        <b>expirou em: {link.expires_at}</b>
                                    ) : (
                                        <b>expira em: {link.expires_at}</b>
                                    )
                                )}
                            </span>
                            <a
                                href={link.original_url}
                                target="_blank"
                                className="text-blue-500 font-bold text-base truncate max-w-[200px] block"
                            >
                                {link.original_url}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
