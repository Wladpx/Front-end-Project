import { useState, useMemo } from "react";

const RegisterAppointment = ({ onBack, onSubmit, patients }) => {
  const [formData, setFormData] = useState({
    patientId: "",
    date: "",
    time: "",
    reason: "",
  });

  const selectedPatient = useMemo(
    () => patients.find((p) => p.id === formData.patientId),
    [formData.patientId, patients]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPatient) return;

    const newAppointment = {
      ...formData,
      patientName: selectedPatient.fullName,
      status: "Agendada",
    };
    onSubmit(newAppointment);

    onBack();
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-indigo-700">
          Cadastrar Nova Consulta
        </h1>
        <button
          onClick={onBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Voltar ao Dashboard
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border border-indigo-200 rounded-xl shadow-lg"
      >
        <div className="col-span-full md:col-span-1">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="patientId"
          >
            Paciente
          </label>
          <select
            name="patientId"
            id="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 bg-white rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          >
            <option value="" disabled>
              Selecione um paciente
            </option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.fullName} ({p.document})
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-full md:col-span-1">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="date"
          >
            Data da Consulta
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="col-span-full md:col-span-1">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="time"
          >
            Hora da Consulta
          </label>
          <input
            type="time"
            name="time"
            id="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="col-span-full">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="reason"
          >
            Motivo/Sintomas (Breve)
          </label>
          <textarea
            name="reason"
            id="reason"
            rows="3"
            value={formData.reason}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ex: Rotina, dor de cabeça persistente, etc."
          />
        </div>

        <div className="col-span-full pt-4">
          <button
            type="submit"
            disabled={!formData.patientId || !formData.date || !formData.time}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-xl disabled:opacity-50"
          >
            Agendar Consulta
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterAppointment;
