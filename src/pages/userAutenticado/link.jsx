import Sidebar from "../../component/sideBar"
import url from '../../../url.json'
import { useEffect } from "react"

export default function Links() {
    const token = localStorage.getItem("token")

    useEffect(() => {
        const myLinks = async () => {
            try {
                const response = await fetch(`${url.url}/api/links`, {
                    method: "GET",
                    headers: {
                        'Content-Type': "appliation/json",
                        'Accept': "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                })
                const data = await response.json()
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        myLinks()
    }, [])

    return (
        <div>
            <Sidebar />

        </div>
    )
}