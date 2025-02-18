import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import PRData from './PRdata'
import { MdEmail } from 'react-icons/md'
import { PiDotsThreeDuotone } from 'react-icons/pi'
import EmailModal from '../Modal/Email'
import PRSummary from '../Modal/PRSummary'
import axios from 'axios'

const PRStatus = () => {
	const [isEmailModalOpen, setIsEmailModalOpen] =
		useState(false)
	const [isPRSummaryModalOpen, setIsPRSummaryModalOpen] =
		useState(false)
	const [selectedRow, setSelectedRow] = useState(null)
	const [data, setData] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'http://localhost:3002/api/dataProductStatus'
				)
				// Map the response data to extract only required fields
				const mappedData = response.data.map((data) => ({
					purchaseno: data.purchaseno,
					suppliername: data.suppliername,
					targetdeliverydate: data.targetdeliverydate,
					ordercreated: formatDate(data.ordercreated),
					itemname: data.itemname,
					itemdesc: data.itemdesc,
					quantity: data.quantity,
					status: data.status,
					companyemail: data.companyemail,
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

	const openEmailModal = (row) => {
		setSelectedRow(row)
		setIsEmailModalOpen(true)
	}

	const openPRSummary = (row) => {
		setSelectedRow(row)
		setIsPRSummaryModalOpen(true)
	}

	const closeModal = () => {
		setIsEmailModalOpen(false)
		setIsPRSummaryModalOpen(false)
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
	const columns = [
		{
			name: 'Purchase No.',
			selector: (row) => row.purchaseno,
			sortable: true,
		},
		{
			name: 'Supplier',
			selector: (row) => row.suppliername,
			sortable: true,
			hide: 'sm',
		},
		{
			name: 'Order Created',
			selector: (row) => row.ordercreated,
			sortable: true,
			hide: 'sm',
		},
		{
			name: 'Status',
			selector: (row) => row.status,
			sortable: true,
			cell: (row) => (
				<div
					className={`font-bold text-[12px] status-indicator ${
						row.status.toLowerCase() === 'pending'
							? 'text-orange'
							: row.status.toLowerCase() === 'approved'
							? 'text-green'
							: row.status.toLowerCase() === 'rejected'
							? 'text-red'
							: ''
					}`}
				>
					{row.status}
				</div>
			),
		},

		{
			name: 'Actions',
			cell: (row) => (
				<div className="flex justify-right items-center gap-x-2">
					<PiDotsThreeDuotone
						className="bg-dark-gray text-white text-[18px] rounded-sm shadow-sm w-auto h-6 lg:h-6 p-[0.2rem] cursor-pointer"
						onClick={() => openPRSummary(row)}
					/>
					<MdEmail
						className={`bg-brand-blue text-white text-[18px] rounded-sm shadow-sm w-auto h-6 lg:h-6 p-[0.2rem] cursor-pointer ${
							row.status.toLowerCase() === 'rejected' ||
							row.status.toLowerCase() === 'pending'
								? 'opacity-50 cursor-not-allowed'
								: ''
						}`}
						onClick={() => {
							if (
								row.status.toLowerCase() !== 'rejected' &&
								row.status.toLowerCase() !== 'pending'
							) {
								openEmailModal(row)
							}
						}}
						disabled={
							row.status.toLowerCase() === 'rejected' ||
							row.status.toLowerCase() === 'pending'
						}
					/>
				</div>
			),
		},
	]

	return (
		<div className="mx-2 ml-6 mt-6 md:mx-6 md:ml-[6rem] lg:mx-36 ">
			{isEmailModalOpen && (
				<EmailModal
					closeModal={closeModal}
					type="Email"
					row={selectedRow}
				/>
			)}
			{isPRSummaryModalOpen && (
				<PRSummary
					closeModal={closeModal}
					type="PurchaseRequest"
					row={selectedRow}
				/>
			)}

			<div className="flex justify-center text-center whitespace-nowrap mt-12 my-4 font-bold mb-8 text-xl">
				Product Requisition Status
			</div>
			<div className="overflow-auto rounded-lg shadow-md w-full">
				<DataTable
					columns={columns}
					data={data}
					pagination
					paginationRowsPerPageOptions={[5, 8]}
					customStyles={customStyles}
				/>
			</div>
		</div>
	)
}

export default PRStatus
