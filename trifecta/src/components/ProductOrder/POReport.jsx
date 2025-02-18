import React, { useState } from 'react'
import { IoDownloadOutline } from 'react-icons/io5'
import axios from 'axios'

const POReport = () => {
	const [selectedOption, setSelectedOption] = useState('')

	const handleChange = (e) => {
		const selectedValue = e.target.value
		console.log('Selected Option:', selectedValue)
		setSelectedOption(selectedValue)
	}

	const handleDownloadCSV = () => {
		window.open(
			'http://localhost:3002/api/downloadPurchaseOrder',
			'_blank'
		)
	}

	return (
		<div className="flex justify-end lg:mx-[9rem] mt-[1rem] text-left py-4  ">
			{/* <h1 className="py-2">Filter by action:</h1>
      <select
        onChange={handleChange}
        value={selectedOption}
        className=" w-[10rem] overflow-y-auto no-scrollbar bg-white border shadow-md hover:border-gray-500 mx-6 py-2 pr-8 rounded  leading-tight focus:outline-none focus:shadow-outline"
      >
        <option
          value=""
          className="text-gray-200 overflow-y-auto no-scrollbar "
        >
          Filter by Action
        </option>
        <option value="paid">Paid</option>
        <option value="received">Received</option>
      </select> */}
			<button
				onClick={handleDownloadCSV}
				className="bg-brand-blue px-4 py-2 rounded-md flex"
			>
				<IoDownloadOutline className="text-xl mr-2" />
				<h1>CSV</h1>
			</button>
		</div>
	)
}

export default POReport
