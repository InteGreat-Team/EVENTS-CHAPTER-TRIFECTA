import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import InputField from '../InputField/InputField'
import { IoAddCircle } from 'react-icons/io5'
import CloseBtn from '../Buttons/CloseBtn'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useEffect} from 'react'

import axios from 'axios'

function PurchaseRequest({ closeModal, rowData }) {
	const formArray = [1, 2]
	const [formNo, setFormNo] = useState(formArray[0])
	const [itemInfoCount, setItemInfoCount] = useState([
		{ item: '', quantity: '', itemDescription: '' },
	])
	const [isHovered, setIsHovered] = useState(false)
	const [showPopup, setShowPopup] = useState(false)
	const { suppliername, companyemail } = rowData
	const [id, setId] = useState('')
	const [itemOptions, setItemOptions] = useState([])

	useEffect(() => {
		axios.get('http://localhost:3001/api/data')
			.then((response) => {
				if (Array.isArray(response.data)) {
					setItemOptions(response.data.map(item => item.itemname))
				}
			})
			.catch((error) => {
				console.error('Error fetching item names:', error)
			})
	}, [])
	


	

	const addNewItemInfo = () => {
		setItemInfoCount([
			...itemInfoCount,
			{ item: '', quantity: '', itemDescription: '' },
		])
	}

	const handleMouseEnter = () => {
		setIsHovered(true)
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
		setTimeout(() => setShowPopup(false), 300) // Delay hiding the popup
	}

	
	const [selectedDate, setSelectedDate] = useState(null)

	const handleDateChange = (date) => {
		setSelectedDate(date)

		// Extract year, month, and day from the selected date
		const yearTarget = date.getFullYear().toString()
		const monthTarget = (date.getMonth() + 1)
			.toString()
			.padStart(2, '0')
		const dayTarget = date
			.getDate()
			.toString()
			.padStart(2, '0')

		// Combine year, month, and day into targetDelivery string
		const targetDelivery = `${yearTarget}/${monthTarget}/${dayTarget}`

		// Create a new Date object to get the current date and time
		const currentDate = new Date()

		// Extract individual components of the current date and time
		const year = currentDate.getFullYear().toString()
		const month = (currentDate.getMonth() + 1)
			.toString()
			.padStart(2, '0')
		const day = currentDate
			.getDate()
			.toString()
			.padStart(2, '0')
		const hours = currentDate
			.getHours()
			.toString()
			.padStart(2, '0')
		const minutes = currentDate
			.getMinutes()
			.toString()
			.padStart(2, '0')
		const seconds = currentDate
			.getSeconds()
			.toString()
			.padStart(2, '0')

		// Generate the ID
		const id = `${year}${month}${day}${hours}${minutes}${seconds}`

		// Update the state with the current date and time and the target delivery date
		setState((prevState) => ({
			...prevState,
			targetDeliveryDate: targetDelivery,
			id: id,
		}))
	}

	const [state, setState] = useState({
		suppliername,
		companyemail,
		targetDeliveryDate: null, // Initialize with null instead of an empty string

		// item: '',
		// quantity: '',
		// itemDescription: '',
	})

	const handleItemChange = (index, field, value) => {
		const updatedItemInfo = [...itemInfoCount]
		updatedItemInfo[index][field] = value
		setItemInfoCount(updatedItemInfo)
	}

	const inputHandle = (e) => {
		if (e.target && e.target.name && e.target.value) {
			console.log(
				'Input changed:',
				e.target.name,
				e.target.value
			)
			setState({
				...state,
				[e.target.name]: e.target.value,
			})
		} else {
			console.error('Invalid event object or properties.') // Log error if any of the properties are undefined
		}
	}

	const next = () => {
		console.log('Current state:', state)

		if (
			formNo === 1 &&
			state.suppliername &&
			state.targetDeliveryDate
			// state.address &&
			// state.city &&
			// state.state &&
			// state.zipCode &&
			// state.country
		) {
			setFormNo(formNo + 1)
		} else if (
			formNo === 2 &&
			state.item &&
			state.quantity &&
			state.itemDescription
		) {
			setFormNo(formNo + 1)
		} else {
			toast.error('Please fill up all input fields')
		}
	}

	const pre = () => {
		setFormNo(formNo - 1)
	}

	const finalSubmit = () => {
		const allItemsFilled = itemInfoCount.every(
			(item) =>
				item.item && item.quantity && item.itemDescription
		)

		if (allItemsFilled) {
			console.log(state)
			console.log(itemInfoCount)
			const combinedData = {
				id: state.id,
				suppliername: state.suppliername,
				companyemail: state.companyemail,
				targetDeliveryDate: state.targetDeliveryDate,
				items: itemInfoCount,
			}
			console.log(combinedData)
			try {
				axios.post(
					'http://localhost:3002/api/addPR',
					combinedData
				)
				window.location.reload()
			} catch (error) {
				console.error('Error submitting form:', error)
			}

			toast.success('Form submitted successfully')

			// Set a timeout to close the modal after 3 seconds (adjust as needed)
			setTimeout(() => {
				closeModal() // Close the modal
			}, 5000)
		} else {
			toast.error('Please fill up all input fields')
		}
	}

	

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 shadow bg-[#00000080] p-2 ">
			<ToastContainer />
			<div className="card w-[370px] rounded-md shadow-md  p-5 bg-white ">
				<div className="flex justify-center items-center ">
					{formArray.map((v, i) => (
						<React.Fragment key={i}>
							<div
								className={`w-[35px] my-3 text-white rounded-full ${
									formNo - 1 === i ||
									formNo - 1 === i + 1 ||
									formNo === formArray.length
										? 'bg-gradient-color'
										: 'bg-dark-gray'
								} h-[35px] flex justify-center items-center`}
							>
								{v}
							</div>
							

							{i !== formArray.length - 1 && (
								<div
									key={`divider_${i}`}
									className={`w-[85px] h-[2px] ${
										formNo === i + 2 ||
										formNo === formArray.length
											? 'bg-brand-purple'
											: 'bg-slate-400'
									}`}
								></div>
							)}
						</React.Fragment>
					))}
				</div>
				{formNo === 1 && (
					<div>
						<h1 className=" text-[18px] font-bold flex justify-center mb-10">
							Purchase Request Form
						</h1>
						<h1 className="block text-[12px] font-bold my-[0.4rem] lg:mb-[0.2rem] lg:text-base">
							Supplier{' '}
						</h1>
						<InputField
							type="SupplierName"
							value={suppliername}
							onChange={inputHandle}
							placeholder="Enter Supplier Name" // Placeholder text here
							disabled="disabled"
						/>

						<div className="flex flex-col">
							<h1 className="block text-[12px] font-bold my-[0.4rem] lg:mb-[0.2rem] lg:text-base">
								Target Delivery Date:
							</h1>
							<DatePicker
								selected={selectedDate}
								onChange={handleDateChange}
								dateFormat="MM-dd-yyyy"
								minDate={new Date()}
								placeholderText="Select a date"
								className="border border-gray-400   flex justify-center items-center rounded py-1 pl-2 w-full"
							/>
						</div>
						<div className="flex flex-row gap-x-2 py-2 w-[100%]">
							<CloseBtn
								closeModal={closeModal}
								type="close"
							/>
							<button
								onClick={next}
								className="bg-purple   text-white  font-bold py-[0.2rem] text-sm rounded flex-grow"
							>
								Next
							</button>
						</div>
					</div>
				)}
				{formNo === 2 && (
	<div className="max-h-[500px] overflow-y-scroll no-scrollbar">
		<div className="flex flex-col mb-2">
			<h1 className="self-center font-bold text-lg">Order Info</h1>
			<div className="flex items-center justify-end mt-4">
				<div
					className="relative"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<IoAddCircle
						className="text-purple-light text-2xl cursor-pointer"
						onClick={addNewItemInfo}
					/>
					{isHovered && (
						<div className="absolute top-0 right-full ml-2 mt-2 text-white bg-dark-blue px-2 py-1 text-[11px] rounded-tr-lg whitespace-nowrap">
							Add New Item
						</div>
					)}
				</div>
			</div>

		<h className="block text-[12px] font-bold my-[0.4rem] lg:mb-[0.2rem] lg:text-base">Select An Item</h>
		

			{itemInfoCount.map((item, index) => (
				<div key={index} className="flex flex-col mb-2">
					{/* Replace InputField with Dropdown for Item Selection */}
					<select
						value={item.item}
						onChange={(e) =>
							handleItemChange(index, 'item', e.target.value)
						}
						className="border border-gray-400 rounded py-1 pl-2 w-full"
					>
						<option value="">Select an item</option>
						{itemOptions.map((option, idx) => (
							<option key={idx} value={option}>
								{option}
							</option>
						))}
					</select>

				


					<div className="grid grid-cols-3 w-[100%] gap-x-4">
						<div className="">
							<InputField
								type="Quantity"
								value={item.quantity}
								onChange={(e) =>
									handleItemChange(
										index,
										'quantity',
										e.target.value
									)
								}
								className="border border-blue-500"
							/>
						</div>
						<div className="col-span-2">
							<InputField
								type="ItemDescription"
								value={item.itemDescription}
								onChange={(e) =>
									handleItemChange(
										index,
										'itemDescription',
										e.target.value
									)
								}
							/>
						</div>
					</div>
				</div>
			))}
			<div className="mt-4 gap-3 flex justify-center items-center">
				<button
					onClick={pre}
					className="px-3 py-2 text-base rounded-md w-full text-white bg-purple"
				>
					Previous
				</button>
				<button
					onClick={finalSubmit}
					className="px-3 py-2 text-base rounded-md w-full text-white bg-green"
				>
					Submit
				</button>
			</div>
		</div>
	</div>
)}

			</div>
		</div>
	)
}

export default PurchaseRequest
