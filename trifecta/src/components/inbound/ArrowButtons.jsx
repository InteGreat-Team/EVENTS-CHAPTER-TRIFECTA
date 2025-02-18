
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";

const ArrowButtons = () => {
  return (
    <div className='flex gap-3'>
        <div className=' bg-gray-200 flex justify-center items-center text-xl px-2 rounded-md p-1'>
        <PiArrowLeft />
        </div>

        <div className=' bg-gray-200 flex justify-center items-center text-xl px-2 rounded-md p-1'>
            <PiArrowRight />
        </div>
    </div>
  )
}

export default ArrowButtons