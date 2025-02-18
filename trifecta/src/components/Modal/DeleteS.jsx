import React from 'react'
import { FaTimes } from 'react-icons/fa'
import CloseBtn from '../Buttons/CloseBtn'
import axios from 'axios'

const DeleteS = ({ isOpen, closeModal, supplierId }) => {
	console.log(supplierId)
	const deleteSupplier = async () => {
		try {
			const response = await axios.delete(
				`http://localhost:3002/api/deleteSupplier/${supplierId}`
			)
			console.log(response.data)
			closeModal()
			window.location.reload()
		} catch (error) {
			console.error('Error deleting supplier:', error)
		}
	}
	return (
		<>
			{isOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50 shadow bg-[#00000080]">
					<div className="bg-white flex justify-center shadow-md flex-col items-center w-[15rem] p-4 rounded-md">
						<h1 className="text-red font-bold text-center text-[12px]">
							You are about to delete a
						</h1>
						<h1 className="text-red font-bold text-center text-[12px]">
							Supplier
						</h1>
						<FaTimes className="bg-red-dark text-white rounded-sm w-16 h-16 mt-4 my-4" />
						<h1 className="font-bold text-center text-[9px] my-2 text-red-600">
							*This will remove the data of supplier
						</h1>
						<div className="flex flex-row gap-x-2 py-2">
							<button
								className="bg-orange text-white w-[5rem] font-bold py-[0.2rem] text-sm rounded"
								onClick={deleteSupplier}
							>
								Delete
							</button>
							<CloseBtn
								type="goBack"
								closeModal={closeModal}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default DeleteS
