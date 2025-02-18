import React, { useState } from 'react'
import PRheading from '../components/Header/prheading'
// import NavBarMobile from '../components/NavProcurement/NavBarMobile'
import NavBar from '../components/NavProcurement/NavBar'
import ProductReq from '../components/ProductReq/PurchaseReq'

export function PurchaseReq() {
	return (
		<div className="flex flex-col h-screen md:flex-row">
			<div className="md:h-screen mb-4 md:mb-0">
				<NavBar />
				{/* <NavBarMobile /> */}
			</div>

			<div className="h-screen md:w-full flex flex-col overflow-x-auto">
				<PRheading />
				<ProductReq />
			</div>
		</div>
	)
}
