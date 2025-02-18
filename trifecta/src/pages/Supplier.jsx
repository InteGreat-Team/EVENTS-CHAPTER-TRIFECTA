import { useState } from 'react'
import NavBarMobile from '../components/NavProcurement/NavBarMobile'
import NavBar from '../components/NavProcurement/NavBar'
import Heading from '../components/Header/supplierheading'
//import Addsupplierbtn from '../components/button/addvendor'
import AddSupplier from '../components/Modal/AddSupplier'
import PurchaseRequest from '../components/Modal/PurchaseRequest.jsx'
import EditForm from '../components/Modal/EditSupplier'
//import SearchBar from '../components/search/searchbar'
import Row_supplier from '../components/SupplierData/Row_supplier'

export function Supplier() {
	return (
		<div className="flex flex-col h-screen w-screen md:flex-row">
			<div className="md:h-screen mb-4 md:mb-0">
				<NavBar />
				{/* <NavBarMobile /> */}
			</div>
			<div className="h-screen md:w-full w-full flex flex-col">
				<Heading />
				<AddSupplier />
				{/* <PurchaseRequest /> */}
				<Row_supplier />
				{/* <EditForm /> */}
				{/* <Addsupplierbtn /> */}
				{/* <SearchBar /> */}
			</div>
		</div>
	)
}
