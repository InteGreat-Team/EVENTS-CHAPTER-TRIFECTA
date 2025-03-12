import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { PiDotsThreeDuotone } from 'react-icons/pi'
import PRSummary from '../Modal/PRSummary'
import Select from 'react-select'
import { MdDelete } from 'react-icons/md'

import axios from 'axios'

const PO = () => {
	const [isPRSummaryModalOpen, setIsPRSummaryModalOpen] =
		useState(false)
	const [selectedRow, setSelectedRow] = useState(null)
	const [data, setData] = useState([])
	const [status, setStatus] = useState('')

	// useEffect(() => {
	//   console.log('Data:', data) // Log whenever data changes
	// }, [data])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'http://localhost:3002/api/purchaseOrders'
				)
				// Map the response data to extract only required fields
				const mappedData = response.data.map((data) => ({
					purchaseordernum: data.purchaseordernum,
					suppliername: data.suppliername,
					targetdeliverydate: formatDate(
						data.targetdeliverydate
					),
					ordercreated: formatDate(data.ordercreated),
					item: data.item,
					itemdescription: data.itemdescription,
					quantity: data.quantity,
					statusPO: data.status,
					unitprice: data.unitprice,
					totalamount: data.totalamount,
					invoiceno: data.invoiceno,
					status: data.status,
					orderreceived: formatDate(data.orderreceived),
					orderpaid: formatDate(data.orderpaid),
					attachment: data.attachment,
				}))
				setData(mappedData)
				console.log(mappedData)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [])

	// Function to format date as MM-DD-YYYY
	const formatDate = (dateString) => {
		const date = new Date(dateString)
		const month = (date.getMonth() + 1)
			.toString()
			.padStart(2, '0')
		const day = date.getDate().toString().padStart(2, '0')
		const year = date.getFullYear()
		return `${month}-${day}-${year}`
	}

	const customStyles = {
		headRow: {
			style: {
				fontWeight: 'bold',
				fontSize: '14px',
				backgroundColor: '#f2f2f2',
			},
		},
	}

	const openPRSummary = (row) => {
		setSelectedRow(row)
		setIsPRSummaryModalOpen(true)
	}

	const closeModal = () => {
		setIsPRSummaryModalOpen(false)
	}

	const handleStatusChange = (index, selectedOption) => {
		const updatedData = [...data]
		updatedData[index].Status = selectedOption.value
		setData(updatedData)
		console.log(data)
	}

	const handleInvoiceChange = (index, e) => {
		const { value } = e.target
		const updatedData = [...data]
		updatedData[index].OrderCreated = value
		setData(updatedData)
	}

	const statusOptions = [
		{ label: 'Paid', value: 'Paid', color: '#10B981' },
		{
			label: 'Pending',
			value: 'Pending',
			color: '#F59E0B',
		},
		{
			label: 'Received',
			value: 'Received',
			color: '#3B82F6',
		},
	]

	const columns = [
		{
			name: 'PO#',
			selector: (row) => row.purchaseordernum,
			sortable: true,
		},
		{
			name: 'Supplier',
			selector: (row) => row.suppliername,
			sortable: true,
		},
		// {
		//   name: 'Invoice No.',
		//   cell: (row, index) => (
		//     <input
		//       type="number"
		//       // value={row.OrderCreated}
		//       onChange={(e) => handleInvoiceChange(index, e)}
		//       className="h-8 px-2 border rounded-md focus:outline-none w-[7rem] focus:ring focus:ring-blue-300"
		//     />
		//   ),
		//   sortable: true,
		// },
		{
			name: 'Status',
			// cell: (row, index) => (
			//   <div style={{ width: '120px' }}>
			//     {' '}
			//     {/* Adjust the width value as needed */}
			//     <Select
			//       options={statusOptions}
			//       // value={statusOptions.find((option) => option.value)}
			//       value={status}
			//       onChange={(selectedOption) =>
			//         handleStatusChange(index, selectedOption)
			//       }
			//       menuPosition="fixed" // Fix the dropdown menu position
			//     />
			//   </div>
			// ),
			selector: (row) => row.status,
			sortable: true,
		},

		{
			name: 'Actions',
			cell: (row) => (
				<div className="flex justify-right items-center gap-x-2">
					<PiDotsThreeDuotone
						className="bg-dark-gray text-white text-[18px] rounded-sm shadow-sm w-auto h-6 lg:h-6 p-[0.2rem] cursor-pointer"
						onClick={() => openPRSummary(row)}
					/>
					{/* <MdDelete
            className="bg-red-700 text-white text-[18px] rounded-sm shadow-sm w-auto h-6 lg:h-6 p-[0.2rem] cursor-pointer"
            onClick={() => openPRSummary(row)}
          /> */}
				</div>
			),
		},
	]

	return (
		<div className=" mx-2 ml-6 mt-6 md:mx-6 md:ml-[6rem] lg:mx-36">
			{isPRSummaryModalOpen && (
				<PRSummary
					closeModal={closeModal}
					type="PurchaseOrder"
					row={selectedRow}
				/>
			)}
			<div className="flex justify-center text-center whitespace-nowrap mt-12 my-4 font-bold text-xl ">
				Purchase Order
			</div>

			<div className="overflow-x-auto rounded-lg shadow w-full">
				<DataTable
					columns={columns}
					data={data}
					pagination
					selectableRows={false}
					selectableRowsVisible={false}
					paginationPerPage={8}
					paginationRowsPerPageOptions={[5, 8]}
					customStyles={customStyles}
					searchable={true}
				/>
			</div>
		</div>
	)
}

export default PO
