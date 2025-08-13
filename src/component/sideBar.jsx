import { useNavigate } from "react-router";


export default function Sidebar() {
  const navigate = useNavigate()
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white flex flex-col">
      <h1 className="text-2xl font-bold p-4 border-b border-gray-700">Meu App</h1>
      <nav className="flex flex-col p-4 space-y-2">
        <a onClick={() => navigate('/dashboard')} className="hover:bg-gray-700 rounded p-2">Dashboard</a>
        <a onClick={() => navigate('/criar-link')} className="hover:bg-gray-700 rounded p-2">Criar link</a>
        <a onClick={() => navigate('/links')} className="hover:bg-gray-700 rounded p-2">meus Links</a>
        <a href="#" className="hover:bg-gray-700 rounded p-2">Configurações</a>
        <a href="../pages/userAutenticado/link" className="hover:bg-gray-700 rounded p-2">Logout</a>
      </nav>
    </div>
  );
}
