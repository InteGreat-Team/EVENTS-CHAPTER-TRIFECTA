import React, { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import CloseBtn from '../Buttons/CloseBtn'
import axios from 'axios'

const RejectPR = ({ isOpen, closeModal, row }) => {
	const [isRejected, setIsRejected] = useState(false)
	const [reason, setReason] = useState('')
	const [isReasonProvided, setIsReasonProvided] =
		useState('true')

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

	useEffect(() => {
		if (isRejected) {
			console.log('Product requisition rejected!')

			const timer = setTimeout(() => {
				console.log(
					'Timer expired! Additional action after approval.'
				)

				closeModal()
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [isRejected, closeModal])

	const handleRejectClick = async () => {
		console.log(reason)
		if (!reason) {
			// If reason is not provided, set isReasonProvided to false
			setIsReasonProvided(false)
			return
		}

		try {
			await axios.post(
				'http://localhost:3002/api/rejectedStatus',
				{
					purchaseno,
					reason,
				}
			)
			setIsRejected(true)
			window.location.reload()
			closeModal()
		} catch (error) {
			console.error('Error updating status:', error)
		}
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 shadow bg-[#00000080]">
			<div className="bg-white flex justify-center  shadow-md flex-col items-center w-[15rem] p-4 rounded-md">
				<h1 className="text-red font-bold text-center text-[12px]">
					You are about to reject a
				</h1>
				<h1 className="text-red font-bold text-center text-[12px]">
					Product Requisition
				</h1>
				<FaTimes className="bg-red-dark text-white rounded-sm w-16 h-16 mt-4 my-4" />
				<h1 className=" font-extrabold text-center text-[9px] my-2">
					Do you want to Proceed?
				</h1>
				{/* Display warning if reason is not provided */}
				{!isReasonProvided && (
					<p className="text-red text-[9px] mb-2">
						Please provide a reason for rejection.
					</p>
				)}
				<input
					type="text"
					className="border border-gray-300 rounded-md px-2  w-[10rem]"
					placeholder="Enter reason here"
					value={reason}
					onChange={(e) => {
						setReason(e.target.value)
						setIsReasonProvided(true) // Reset the flag when user starts typing
					}}
					required
				/>
				<div className="flex flex-row gap-x-2 py-2">
					<button
						className="bg-orange w-[5rem] font-bold py-[0.2rem] text-sm rounded "
						onClick={handleRejectClick}
					>
						Reject
					</button>
					<CloseBtn type="cancel" closeModal={closeModal} />
				</div>
			</div>
		</div>
	)
}

export default RejectPR
