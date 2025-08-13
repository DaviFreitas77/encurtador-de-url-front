import Sidebar from "../../component/sideBar"
import url from '../../../url.json'
import { useEffect, useState } from "react"

export default function Links() {
    const token = localStorage.getItem("token")
    const [links, setLinks] = useState([])
    const [slug, setSlug] = useState('')

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


    if (slug) {
        const redirectUrl = async () => {
            const response = await fetch(`${url.url}/api/s/${slug}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }

            })
            const data = await response.json();
            window.open(data.original_url)
            setSlug('')

        }
        redirectUrl()
    }

    return (
        <div >
            <Sidebar />
            <div className="flex items-center justify-center flex-col">

                {links && links.map((link) => (
                    <div
                        key={link.id}
                        className="border p-3 rounded bg-white shadow-sm flex flex-col mb-4"
                    >
                        <button
                            onClick={() => setSlug(link.slug)}
                            className="text-blue-500 font-medium break-all max:w-[500px] cursor-pointer"
                        >
                            {`${url.url}/s/${link.slug}`}
                        </button>
                        <button
                            onClick={() => setSlugQrCode(link.slug)}
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
    )
}
