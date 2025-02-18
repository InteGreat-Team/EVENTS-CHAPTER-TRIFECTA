export default function RoleAppearance(onColorSelect) {
  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Role Name
        </label>
        <input
          type="text"
          value="Manager"
          readOnly
          className="w-full px-4 py-2 border rounded bg-gray-200 text-gray-700"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Role Color
        </label>
        <div className="flex justify-center space-x-2">
          <div className="w-10 h-10 bg-gray-300 border rounded cursor-not-allowed flex items-center justify-center relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.146-10.354a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L10 11.293l3.646-3.647z"
                clipRule="evenodd"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-1 bg-gray-500 rotate-45 transform origin-center"></div>
            </div>
          </div>
          <div className="w-10 h-10 bg-red border rounded cursor-pointer hover:opacity-75"></div>
          <div className="w-10 h-10 bg-purple border rounded cursor-pointer hover:opacity-75"></div>
          <div className="w-10 h-10 bg-green border rounded cursor-pointer hover:opacity-75"></div>
          <div className="w-10 h-10 bg-orange border rounded cursor-pointer hover:opacity-75"></div>
          <div className="w-10 h-10 bg-teal border rounded cursor-pointer hover:opacity-75"></div>
        </div>
      </div>
    </div>
  );
}
