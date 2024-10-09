import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  fullName: string;
  email: string;
  password: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  const loadUsers = () => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      setUsers(parsedUsers);
      console.log("Usuários carregados no estado:", parsedUsers);
    } else {
      console.log("Conteúdo do localStorage:", storedUsers);
    }
  };

  const navigateToInicio = () => {
    navigate("/");
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex w-[350px] h-[400px] bg-gray-500  flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Lista de Usuários</h1>
        {users.length === 0 ? (
          <p>Nenhum usuário cadastrado.</p>
        ) : (
          <ul>
            {users.map((user, index) => (
              <li key={index} className="border p-4 mb-2">
                <p>
                  <strong>Nome:</strong> {user.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </li>
            ))}
          </ul>
        )}
        <div>
          <button
            className="bg-gray-300 p-4 rounded-lg mt-4"
            onClick={navigateToInicio}
          >
            Acessar Início
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
