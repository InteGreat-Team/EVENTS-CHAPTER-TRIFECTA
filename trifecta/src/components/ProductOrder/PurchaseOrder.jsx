import React from 'react'
import HeadingPO from '../components/Header/prorder'
import NavBar from '../components/NavProcurement/NavBar'
import NavBarMobile from '../components/NavProcurement/NavBarMobile'

import PO from '../components/ProductOrder.jsx/PO'
import POReport from '../components/ProductOrder.jsx/POReport'

const PurchaseOrder = () => {
  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className="md:h-screen mb-4 md:mb-0">
        <NavBar />
        <NavBarMobile />
      </div>
      <div className="h-screen md:w-full flex flex-col overflow-x-auto ">
        <HeadingPO />
        <PO />
        <POReport />
      </div>
    </div>
  )
}

export default PurchaseOrder
