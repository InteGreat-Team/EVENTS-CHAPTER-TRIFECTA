import React, { useState, useEffect } from 'react'
import { MdEmail } from 'react-icons/md'
import axios from 'axios'

const Email = ({ closeModal, row }) => {
	const [isLoading, setIsLoading] = React.useState(false)
	const [error, setError] = React.useState(null)

	console.log(row)

	const sendEmail = async () => {
		try {
			setIsLoading(true)

			// Call the API to send the email
			const response = await axios.post(
				'http://localhost:3002/api/sendEmail',
				{
					purchaseno: row.purchaseno,
					suppliername: row.suppliername,
					targetdeliverydate: row.targetdeliverydate,
					ordercreated: formatDate(row.ordercreated),
					itemname: row.itemname,
					itemdesc: row.itemdesc,
					quantity: row.quantity,
					status: row.status,
					companyemail: row.companyemail,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (!response.data || response.data.error) {
				throw new Error('Failed to send')
			}

			closeModal() // Close the modal if email is sent successfully
			window.location.reload()
		} catch (error) {
			console.error('Error sending email:', error)
			setError('Failed to send')
		} finally {
			setIsLoading(false)
		}
	}

	const formatDate = (dateString) => {
		const date = new Date(dateString)
		const month = (date.getMonth() + 1)
			.toString()
			.padStart(2, '0')
		const day = date.getDate().toString().padStart(2, '0')
		const year = date.getFullYear()
		return `${month}-${day}-${year}`
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 shadow bg-[#00000080]">
			<div className="bg-white flex justify-center shadow-md flex-col items-center w-[15rem] p-4 rounded-md">
				<h1 className="text-green-700 font-bold text-center text-[12px] mt-4">
					You are about to send an email
				</h1>
				<img
					src="https://logolook.net/wp-content/uploads/2021/06/Gmail-Logo.png"
					className=" rounded-sm  h-16 mt-4 my-4 cursor-pointer"
				/>
				<h1 className="font-bold text-center text-[9px] my-2">
					This will send an email to the supplier{' '}
				</h1>
				{error && <p className="text-red-500">{error}</p>}
				<div className="flex flex-row gap-x-2 py-2">
					<button
						className={`bg-green w-[5rem] font-bold py-[0.2rem] text-[12px] ${
							isLoading && 'opacity-50 cursor-not-allowed'
						}`}
						onClick={sendEmail}
						disabled={isLoading}
					>
						{isLoading ? 'Sending...' : 'Proceed'}
					</button>
					<button
						className="bg-red-dark w-[5rem] font-bold rounded-sm text-[12px]"
						onClick={closeModal}
					>
						Go Back
					</button>
				</div>
			</div>
		</div>
	)
}

export default Email
