import {
  FaRegCircleXmark,
  FaRegCircleCheck,
} from 'react-icons/fa6';

export function EmailResetSuccessPopup() {
  return (
    <div className="bg-green rounded-[10px] mb-4 flex flex-row items-center justify-center gap-3 px-4 py-3 text-center text-white">
      <FaRegCircleCheck className=" h-auto w-14 md:ml-[1rem] lg:ml-0" />
      <p className="ml-0 text-[12px] md:text-[14px] lg:ml-0">
        Password reset link has been sent to your email. Please check your email for further instructions.
      </p>
    </div>
  );
}

export function EmailResetInvalidPopup() {
  return (
    <div className="bg-red-dark rounded-[10px] my-4 flex flex-row items-center justify-center gap-3 px-4 py-3 text-center text-white">
      <FaRegCircleXmark className=" h-auto w-12 md:ml-[1rem] lg:ml-0" />
      <p className=" ml-0 text-[12px] md:text-[14px] lg:ml-0">
        Error! The email you entered is invalid. Please try again.
      </p>
    </div>
  );
}

export function InvalidLoginCredentialsPopup() {
  return (
    <div className="bg-red-dark rounded-[10px] my-4 flex w-full flex-row items-center justify-center gap-6 px-4 py-2 text-center text-white">
      <FaRegCircleXmark className=" h-auto w-8" />
      <p className=" ml-[-0.5rem] text-[14px] md:text-[16px]">
        Incorrect username or/and password. Please Try again.
      </p>
    </div>
  );
}

export function ErrorPopUpModal({ onClose, children }){
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
        <FaRegCircleXmark className='h-auto w-16 pb-4 text-red flex items-center justify-center mx-auto' />
        <div className="absolute top-0 right-0">
          <button
            onClick={onClose}
            className="p-2 m-4 text-black hover:text-gray-600 border-none"
          >
            &#x2715; {/* Unicode character for close symbol */}
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function SuccessPopUpModal({ onClose, children }){
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
        <FaRegCircleCheck className='h-auto w-16 pb-4 text-green flex items-center justify-center mx-auto' />
        <div className="absolute top-0 right-0">
          <button
            onClick={onClose}
            className="p-2 m-4 text-black hover:text-gray-600 border-none"
          >
            &#x2715; {/* Unicode character for close symbol */}
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}