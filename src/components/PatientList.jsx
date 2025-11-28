const PatientList = ({ onBack, patients }) => {
  return (
    <div className="p-8 bg-white min-h-screen">
      
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-teal-700">
          Lista de Pacientes
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
          <thead className="bg-teal-50">
            <tr>
              {["Nome", "Idade", "Telefone", "Email", "Status"].map(
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

          <tbody className="bg-white divide-y divide-gray-200">
            {patients.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                >
                  Nenhum paciente cadastrado.
                </td>
              </tr>
            ) : (
              patients
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-gray-50 transition duration-100"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {patient.name}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.age || "N/A"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.phone || "N/A"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.email || "N/A"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          patient.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {patient.active ? "Ativo" : "Inativo"}
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

export default PatientList;
