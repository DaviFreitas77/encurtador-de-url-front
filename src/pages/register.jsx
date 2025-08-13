import { useState } from "react";
import url from '../../url.json'
import { useNavigate } from "react-router";

export default function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const register = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${url.url}/api/auth/register`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, name, password })
            })

            const data = await response.json()
            if (!response.ok) {
             alert(data.message)
            } else {
                alert(data.message)
                navigate('/login')
            }

        } catch (error) {
            console.log(error)
        }finally{
            setEmail('')
            setName('')
            setPassword('')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={register}
                className="w-full max-w-md p-8 bg-white rounded shadow-md flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-center mb-4">Registrar</h2>

                <div>
                    <label className="block mb-1 font-medium" htmlFor="name">Nome</label>
                    <input
                        required
                        id="name"
                        type="text"
                        placeholder="ex: Davi"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setName(e.target.value)}
                    />


                </div>

                <div>
                    <label className="block mb-1 font-medium" htmlFor="email">Email</label>
                    <input
                        required
                        id="email"
                        type="email"
                        placeholder="ex: davi@gmail.com"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setEmail(e.target.value)}
                    />


                </div>

                <div>
                    <label className="block mb-1 font-medium" htmlFor="password">Senha</label>
                    <input
                        required
                        id="password"
                        type="password"
                        placeholder="********"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <a href="./login" className="text-blue-600">ja tem conta?Entrar</a>
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition cursor-pointer"
                >
                    Registrar
                </button>
            </form>
        </div>
    );
}
