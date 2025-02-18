import React, { useState } from 'react'
import axios from 'axios'
import DeleteSupplier from './DeleteS'

const EditModal = ({
	isOpen,
	closeModal,
	initialData,
	onSave,
}) => {
	const [formData, setFormData] = useState(initialData)
	const [isDeleteModalOpen, setIsDeleteModalOpen] =
		useState(false)

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSubmit = async () => {
		try {
			// Make an HTTP POST request to your Express backend with the updated data
			const response = await axios.post(
				'http://localhost:3002/api/updateSupplier',
				formData
			)
			console.log(response.data) // Log the response from the backend
			onSave(formData)
			closeModal()
			window.location.reload()
		} catch (error) {
			console.error('Error saving changes:', error)
			// Handle error if save operation fails
		}
	}
	const handleDelete = () => {
		setIsDeleteModalOpen(true)
	}
	// const handleDeleteSupplier = async () => {
	//   try {
	//     // Make an HTTP DELETE request to delete the supplier
	//     const response = await axios.delete(
	//       `http://localhost:3001/api/deleteSupplier/${formData.supplierid}`
	//     )
	//     console.log(response.data) // Log the response from the backend
	//     // Handle any success message or logic here
	//     closeModal() // Close the modal after successful delete
	//   } catch (error) {
	//     console.error('Error deleting supplier:', error)
	//     // Handle error if delete operation fails
	//   }
	// }

	const handleDiscardChanges = () => {
		setFormData(initialData)
		closeModal()
	}

	console.log('Initial data:', initialData) // Check initialData passed to modal
	console.log('FormData:', formData) // Check formData state

	return (
		<div>
			{isOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50 shadow bg-[#00000080] ">
					<div className="inset-0 rounded-md overflow-y-auto no-scrollbar mt-[1rem] bg-white shadow-md w-[20rem] md:w-[20rem] lg:w-[25rem] lg:p-2 lg:px-6 p-2 px-4 max-h-[600px] ">
						<h1 className="text-xl text-center font-bold mb-4 mt-4">
							Edit Supplier
						</h1>
						<div className="border-b-2 border-transparent border-gradient my-[0.3rem] mb-4"></div>

						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label
									htmlFor="suppliername"
									className="block font-bold mb-1"
								>
									Supplier Name
								</label>
								<input
									type="text"
									id="suppliername"
									name="suppliername"
									value={formData.suppliername}
									onChange={handleChange}
									className="border w-full py-2 px-3 rounded focus:outline-none focus:border-blue-400"
									required
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="suppliercontact"
									className="block font-bold mb-1"
								>
									Contact Person
								</label>
								<input
									type="text"
									id="suppliercontact"
									name="suppliercontact"
									value={formData.suppliercontact}
									onChange={handleChange}
									className="border w-full py-2 px-3 rounded focus:outline-none focus:border-blue-400"
									required
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="contactphone"
									className="block font-bold mb-1"
								>
									Contact Number
								</label>
								<input
									type="text"
									id="contactphone"
									name="contactphone"
									value={formData.contactphone}
									onChange={handleChange}
									className="border w-full py-2 px-3 rounded focus:outline-none focus:border-blue-400"
									required
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="companyemail"
									className="block font-bold mb-1"
								>
									Company Email
								</label>
								<input
									type="text"
									id="companyemail"
									name="companyemail"
									value={formData.companyemail}
									onChange={handleChange}
									className="border w-full py-2 px-3 rounded focus:outline-none focus:border-blue-400"
									required
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="street"
									className="block font-bold mb-1"
								>
									Address
								</label>
								<input
									type="text"
									id="street"
									name="street"
									value={formData.street}
									onChange={handleChange}
									className="border w-full py-2 px-3 rounded focus:outline-none focus:border-blue-400"
									required
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="city"
									className="block font-bold mb-1"
								>
									City
								</label>
								<input
									type="text"
									id="city"
									name="city"
									value={formData.city}
									onChange={handleChange}
									className="border w-full py-2 px-3 rounded focus:outline-none focus:border-blue-400"
									required
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="zipcode"
									className="block font-bold mb-1"
								>
									Zip Code
								</label>
								<input
									type="text"
									id="zipcode"
									name="zipcode"
									value={formData.zipcode}
									onChange={handleChange}
									className="border w-full py-2 px-3 rounded focus:outline-none focus:border-blue-400"
									required
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="country"
									className="block font-bold mb-1"
								>
									Country
								</label>
								<input
									type="text"
									id="country"
									name="country"
									value={formData.country}
									onChange={handleChange}
									className="border w-full py-2 px-3 rounded focus:outline-none focus:border-blue-400"
									required
								/>
							</div>

							<div className="flex flex-row gap-x-2  mt-4 ">
								<button
									type="submit"
									className="bg-blue-save w-[50%] text-white py-2 px-4 rounded hover:bg-blue-700 mr-2"
									// onClick={handleSubmit}
								>
									Approve
								</button>
								<button
									type="button"
									onClick={handleDelete}
									className="bg-red-dark text-white py-2 px-4 rounded hover:bg-red-700 w-[50%]"
								>
									Delete
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
			{isDeleteModalOpen && (
				<DeleteSupplier
					isOpen={isDeleteModalOpen}
					closeModal={() => setIsDeleteModalOpen(false)}
					// onDelete={handleDeleteSupplier} // Call handleDeleteSupplier function
					supplierId={formData.supplierid}
				/>
			)}
		</div>
	)
}

export default EditModal
