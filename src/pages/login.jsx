import { useState } from "react"
import url from '../../url.json'
import { useNavigate } from "react-router"

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${url.url}/api/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()
            if (!response.ok) {
                alert(data.message)
            } else {
                console.log(data)
                localStorage.setItem('token',data.access_token)
                localStorage.setItem('name',data.user.name)
                navigate('/dashboard')

            }

        } catch (error) {
            console.log(error)
        } 
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={login}
                className="w-full max-w-md p-8 bg-white rounded shadow-md flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-center mb-4">Entrar</h2>
                <div>
                    <label className="block mb-1 font-medium" htmlFor="email">Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        id="email"
                        type="email"
                        placeholder="ex: davi@gmail.com"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                </div>

                <div>
                    <label className="block mb-1 font-medium" htmlFor="password">Senha</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        id="password"
                        type="password"
                        placeholder="********"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <a href="./register" className="text-blue-600">não tem conta?Cadastre-se</a>
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition cursor-pointer"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
