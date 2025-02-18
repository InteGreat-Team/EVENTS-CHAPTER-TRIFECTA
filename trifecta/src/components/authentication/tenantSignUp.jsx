import React, { useState, useEffect, useRef } from 'react';
import { IoEyeOff, IoEyeSharp } from 'react-icons/io5';
//import axios from 'axios'; //pgadmin
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, addDoc, setDoc, doc, query, where, getDocs} from 'firebase/firestore';
import { auth } from '../../server/FirebaseClient.js';
import "./tenantStyles.css";
import { ErrorPopUpModal, SuccessPopUpModal } from '../../global/Popup.jsx';

const db = getFirestore();

function SignUpForm() {
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyName: "",
    companyAddress: "",
    companyIndustry: "",
    selectedServices: [],
  });

  const [showPassword, setShowPassword] = useState(false);
  const [companyNameValid, setCompanyNameValid] = useState(true);
  const [companyAddressValid, setCompanyAddressValid] = useState(true);
  const [companyIndustryValid, setCompanyIndustryValid] = useState(true);
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [emailUsed, setEmailUsed] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [servicesValid, setServicesValid] = useState(true);
  const [submitForm, setSubmitForm] = useState(true);
  const [submitFormSuccess, setSubmitFormSuccess] = useState(false);

  const servicesOptions = [
    { value: "procurement", label: "Procurement" },
    { value: "inventory", label: "Inventory" },
    { value: "logistics", label: "Logistics" },
  ];
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [PopUpTitle, setPopUpTitle] = useState('');
  const [PopUpMessage, setPopUpMessage] = useState('');
  
  const companyNameInputRef = useRef(null);
  const companyAddressInputRef = useRef(null);
  const companyIndustryInputRef = useRef(null);
  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  
  useEffect(() => {
    if (showErrorPopup) {
      const timer = setTimeout(
        () => setShowErrorPopup(!showErrorPopup),
        2000,
      );

      return () => clearTimeout(timer);
    }
  }, [showErrorPopup]);


  const toggleErrorPopup = () => {
    setShowErrorPopup(!showErrorPopup);
  };
  const toggleSuccessPopup = () => {
    setShowSuccessPopup(!showSuccessPopup);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
    switch (name) {
      case 'companyName':
        setCompanyNameValid(/^[A-Za-z0-9\s]+$/.test(value)); // Regular expression to match only letters and spaces
        break;
      case 'companyAddress':
        setCompanyAddressValid(/^[A-Za-z\s\d]+$/g.test(value));
        break;
      case 'companyIndustry':
        setCompanyIndustryValid(/^[A-Za-z\s]+$/.test(value));
        break;
      case 'firstName':
        setFirstNameValid(/^[A-Za-z\s]+$/.test(value));
        break;
      case 'lastName':
        setLastNameValid(/^[A-Za-z\s]+$/.test(value));
        break;
      case 'email':
        setEmailValid(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value));
        setEmailUsed(false);
        break;
      case 'password':
        setPasswordValid(value.length >= 8);
        break;
      /* case 'selectedServices':
        setServicesValid(value.length > 0);
        break; */
      default:
        break;
    }
  };

  const buttonRef = useRef(null);

  const handleButtonClick = () => {
    // Programmatically trigger a click event on the button
    buttonRef.current.click();
  };

  const handleServicesChange = (serviceValue) => {
  const { selectedServices } = state;
  const updatedServices = selectedServices.includes(serviceValue)
    ? selectedServices.filter((service) => service !== serviceValue)
    : [...selectedServices, serviceValue];
  setState((prevState) => ({
    ...prevState,
    selectedServices: updatedServices,
  }));
};
  
  const checkCompanyExists = async (companyName) => {
  try {
    // Create a query to search for documents where the companyName field matches the desired value
    const q = query(collection(db, 'tenants'), where('companyName', '==', companyName));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Check if any documents are returned
    if (!querySnapshot.empty) {
      // Document with the companyName already exists
      return true;
    } else {
      // Document with the companyName does not exist
      return false;
    }
  } catch (error) {
    console.error('Error checking if company exists:', error);
    // Handle error appropriately
    throw error;
  }
};


  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { firstName, lastName, email, password, companyName, companyAddress, companyIndustry, selectedServices } = state;
    setCompanyNameValid(/^[A-Za-z0-9\s]+$/.test(companyName));
    setCompanyAddressValid(/^[A-Za-z\s\d]+$/g.test(companyAddress));
    setCompanyIndustryValid(/^[A-Za-z\s]+$/.test(companyIndustry));
    setFirstNameValid(/^[A-Za-z\s]+$/.test(firstName));
    setLastNameValid(/^[A-Za-z\s]+$/.test(lastName));
    setEmailValid(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));
    setPasswordValid(password.length >= 8);
    setServicesValid(selectedServices.length>0);

    if (!companyNameValid) {
  setShowErrorPopup(true);
  setSubmitForm(false);
  setPopUpTitle('Invalid Company Name');
  setPopUpMessage('Please enter a valid company name.');
  if (companyNameInputRef.current) {
    companyNameInputRef.current.focus();
  }
} else {
  checkCompanyExists(companyName)
    .then((exists) => {
      if (exists) {
        setShowErrorPopup(true);
        setSubmitForm(false);
        setPopUpTitle('Company Name Unavailable');
        setPopUpMessage('Company Name is already in use. Please enter another company name.');
        if (companyNameInputRef.current) {
          companyNameInputRef.current.focus();
        }
      } else if (!companyAddressValid) {
        setShowErrorPopup(true);
        setSubmitForm(false);
        setPopUpTitle('Invalid Company Address');
        setPopUpMessage('Please enter a valid company address.');
        if (companyAddressInputRef.current) {
          companyAddressInputRef.current.focus();
        }
      } else if (!companyIndustryValid) {
        setShowErrorPopup(true);
        setSubmitForm(false);
        setPopUpTitle('Invalid Company Industry');
        setPopUpMessage('Please enter a valid company industry.');
        if (companyIndustryInputRef.current) {
          companyIndustryInputRef.current.focus();
        }
      } else if (!firstNameValid) {
        setShowErrorPopup(true);
        setSubmitForm(false);
        setPopUpTitle('Invalid First Name');
        setPopUpMessage('Please enter a valid first name.');
        if (firstNameInputRef.current) {
          firstNameInputRef.current.focus();
        }
      } else if (!lastNameValid) {
        setShowErrorPopup(true);
        setSubmitForm(false);
        setPopUpTitle('Invalid Last Name');
        setPopUpMessage('Please enter a valid last name.');
        if (lastNameInputRef.current) {
          lastNameInputRef.current.focus();
        }
      } else if (!emailValid) {
        setShowErrorPopup(true);
        setSubmitForm(false);
        setPopUpTitle('Invalid Email');
        setPopUpMessage('Please enter a valid email.');
        if (emailInputRef.current) {
          emailInputRef.current.focus();
        }
      } else if (email!="" && emailUsed) {
        setShowErrorPopup(true);
        setSubmitForm(false);
        setPopUpTitle('Email Already In Use');
        setPopUpMessage('Please enter another valid email.');
        if (emailInputRef.current) {
          emailInputRef.current.focus();
        }
      } else if (!passwordValid) {
        setShowErrorPopup(true);
        setSubmitForm(false);
        setPopUpTitle('Invalid Password');
        setPopUpMessage('Please make sure your password has a minimum length of 8 characters.');
        if (passwordInputRef.current) {
          passwordInputRef.current.focus();
        }
      } else if (!servicesValid) {
        setShowErrorPopup(true);
        setSubmitForm(false);
        setPopUpTitle('No Services Selected');
        setPopUpMessage('Please select at least one service.');
      } else {
        setSubmitForm(true);
      }
    })
  .catch((error) => {
    console.error('Error checking company existence:', error);
    // Handle error appropriately
    });
  }
    try {
      if(submitForm){
        // Create a new user with email and password using Firebase method
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: companyName });
        // Access the newly created user object
        const user = userCredential.user;

        console.log('User signed up successfully:', user);

        // Store additional user information in Firestore
        const userDocRef = await setDoc(doc(db, 'tenants', companyName), {
          uid: user.uid,
          companyEmail: email,
          firstName,
          lastName,
          role: "Super Admin", //super admin by default
          companyName,
          companyAddress,
          companyIndustry,
          service_procurement: selectedServices.includes('procurement'),
          service_inventory: selectedServices.includes('inventory'),
          service_logistics: selectedServices.includes('logistics'),
          theme_preference: "default",
        });

        console.log('User data stored in Firestore with ID:', companyName);
        
        /* //Create Users collection inside tenant
        const tenantDoc = db.collection('tenants').doc(companyName);
        const userCollection = tenantDoc.collection('users'); */

        // Clear the form after successful signup
        for (const key in state) {
          setState((prevState) => ({
            ...prevState,
            [key]: "",
          }));
        }
        
        setSubmitFormSuccess(true);
        setShowSuccessPopup(true);
        setPopUpTitle('Registration Successful!');
        setPopUpMessage('You may now log in to your account.');
      } else {
        //console.log("Error: Form not submitted");
      }
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          setEmailUsed(true);
          console.log('Email is already in use');
        } else {
          console.error('Error creating user:', error.message);
        }
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form className="bg-white flex items-center justify-center flex-col px-10 h-full text-center" onSubmit={handleOnSubmit}>
        <h2 className="font-bold m-0">Register Your Company</h2>
        {showErrorPopup && (<ErrorPopUpModal onClose={toggleErrorPopup}>
            <h2 className="text-lg text-black font-bold mb-4">{PopUpTitle}</h2>
            <p className='text-black'>{PopUpMessage}</p>
           </ErrorPopUpModal>)}
        {showSuccessPopup && (<SuccessPopUpModal onClose={toggleSuccessPopup}>
            <h2 className="text-lg text-black font-bold mb-4">{PopUpTitle}</h2>
            <p className='text-black'>{PopUpMessage}</p>
        </SuccessPopUpModal>)}
        <input
          className={`p-3 my-1 w-full border-[2px] ${companyNameValid ? 'border-none' : 'border-red-dark'}`}
          type="text"
          name="companyName"
          value={state.companyName}
          onChange={handleChange}
          placeholder="Company Name*"
          ref={companyNameInputRef}
        />
        <input
          className={`p-3 my-1 w-full border-[2px] ${companyAddressValid ? 'border-none' : 'border-red-dark'}`}
          type="text"
          name="companyAddress"
          value={state.companyAddress}
          onChange={handleChange}
          placeholder="Company Address*"
          ref={companyAddressInputRef}
        />
        <input
          className={`p-3 my-1 w-full border-[2px] ${companyIndustryValid ? 'border-none' : 'border-red-dark'}`}
          type="text"
          name="companyIndustry"
          value={state.companyIndustry}
          onChange={handleChange}
          placeholder="Company Industry*"
          ref={companyIndustryInputRef}
        />
        <input
          className={`p-3 my-1 w-full border-[2px] ${firstNameValid ? 'border-none' : 'border-red-dark'}`}
          type="text"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
          placeholder="First Name*"
          ref={firstNameInputRef}
        />
        <input
          className={`p-3 my-1 w-full border-[2px] ${lastNameValid ? 'border-none' : 'border-red-dark'}`}
          type="text"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
          placeholder="Last Name*"
          ref={lastNameInputRef}
        />
        <input
          className={`p-3 my-1 w-full border-[2px] ${emailValid ? 'border-none' : 'border-red-dark'}`}
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email*"
          autoComplete="off"
          ref={emailInputRef}
        />
       <div style={{ display: 'flex', position: 'relative', width: '100%' }}>
          <input
            className={`p-3 my-1 w-full border-[2px] ${passwordValid ? 'border-none' : 'border-red-dark'}`}
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password*"
            autoComplete="off"
            ref={passwordInputRef}
            style={{
              flex: 1, // Set flex property to 1 to take up remaining space
              padding: '12px 15px',
              margin: '8px 0',
            }}
          />
          <button 
          
            type="button" 
            onClick={togglePasswordVisibility} 
            className="password-toggle"
          >
          {showPassword ? <IoEyeOff size={20} color="#666" /> : <IoEyeSharp size={20} color="#666" />}
          </button>
        </div>

        <h4>Choose your preferred services</h4>
        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '0.5rem'}}>
        {servicesOptions.map((service) => (
          <div key={service.value} className="checkbox-wrapper">
            <input
              id={`terms-checkbox-${service.value}`}
              type="checkbox"
              name="selectedServices"
              value={service.value}
              checked={state.selectedServices.includes(service.value)}
              onChange={() => handleServicesChange(service.value)}
            />
            <label htmlFor={`terms-checkbox-${service.value}`} className="terms-label">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 200 200" className={`checkbox-svg ${servicesValid? '' : 'border-2 border-red-dark'} `}>
                <mask fill="white" id="path-1-inside-1_476_5-37">
                  <rect height="200" width="200"></rect>
                </mask>
                <rect mask="url(#path-1-inside-1_476_5-37)" strokeWidth="40" className="checkbox-box" height="200" width="200"></rect>
                <path strokeWidth="15" d="M52 111.018L76.9867 136L149 64" className="checkbox-tick"></path>
              </svg>
              <span className="label-text">{service.label}</span>
            </label>
          </div>
        ))}
      </div>
        <button ref={buttonRef} type="submit" className="bg-purple text-white text-xs font-bold py-3 px-12 uppercase" onClick={handleButtonClick}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;