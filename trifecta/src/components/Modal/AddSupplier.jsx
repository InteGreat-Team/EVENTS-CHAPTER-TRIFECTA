import { RiFileAddFill } from 'react-icons/ri'
import React, { useState } from 'react'
import InputField from '../InputField/InputField'
import CloseBtn from '../Buttons/CloseBtn'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const AddModal = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [formData, setFormData] = useState({
		suppliername: '',
		suppliercontact: '',
		contactphone: '',
		companyemail: '',
		street: '',
		city: '',
		state: '',
		zipcode: '',
		country: '',
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}
	const closeModal = () => {
		setIsOpen(false)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			console.log(formData)
			await axios.post(
				'http://localhost:3002/api/addSupplier',
				formData
			)
			window.location.reload()
		} catch (error) {
			console.error('Error submitting form:', error)
		}
	}

	return (
		<div className="">
			<button
				onClick={() => setIsOpen(true)}
				className="bg-brand-purple text-xs mt-4 w-[9rem] mx-2 lg:mx-24 p-2 flex items-center justify-center rounded-md shadow-md text-white cursor-pointer"
			>
				<span className="text-base mr-2">
					<RiFileAddFill />
				</span>
				Add Supplier
			</button>
			{isOpen && (
				<div className="flex justify-center overflow-y-auto inset-0 fixed p-2 items-center  z-50 shadow bg-[#00000080]">
					<ToastContainer />

					<div
						className="inset-0"
						onClick={closeModal}
					></div>
					<div className="rounded-lg  bg-white shadow-md w-[20rem] md:w-[20rem] lg:w-[25rem] lg:p-2 lg:px-6 p-2 px-4">
						<div className="text-center">
							<h1 className="text-base font-bold mb-2">
								Supplier{' '}
							</h1>
							<div className="border-b-2 border-transparent border-gradient my-[0.3rem] mb-4"></div>
						</div>
						<h2 className="text-[14px] font-bold mb-2">
							Supplier Info
						</h2>
						<form onSubmit={handleSubmit}>
							<div className="supplier-credentials">
								<InputField
									type="SupplierNameField"
									onChange={handleChange}
									value={formData.suppliername}
								/>
								<InputField
									type="ContactPerson"
									onChange={handleChange}
									value={formData.suppliercontact}
								/>
								<InputField
									type="ContactNumber"
									onChange={handleChange}
									value={formData.contactphone}
								/>
								<InputField
									type="CompanyEmail"
									onChange={handleChange}
									value={formData.companyemail}
								/>
								<InputField
									type="Address"
									onChange={handleChange}
									value={formData.street}
								/>
								<div className="grid grid-cols-2 w-[100%]  gap-x-4">
									<InputField
										type="City"
										onChange={handleChange}
										value={formData.city}
									/>
									<InputField
										type="State"
										onChange={handleChange}
										value={formData.state}
									/>
									<InputField
										type="ZipCode"
										onChange={handleChange}
										value={formData.zipcode}
									/>
									<InputField
										type="Country"
										onChange={handleChange}
										value={formData.country}
									/>
								</div>
							</div>
							<div className="flex flex-row gap-x-2  mt-4 ">
								<button
									type="submit"
									className=" shadow-sm bg-blue-save w-[50%] hover:bg-blue-700 text-white font-bold py-[0.2rem] p-2 text-sm rounded   whitespace-nowrap "
								>
									Save Changes
								</button>
								<CloseBtn
									type="discard"
									closeModal={closeModal}
								/>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}

export default AddModal
