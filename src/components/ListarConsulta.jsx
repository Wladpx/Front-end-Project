const AppointmentList = ({ onBack, appointments }) => {
  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-teal-700">
          Lista de Consultas Agendadas
        </h1>
        <button
          onClick={onBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Voltar ao Dashboard
        </button>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-xl border border-teal-100">
        <table className="min-w-full divide-y divide-teal-200">
          {/* Cabeçalho da Tabela */}
          <thead className="bg-teal-50">
            <tr>
              {["Paciente", "Data", "Hora", "Motivo", "Status"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          {/* Corpo da Tabela */}
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                >
                  Nenhuma consulta agendada.
                </td>
              </tr>
            ) : (
              appointments
                // Ordena por data e hora antes de exibir
                .sort((a, b) => {
                  const dateTimeA = new Date(`${a.date}T${a.time}`);
                  const dateTimeB = new Date(`${b.date}T${b.time}`);
                  return dateTimeA - dateTimeB;
                })
                .map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="hover:bg-gray-50 transition duration-100"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {appointment.patientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* Formata a data para o padrão brasileiro */}
                      {new Date(appointment.date).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.reason || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* Badge de status com cores diferentes */}
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === "Agendada"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;
