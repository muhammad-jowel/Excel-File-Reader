import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelFileReader = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
        setError(null);
      } catch (err) {
        setError("Failed to read the Excel file. Please make sure the file is valid.");
        setData([]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl border-2 border-lime-300 rounded-lg bg-white shadow-lg p-6 flex flex-col">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Excel File Reader!</h1>
        </div>

        {/* Content */}
        <form className="flex flex-col items-center space-y-4" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="excel-file" className="text-lg font-semibold text-gray-700">
            Upload your Excel file:
          </label>
          <input
            id="excel-file"
            type="file"
            onChange={handleFileUpload}
            accept=".xlsx, .xls"
            className="block w-full max-w-xs px-3 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400"
          />
          <button
            type="button"
            className="mt-4 px-6 py-2 bg-lime-400 text-white font-semibold rounded-lg shadow hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
            onClick={(e) => e.preventDefault()} // Prevent form submission
          >
            Read File
          </button>
        </form>

        {error && (
          <div className="text-red-500 text-center mt-4">
            {error}
          </div>
        )}

        {data.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800">Data:</h2>
            <div className="overflow-top-scroll overflow-y-hidden"> {/* Make the table scrollable */}
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key, index) => (
                      <th key={index} className="px-4 py-2 text-left text-gray-600 border-b border-gray-200">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, index) => (
                        <td key={index} className="px-4 py-2 text-left border-b border-gray-200">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-sm text-gray-500 text-center">
          <a
            href="https://www.facebook.com/softdevjowel"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            Developed by Muhammad Jowel
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExcelFileReader;
