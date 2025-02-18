import React, { useState, useEffect } from 'react'
import AddProductModal from '../Modal/AddProduct'
import EditProductModal from '../Modal/EditProduct'
import axios from 'axios'

const Table = () => {
  const [data, setData] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/data') // Adjust the URL to your API endpoint
        setData(response.data)
        console.log(response.data) // Log the response data directly after setting state
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData() // Fetch data when the component mounts
  }, []) // Empty dependency array ensures useEffect runs only once

  const toggleModalAdd = () => {
    setShowAdd(!showAdd)
  }

  const toggleModalEdit = () => {
    setShowEdit(!showEdit)
  }

  const handleRowClick = (item) => {
    setSelectedItem(item) // Set the selected item when a row is clicked
    toggleModalEdit() // Show the edit modal
  }

  return (
    <>
      <div className="overflow-auto rounded-lg shadow w-full mb-5">
        <table className="w-full shadow-lg">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr className="">
              {[
                'Item ID',
                'Item Name',
                'Item Category',
                'Item Description',
                'Unit Price',
                'Retail Price',
                'Reorder Point',
                'Reorder Quantity',
                'Active Status',
                'Action Flag',
              ].map((columnName, index) => (
                <th
                  key={index}
                  className="p-3 text-sm font-semibold tracking-wide whitespace-nowrap"
                >
                  {columnName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* <tr className="hover:underline"> */}
            {data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:underline text-center whitespace-nowrap cursor-pointer"
                onClick={() => handleRowClick(item)}
              >
                <td className="p-4">{item.id}</td>
                <td>{item.item_name}</td>
                <td>{item.item_category}</td>
                <td>{item.item_description}</td>
                <td>{item.unit_price}</td>
                <td>{item.retail_price}</td>
                <td>{item.reorder_point}</td>
                <td>{item.reorder_quantity}</td>
                <td>{item.active_status ? '✔️' : '❌'}</td>
                <td>{item.action_flag}</td>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer block mx-auto"
                    onClick={handleRowClick}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </td>
              </tr>
            ))}
            {/* {[
                '-',
                '-',
                '-',
                '-',
                '-',
                '-',
                '-',
                '-',
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer block mx-auto"
                  onClick={handleRowClick}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>,
              ].map((columnName, index) => (
                <td
                  key={index}
                  className="p-3 text-sm text-gray-700 text-center whitespace-nowrap "
                >
                  {columnName}
                </td>
              ))} 
            </tr>*/}
          </tbody>
        </table>
        {/* </div> */}
      </div>

      {/* Modal */}
      <AddProductModal showAdd={showAdd} toggleModalAdd={toggleModalAdd} />
      <EditProductModal
        showEdit={showEdit}
        toggleModalEdit={toggleModalEdit}
        selectedItem={selectedItem}
      />
    </>
  )
}

export default Table
