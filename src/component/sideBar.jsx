

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white flex flex-col">
      <h1 className="text-2xl font-bold p-4 border-b border-gray-700">Meu App</h1>
      <nav className="flex flex-col p-4 space-y-2">
        <a href="#" className="hover:bg-gray-700 rounded p-2">Dashboard</a>
        <a href="#" className="hover:bg-gray-700 rounded p-2">Links</a>
        <a href="#" className="hover:bg-gray-700 rounded p-2">Configurações</a>
        <a href="#" className="hover:bg-gray-700 rounded p-2">Logout</a>
      </nav>
    </div>
  );
}
