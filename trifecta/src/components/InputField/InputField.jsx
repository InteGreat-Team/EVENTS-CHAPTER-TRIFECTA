import React from 'react'
import SupplierInfo from '../SupplierData/SupplierInfo'
export default function InputField({ type, value, onChange, disabled }) {
  let labelText = ''
  let htmlForValue = ''
  let inputType = 'text' // Default type is text

  if (type === 'SupplierNameSelect') {
    labelText = 'Supplier Name'
    htmlForValue = 'companyName'
    // Create the dropdown list for supplier names
    return (
      <div className="">
        <label
          htmlFor={htmlForValue}
          className="block text-[12px] font-bold my-[0.4rem] lg:mb-[0.2rem] lg:text-base"
        >
          {labelText}
        </label>
        <select
          id={htmlForValue}
          name={htmlForValue} // This line is likely causing the error
          onChange={onChange} // Pass the selected value directly
          value={value} // Set the selected value
          className="border px-2 text-sm rounded py-1 mt-[-5px] focus:outline-none focus:border-blue-500 w-[100%] "
        >
          <option value="">Select Supplier</option>
          {SupplierInfo.map((supplier) => (
            <option key={supplier.id} value={supplier.companyName}>
              {supplier.companyName}
            </option>
          ))}
        </select>
      </div>
    )
  } else if (type === 'ContactPerson') {
    labelText = 'Contact Person'
    htmlForValue = 'suppliercontact'
  } else if (type === 'SupplierNameField') {
    labelText = 'Supplier Name'
    htmlForValue = 'suppliername'
  } else if (type === 'Buyer') {
    labelText = 'Buyers Name'
    htmlForValue = 'buyerName'
  } else if (type === 'ContactNumber') {
    labelText = 'Contact Number'
    htmlForValue = 'contactphone'
  } else if (type === 'CompanyEmail') {
    labelText = 'Company Email'
    htmlForValue = 'companyemail'
  } else if (type === 'Address') {
    labelText = 'Address'
    htmlForValue = 'street'
  } else if (type === 'City') {
    labelText = 'City'
    htmlForValue = 'city'
  } else if (type === 'State') {
    labelText = 'State'
    htmlForValue = 'state'
  } else if (type === 'ZipCode') {
    labelText = 'Zip Code'
    htmlForValue = 'zipcode'
    inputType = 'number' // Set type to 'number' for quantity
  } else if (type === 'Country') {
    labelText = 'Country'
    htmlForValue = 'country'
  } else if (type === 'Item') {
    labelText = 'Item Name'
    htmlForValue = 'item'
  } else if (type === 'ItemDescription') {
    labelText = 'Item Description'
    htmlForValue = 'itemDescription'
  } else if (type === 'Quantity') {
    labelText = 'Quantity'
    htmlForValue = 'quantity'
    inputType = 'number'
  } else if (type === 'Unit Price') {
    htmlForValue = 'unitPrice'
    inputType = 'number'
  } else if (type === 'Invoice Number') {
    htmlForValue = 'invoiceno'
    inputType = 'number'
  }

  return (
    <div className="div">
      <label
        htmlFor={htmlForValue}
        className="block text-[12px] font-bold my-[0.4rem] lg:mb-[0.2rem] lg:text-base"
      >
        {labelText}
      </label>

      {type === 'Unit Price' && (
        <div className="flex items-center">
          <input
            type={inputType}
            id={htmlForValue}
            name={htmlForValue}
            onChange={(e) => onChange(e)}
            value={value}
            className="border px-2 text-sm rounded  py-1 mt-[-5px] focus:outline-none focus:border-blue-500 w-24 text-center"
          />
        </div>
      )}
      {type !== 'Unit Price' && (
        <div className="flex flex-col">
          <input
            type={inputType}
            id={htmlForValue}
            name={htmlForValue}
            // onChange={(e) => onChange(e)}
            onChange={onChange}
            value={value}
            disabled={disabled}
            required
            className="border px-2 text-[14px] rounded py-[0.2rem] lg:py-[0.3rem] focus:outline-brand-blue mb-2"
          />
        </div>
      )}
    </div>
  )
}
