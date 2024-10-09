import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const schemaForm = z.object({
  login: z.object({
    email: z.string().min(12, "Por favor, informe um email válido"),
    password: z.string().min(8, "Por favor, informe uma senha válida"),
    fullName: z.string().min(1, "Por favor, informe seu nome completo"),
  }),
});

type FormProps = z.infer<typeof schemaForm>;

export default function Inicio() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(schemaForm),
    defaultValues: {
      login: {
        email: "",
        password: "",
        fullName: "",
      },
    },
  });

  const handleFormSubmit = (data: FormProps) => {
    const newUser = {
      fullName: data.login.fullName,
      email: data.login.email,
      password: data.login.password,
    };

    const storedUsers = localStorage.getItem("users");
    const usersArray = storedUsers ? JSON.parse(storedUsers) : [];

    usersArray.push(newUser);
    localStorage.setItem("users", JSON.stringify(usersArray));
  };

  const navigateToUsers = () => {
    navigate("/users");
  };

  return (
    <div className="flex items-center mx-auto justify-center min-h-screen bg-gray-300">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex h-[500px] gap-2 items-center justify-center w-[250px]  bg-gray-500 rounded-lg flex-col">
          <input
            type="text"
            placeholder="Nome completo"
            {...register("login.fullName")}
          />
          {errors.login?.fullName?.message && (
            <p>{errors.login.fullName.message}</p>
          )}

          <input type="text" placeholder="Email" {...register("login.email")} />
          {errors.login?.email?.message && <p>{errors.login.email.message}</p>}

          <input
            type="password"
            placeholder="Senha"
            {...register("login.password")}
          />
          {errors.login?.password?.message && (
            <p className="">{errors.login.password.message}</p>
          )}

          <button className="bg-gray-300 p-4 rounded-lg" type="submit">
            Cadastrar
          </button>
          <button
            className="bg-gray-300 p-4 rounded-lg mt-4"
            onClick={navigateToUsers}
          >
            Acessar Usuários
          </button>
        </div>
      </form>
    </div>
  );
}
