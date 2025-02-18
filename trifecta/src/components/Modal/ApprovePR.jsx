import React, { useState, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'
import CloseBtn from '../Buttons/CloseBtn'
import axios from 'axios'

const ApprovePR = ({ closeModal, row }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isApproved, setIsApproved] = useState(false)

	const {
		purchaseno,
		suppliername,
		targetdeliverydate,
		ordercreated,
		itemname,
		itemdesc,
		quantity,
		status,
	} = row

	const openModal = () => {
		setIsOpen(true)
	}

	useEffect(() => {
		if (isApproved) {
			console.log('Product requisition approved!')

			const timer = setTimeout(() => {
				console.log(
					'Timer expired! Additional action after approval.'
				)

				closeModal()
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [isApproved, closeModal])

	// const handleApproveClick = () => {
	//   setIsApproved(true)
	// }

	const handleApproveClick = async () => {
		try {
			await axios.post(
				'http://localhost:3002/api/approvedStatus',
				{
					purchaseno,
				}
			)
			setIsApproved(true)
			window.location.reload()
			closeModal()
		} catch (error) {
			console.error('Error updating status:', error)
		}
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 shadow bg-[#00000080]">
			<div className="bg-white flex justify-center shadow-md flex-col items-center w-[15rem] p-4 rounded-md">
				<h1 className="text-green font-bold text-center text-[12px]">
					You are about to approve a
				</h1>
				<h1 className="text-green font-bold text-center text-[12px]">
					Product Requisition
				</h1>

				<FaCheck className="bg-green text-white rounded-sm w-16 h-16 mt-4 my-4 p-2" />
				<h1 className="font-bold text-center text-[9px] my-2">
					Do you want to Proceed?
				</h1>
				<div className="flex flex-row gap-x-2 py-2">
					<button
						className="bg-green w-[5rem] font-bold py-[0.2rem] text-sm rounded"
						onClick={handleApproveClick}
					>
						Approve
					</button>
					<CloseBtn type="cancel" closeModal={closeModal} />
				</div>
			</div>
		</div>
	)
}

export default ApprovePR
