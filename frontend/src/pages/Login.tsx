import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const Login = () => {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(false);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            alert(error.response?.data?.detail || "Erro ao auntenticar");
        }
    };

    return (

        <div className="flex items-center justify-center h-screen bg-gray-100">

            <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-6">
                    InsightHub
                </h1>

                <h2 className="text-xl text-center mb-6">
                    {isRegister ? "Criar Conta" : "Login"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {isRegister && (
                        <input
                            className="w-full border rounded-lg p-3 text-lg"
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    )}

                    <input
                        className="w-full border rounded-lg p-3 text-lg"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="w-full border rounded-lg p-3 text-lg"
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
