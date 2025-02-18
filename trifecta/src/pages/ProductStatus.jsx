import React from 'react'
import PRheading from '../components/Header/prheading'
// import NavBarMobile from '../components/NavProcurement/NavBarMobile'
import NavBar from '../components/NavProcurement/NavBar'
import PRStatus from '../components/ProductReq/PRStatus'
import Report from '../components/ProductReq/Report'

export function ProductStatus() {
	return (
		<div className="flex flex-col h-screen md:flex-row">
			<div className="md:h-screen mb-4 md:mb-0">
				<NavBar />
				{/* <NavBarMobile /> */}
			</div>
			<div className="h-screen md:w-full flex flex-col overflow-x-auto">
				<PRheading />
				<PRStatus />
				<Report />
			</div>
		</div>
	)
}
