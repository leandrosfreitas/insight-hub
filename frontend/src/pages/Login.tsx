import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

import Logo from "../components/ui/Logo";

export const Login = () => {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        document.title = "Login | InsightHub";
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {

            if (isRegister) {
                await api.post("/auth/register", {
                    name,
                    email,
                    password
                });

                alert("Conta criada com sucesso!");
                setIsRegister(false);

            } else {
                await login(email, password);
                navigate("/dashboard");
            }

        } catch (error: any) {
            console.error(error.response?.data || error.message);
            alert(error.response?.data?.detail || "Erro ao autenticar");
        }
    };

    return (

        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">

            <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-md w-full max-w-md">

                <h1 className="flex justify-center mb-6">
                    <Logo />
                </h1>

                <h2 className="text-xl text-center mb-6 text-gray-700 dark:text-gray-300">
                    {isRegister ? "Criar Conta" : "Login"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {isRegister && (
                        <input
                            className="w-full border rounded-lg p-3 text-lg bg-white dark:bg-gray-700 dark:text-white"
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    )}

                    <input
                        className="w-full border rounded-lg p-3 text-lg bg-white dark:bg-gray-700 dark:text-white"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="w-full border rounded-lg p-3 text-lg bg-white dark:bg-gray-700 dark:text-white"
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                        type="submit"
                    >
                        {isRegister ? "Criar conta" : "Entrar"}
                    </button>

                </form>

                <button
                    className="mt-6 w-full text-blue-600 hover:underline"
                    onClick={() => setIsRegister(!isRegister)}
                >
                    {isRegister ? "Já tenho conta" : "Criar conta"}
                </button>

            </div>

        </div>
    );
};
