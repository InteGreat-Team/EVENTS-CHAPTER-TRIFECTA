import React, { useState } from "react";
import { useUserInfoContext } from '../hooks/useUserInfoContext.jsx';
import { useUserContext } from '../hooks/useUserContext.jsx';
import { useTenantContext} from '../hooks/useTenantContext.jsx';

const DataTable = ({ data }) => {
  const { userInfo } = useUserInfoContext();
  const { userRow, setUserRow } = useUserContext();
  const {primaryColor} = useTenantContext();
  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleDelete = (index) => {
    const updatedData = [...userRow];
    updatedData.splice(index, 1);
    setUserRow(updatedData);
  };

  const handleEdit = (index, column, value) => {
    setEditIndex(index);
    setEditedData({ ...editedData, [column]: value });
  };

  const handleInputChange = (e, column) => {
    setEditedData({ ...editedData, [column]: e.target.value });
  };

  const handleSave = (index) => {
    const updatedData = [...userRow];
    updatedData[index] = { ...updatedData[index], ...Object.fromEntries(Object.entries(editedData).filter(([key]) => updatedData[index].hasOwnProperty(key))) };
    setUserRow(updatedData);
    setEditIndex(null);
  };
  

  return (
    <div className="mt-10 ml-12 mr-10">
      <table className="w-full">
        <thead>
          <tr
            className="bg-red text-left"
            style={{
              borderColor: primaryColor, 
              backgroundColor: primaryColor
            }}
          >
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>

              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Department
              </th>

              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>

              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>

              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                
              </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              {Object.keys(item).map((column, columnIndex) => (
                <td key={columnIndex} className="px-6 py-4 whitespace-nowrap">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedData[column] || item[column]}
                      onChange={(e) => handleInputChange(e, column)}
                      placeholder={item[column]}
                      className="p-1 border-gray-300 rounded-md w-full"
                    />
                  ) : (
                    item[column]
                  )}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap">
                {editIndex === index ? (
                  <button
                    className="text-green-600 hover:text-green-800 ml-2 focus:outline-none border-none"
                    title="Save"
                    onClick={() => handleSave(index)}
                  >
                    <p>Save</p>
                  </button>
                ) : (
                  <button
                    className="text-blue-600 hover:text-blue-800 ml-2 focus:outline-none border-none"
                    title="Edit"
                    onClick={() => handleEdit(index)}
                  >
                    <p>✏️</p>
                  </button>
                )}

                <button
                  className="m-1 text-red-600 hover:text-red-800 focus:outline-none border-none"
                  title="Delete"
                  onClick={() => handleDelete(index)}
                >
                  <p>❌</p>
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
