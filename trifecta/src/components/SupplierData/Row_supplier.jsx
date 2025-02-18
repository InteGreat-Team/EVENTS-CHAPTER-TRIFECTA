import React, { useState, useEffect } from 'react'
import { CiEdit } from 'react-icons/ci'
import { PiDotsThreeDuotone } from 'react-icons/pi'
import { SiGoogleforms } from 'react-icons/si'
import DataTable from 'react-data-table-component'
import { SupplierInfo as initialSupplierInfo } from '../SupplierData/SupplierInfo'
import EditModal from '../Modal/EditSupplier'
import SupplierSumm from '../Modal/SupplierSumm'
import PurchaseReqModal from '../Modal/PurchaseRequest' // Renamed the import
import axios from 'axios'

const Row_supplier = () => {
	const [editModalOpen, setEditModalOpen] = useState(false)
	const [selectedSupplier, setSelectedSupplier] =
		useState(null)
	const [SupplierInfo, setSupplierInfo] = useState(
		initialSupplierInfo
	)
	const [SupplierSummary, setSupplierSummary] =
		useState(false)
	const [PurchaseReqOpen, setPurchaseReqOpen] =
		useState(false) // Renamed the state variable
	const [data, setData] = useState([])

	const [selectedRow, setSelectedRow] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'http://localhost:3002/api/data'
				)
				// Map the response data to extract only required fields
				const mappedData = response.data.map(
					(supplier) => ({
						supplierid: supplier.supplierid,
						suppliername: supplier.suppliername,
						contactphone: supplier.contactphone,
						suppliercontact: supplier.suppliercontact,
						companyemail: supplier.companyemail,
						street: supplier.street,
						city: supplier.city,
						state: supplier.state,
						zipcode: supplier.zipcode,
						country: supplier.country,
					})
				)
				setData(mappedData)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [])

	const openEditModal = (supplier) => {
		setSelectedSupplier(supplier)
		setEditModalOpen(true)
	}
	const openSupplierSummary = (row) => {
		setSelectedRow(row)
		setSupplierSummary(true)
	}
	const openPurchaseReq = (row) => {
		setSelectedRow(row)
		setPurchaseReqOpen(true)
	}

	const closeEditModal = () => {
		setSelectedSupplier(null)
		setEditModalOpen(false)
	}

	const handleSaveChanges = (formData) => {
		const updatedSupplierInfo = SupplierInfo.map(
			(supplier) =>
				supplier.id === formData.id ? formData : supplier
		)
		setSupplierInfo(updatedSupplierInfo)
		console.log('Changes saved:', formData)
		closeEditModal() // Close modal after saving changes
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
			name: 'Supplier Name',
			selector: (row) => row.suppliername,
			sortable: true,
		},
		{
			name: 'Contact Number',
			selector: (row) => row.contactphone,
			sortable: true,
		},
		{
			name: 'Contact Person',
			selector: (row) => row.suppliercontact,
			sortable: true,
			// hide: 'md',
		},
		{
			name: 'Actions',
			cell: (row) => (
				<div className="flex gap-x-2">
					<CiEdit
						onClick={() => openEditModal(row)}
						className="bg-brand-blue text-white  text-[18px] rounded-sm shadow-sm w-auto h-6 lg:h-6 p-[0.2rem] cursor-pointer"
					/>
					<PiDotsThreeDuotone
						onClick={() => openSupplierSummary(row)}
						className="bg-dark-gray text-white text-[18px] rounded-sm shadow-sm w-auto h-6 lg:h-6 p-[0.2rem] cursor-pointer"
					/>
					<SiGoogleforms
						className="bg-purple-light text-white  text-[18px] rounded-sm shadow-sm w-auto h-6 lg:h-6 p-[0.2rem] cursor-pointer  "
						onClick={() => openPurchaseReq(row)}
					/>
				</div>
			),
		},
	]
	// console.log('SupplierInfo:', SupplierInfo) // Check SupplierInfo array

	return (
		<div className="flex flex-col mx-4 mt-10  md:mx-6 md:ml-[6rem] lg:mx-28 rounded-lg shadow-md">
			<DataTable
				columns={columns}
				data={data}
				dense
				pagination
				paginationRowsPerPageOptions={[5, 10]}
				paginationPosition="bottom"
				className=" rounded-lg shadow-sm"
				customStyles={customStyles}
			/>
			{editModalOpen && (
				<EditModal
					isOpen={editModalOpen}
					closeModal={closeEditModal}
					initialData={selectedSupplier}
					onSave={handleSaveChanges}
				/>
			)}
			{SupplierSummary && selectedRow && (
				<SupplierSumm
					isOpen={SupplierSummary}
					closeModal={() => setSupplierSummary(false)}
					rowData={selectedRow}
				/>
			)}
			{PurchaseReqOpen && selectedRow && (
				<PurchaseReqModal // Changed the component name here
					isOpen={PurchaseReqOpen}
					closeModal={() => setPurchaseReqOpen(false)}
					rowData={selectedRow}
				/>
			)}
		</div>
	)
}

export default Row_supplier
