import React, { useState } from "react";

const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email is not valid';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const newUser = {
        column1: formData.name,
        column2: formData.role,
        column3: formData.department,
        column4: formData.email,
      };
      onAddUser(newUser);
      onClose();
      console.log(newUser);
    }
  };

  return (
    <>
      
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div
              className="relative bg-white rounded-lg max-w-2xl w-full p-6 left-0"
              style={{ backgroundColor: "#ECECEC" }}
            >
              <div className="flex justify-between mb-4">
                <p className="text-lg font-bold text-gray-700">Add User</p>
                <div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-300 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200"
                  >
                    Add User
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="text-left mx-0">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="p-2 border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="flex justify-between mb-4">
                  <div className="w-1/2 pr-2">
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleChange}
                      className="p-2 border-gray-300 rounded-md w-full"
                    >
                      <option value=""></option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="employee">Employee</option>
                    </select>
                  </div>
                  <div className="w-1/2 pl-2">
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Department
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      required
                      value={formData.department}
                      onChange={handleChange}
                      className="p-2 border-gray-300 rounded-md w-full"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="p-2 border-gray-300 rounded-md w-full"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUserModal;
