import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function IndicatorsAdmin() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [series, setSeries] = useState("");

  const createIndicator = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const res = await axios.post(
        "/indicators",
        { name, description, source, series_code: series },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Axios res.data:", res.data);

      const data = res.data;

      alert(
        `Indicator created!\nID: ${data.id}\nDatapoints imported: ${data.imported_datapoints}`
      );

      setName("");
      setDescription("");
      setSource("");
      setSeries("");

    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.detail || error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-xl w-full">

        <h1 className="text-3xl font-bold mb-8 text-center">Create Indicator</h1>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md space-y-4">

          <input
            className="w-full border rounded-lg p-3 text-lg"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full border rounded-lg p-3 text-lg"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="w-full border rounded-lg p-3 text-lg"
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />

          <input
            className="w-full border rounded-lg p-3 text-lg"
            placeholder="BCB Series"
            value={series}
            onChange={(e) => setSeries(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            onClick={createIndicator}
          >
            Create Indicator
          </button>

          <button
            className="w-full bg-gray-400 text-white p-3 rounded-lg text-lg font-semibold hover:bg-gray-500 transition"
            onClick={() => navigate("/dashboard")}
          >
            Voltar
          </button>

        </div>

      </div>
    </div>
  );
}
