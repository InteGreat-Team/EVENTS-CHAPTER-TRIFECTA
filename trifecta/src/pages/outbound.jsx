import NavBarMobile from '../components/NavLogistics/NavbarMobile'
import NavBar from '../components/NavLogistics/Navbar'
import Search from '../components/inbound/search'
import COButton from '../components/outbound/COButton'
import { useState } from 'react'
import SeeMoreModal from "../components/modalsLOG/SeeMoreOutbound"
import OutboundTbl from '../components/outbound/OutboundTbl'



const Outbound = () => {
  const [searchResults, setSearchResults] = useState([])

  const handleSearchChange = async (event) => {
    const query = event.target.value

    try {
      const response = await axios.get(
        `http://localhost:3003/api/search-outbound?query=${query}`
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

      <div className=' w-full flex flex-col justify-start  md:mx-6'>
      {/* title */}
      <div className='font-bold text-2xl p-6 text-center'>
        Outbound Logistics
      </div>
      {/* Searchbar, Sort, COButton */}
       <div className='flex justify-center'>
      <div className='flex justify-end mt-10 w-80 gap-4 md:w-full md:justify-center mb-6'>
      <Search
                type="search"
                placeholder="Search..."
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
        <COButton />
      </div>
      </div> 

      {/* Table */}
      <OutboundTbl />
        

      </div>

     
    </div>
     
    </>
  )
}

export default Outbound