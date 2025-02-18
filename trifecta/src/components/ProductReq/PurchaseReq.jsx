import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { FaCheck, FaTimes } from 'react-icons/fa'
import ApprovePR from '../Modal/ApprovePR'
import RejectPR from '../Modal/RejectPR'
import PRSummary from '../Modal/PRSummary'

import { PiDotsThreeDuotone } from 'react-icons/pi'
import axios from 'axios'

const ProductReq = (type) => {
	const [isApproveModalOpen, setIsApproveModalOpen] =
		useState(false)
	const [isRejectModalOpen, setIsRejectModalOpen] =
		useState(false)
	const [isPRSummaryModalOpen, setIsPRSummaryModalOpen] =
		useState(false)
	const [selectedRow, setSelectedRow] = useState(null)
	const [data, setData] = useState([])
	const [items, setItems] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'http://localhost:3002/api/dataPR'
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
				}))
				setData(mappedData)
				console.log(data)
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

	const openApproveModal = (row) => {
		setSelectedRow(row)
		setIsApproveModalOpen(true)
	}

	const openRejectModal = (row) => {
		setSelectedRow(row)
		setIsRejectModalOpen(true)
	}
	const openPRSummary = (row) => {
		setSelectedRow(row)
		setIsPRSummaryModalOpen(true)
	}

	const closeModal = () => {
		setIsApproveModalOpen(false)
		setIsRejectModalOpen(false)
		setIsPRSummaryModalOpen(false)
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
		},
		{
			name: 'Order Created',
			selector: (row) => row.ordercreated,
			sortable: true,
			hide: 'sm',
		},
		{
			name: 'Actions',
			cell: (row) => (
				<div className="flex justify-right items-center gap-x-2">
					<FaCheck
						className="bg-green text-white text-[18px] rounded-sm shadow-sm w-auto h-6 lg:h-6 p-[0.2rem] cursor-pointer"
						onClick={() => openApproveModal(row)}
					/>
					<FaTimes
						className="bg-red-dark text-white text-[18px] rounded-sm shadow-sm w-auto h-6 lg:h-6 p-[0.2rem] cursor-pointer"
						onClick={() => openRejectModal(row)}
					/>
					<PiDotsThreeDuotone
						onClick={() => openPRSummary(row)} // Pass 'purchaseRequest' as type
						className="bg-dark-gray text-white text-[18px] rounded-sm shadow-sm w-auto h-6 lg:h-6 p-[0.2rem] cursor-pointer"
					/>
				</div>
			),
		},
	]

	return (
		<div className="mx-2 ml-6 mt-6 md:mx-6 md:ml-[6rem] lg:mx-36">
			{isApproveModalOpen && (
				<ApprovePR
					closeModal={closeModal}
					row={selectedRow}
				/>
			)}
			{isRejectModalOpen && (
				<RejectPR
					closeModal={closeModal}
					row={selectedRow}
				/>
			)}
			{isPRSummaryModalOpen && (
				<PRSummary
					closeModal={closeModal}
					type="PurchaseRequest"
					row={selectedRow}
				/>
			)}{' '}
			<div className="flex justify-center text-center whitespace-nowrap text-xl mt-12 my-4 font-bold">
				Pending For Approval
			</div>
			<div className="overflow-auto rounded-lg shadow-md    w-full">
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

export default ProductReq
