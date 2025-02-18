
import NavBarMobile from '../components/NavLogistics/NavbarMobile'
import NavBar from '../components/NavLogistics/Navbar'
import Search from '../components/inbound/SearchBar'
import POButton from '../components/inbound/POButton'
/* import ArrowButtons from '../inbound/ArrowButtons'
import PageNumber from '../inbound/PageNumber'
import { useState } from 'react' */
import InboundTbl from '../components/inbound/InboundTbl'

import axios from 'axios'
import { useState } from 'react'


const Inbound = () => {
  const [searchResults, setSearchResults] = useState([])

  const handleSearchChange = async (event) => {
    const query = event.target.value

    try {
      const response = await axios.get(
        `http://localhost:3003/api/search-inbound?query=${query}`
      )
      // console.log(response)
      const searchData = response.data
      setSearchResults(searchData)
    } catch (error) {
      console.error('Error searching items:', error)
    }
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Submit search query when Enter key is pressed
      handleSearchChange(event)
    }
  }
  return (
    <>
    <div className='h-screen flex flex-col md:flex-row'>

     <div className="md:h-screen mb-4 md:mb-0">
          <NavBar />
          <NavBarMobile />
      </div>  

      <div className=' w-full flex flex-col justify-start  md:mx-6 '>
        {/* title */}
        <div className='font-bold text-2xl p-6 text-center'>
          Inbound Logistics
        </div>
        {/* Searchbar, Sort, POButton */}
        <div className='flex justify-center'>
      <div className='flex justify-end mt-10 w-80 gap-4 md:w-full md:justify-center mb-6'>
      <Search
                type="search"
                placeholder="Search..."
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
       {/*  <SearchBar /> */}
        <POButton />
      </div>
      </div> 
      {/* Table */}
        <InboundTbl />
      </div>
      </div>
    </>
  )
}

export default Inbound