import React from "react";
import data from "../components/dataset";

const TableList = () => {
  const dataset = data;
  const headers = Object.keys(dataset[0]);

  return (
    <div className="pl-10">
      <h1 className="text-xl font-bold pb-5">Daftar Penjualan CEMILQUE</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataset.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {headers.map((header) => (
                  <td
                    key={header}
                    className="py-2 px-4 border-b border-gray-200 text-sm"
                  >
                    {header === "Harga"
                      ? `Rp ${row[header].toLocaleString("id-ID")}`
                      : row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableList;
