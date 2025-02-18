import { Checkbox } from 'antd';
import trifectaLogo from "../assets/TrifectaLogo.png";
import React, {useState, useEffect, useRef} from 'react';
import Select from 'react-select';

import { IoEyeOff, IoEyeSharp } from 'react-icons/io5';
import { UserAuth } from '../hooks/useAuthContext.jsx';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../server/FirebaseClient.js';
import { useNavigate } from 'react-router-dom';
import { EmailResetSuccessPopup, EmailResetInvalidPopup, InvalidLoginCredentialsPopup } from '../global/Popup.jsx';
import {checkEmailExists} from '../server/API/authAPI.js';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, addDoc, setDoc, doc, query, where, getDocs} from 'firebase/firestore';
import { ErrorPopUpModal, SuccessPopUpModal } from '../global/Popup.jsx';
import { useUserInfoContext } from "../hooks/useUserInfoContext.jsx";
import { useUserContext } from "../hooks/useUserContext.jsx";
import { useTenantContext } from "../hooks/useTenantContext.jsx";

const db = getFirestore();

const industries = [
  {
    label: "Accounting",
    value: "Accounting"
  },
  {
    label: "Airlines/Aviation",
    value: "Airlines/Aviation"
  },
  {
    label: "Alternative Dispute Resolution",
    value: "Alternative Dispute Resolution"
  },
  {
    label: "Alternative Medicine",
    value: "Alternative Medicine"
  },
  {
    label: "Animation",
    value: "Animation"
  },
  {
    label: "Apparel/Fashion",
    value: "Apparel/Fashion"
  },
  {
    label: "Architecture/Planning",
    value: "Architecture/Planning"
  },
  {
    label: "Arts/Crafts",
    value: "Arts/Crafts"
  },
  {
    label: "Automotive",
    value: "Automotive"
  },
  {
    label: "Aviation/Aerospace",
    value: "Aviation/Aerospace"
  },
  {
    label: "Banking/Mortgage",
    value: "Banking/Mortgage"
  },
  {
    label: "Biotechnology/Greentech",
    value: "Biotechnology/Greentech"
  },
  {
    label: "Broadcast Media",
    value: "Broadcast Media"
  },
  {
    label: "Building Materials",
    value: "Building Materials"
  },
  {
    label: "Business Supplies/Equipment",
    value: "Business Supplies/Equipment"
  },
  {
    label: "Capital Markets/Hedge Fund/Private Equity",
    value: "Capital Markets/Hedge Fund/Private Equity"
  },
  {
    label: "Chemicals",
    value: "Chemicals"
  },
  {
    label: "Civic/Social Organization",
    value: "Civic/Social Organization"
  },
  {
    label: "Civil Engineering",
    value: "Civil Engineering"
  },
  {
    label: "Commercial Real Estate",
    value: "Commercial Real Estate"
  },
  {
    label: "Computer Games",
    value: "Computer Games"
  },
  {
    label: "Computer Hardware",
    value: "Computer Hardware"
  },
  {
    label: "Computer Networking",
    value: "Computer Networking"
  },
  {
    label: "Computer Software/Engineering",
    value: "Computer Software/Engineering"
  },
  {
    label: "Computer/Network Security",
    value: "Computer/Network Security"
  },
  {
    label: "Construction",
    value: "Construction"
  },
  {
    label: "Consumer Electronics",
    value: "Consumer Electronics"
  },
  {
    label: "Consumer Goods",
    value: "Consumer Goods"
  },
  {
    label: "Consumer Services",
    value: "Consumer Services"
  },
  {
    label: "Cosmetics",
    value: "Cosmetics"
  },
  {
    label: "Dairy",
    value: "Dairy"
  },
  {
    label: "Defense/Space",
    value: "Defense/Space"
  },
  {
    label: "Design",
    value: "Design"
  },
  {
    label: "E-Learning",
    value: "E-Learning"
  },
  {
    label: "Education Management",
    value: "Education Management"
  },
  {
    label: "Electrical/Electronic Manufacturing",
    value: "Electrical/Electronic Manufacturing"
  },
  {
    label: "Entertainment/Movie Production",
    value: "Entertainment/Movie Production"
  },
  {
    label: "Environmental Services",
    value: "Environmental Services"
  },
  {
    label: "Events Services",
    value: "Events Services"
  },
  {
    label: "Executive Office",
    value: "Executive Office"
  },
  {
    label: "Facilities Services",
    value: "Facilities Services"
  },
  {
    label: "Farming",
    value: "Farming"
  },
  {
    label: "Financial Services",
    value: "Financial Services"
  },
  {
    label: "Fine Art",
    value: "Fine Art"
  },
  {
    label: "Fishery",
    value: "Fishery"
  },
  {
    label: "Food Production",
    value: "Food Production"
  },
  {
    label: "Food/Beverages",
    value: "Food/Beverages"
  },
  {
    label: "Fundraising",
    value: "Fundraising"
  },
  {
    label: "Furniture",
    value: "Furniture"
  },
  {
    label: "Gambling/Casinos",
    value: "Gambling/Casinos"
  },
  {
    label: "Glass/Ceramics/Concrete",
    value: "Glass/Ceramics/Concrete"
  },
  {
    label: "Government Administration",
    value: "Government Administration"
  },
  {
    label: "Government Relations",
    value: "Government Relations"
  },
  {
    label: "Graphic Design/Web Design",
    value: "Graphic Design/Web Design"
  },
  {
    label: "Health/Fitness",
    value: "Health/Fitness"
  },
  {
    label: "Higher Education/Acadamia",
    value: "Higher Education/Acadamia"
  },
  {
    label: "Hospital/Health Care",
    value: "Hospital/Health Care"
  },
  {
    label: "Hospitality",
    value: "Hospitality"
  },
  {
    label: "Human Resources/HR",
    value: "Human Resources/HR"
  },
  {
    label: "Import/Export",
    value: "Import/Export"
  },
  {
    label: "Individual/Family Services",
    value: "Individual/Family Services"
  },
  {
    label: "Industrial Automation",
    value: "Industrial Automation"
  },
  {
    label: "Information Services",
    value: "Information Services"
  },
  {
    label: "Information Technology/IT",
    value: "Information Technology/IT"
  },
  {
    label: "Insurance",
    value: "Insurance"
  },
  {
    label: "International Affairs",
    value: "International Affairs"
  },
  {
    label: "International Trade/Development",
    value: "International Trade/Development"
  },
  {
    label: "Internet",
    value: "Internet"
  },
  {
    label: "Investment Banking/Venture",
    value: "Investment Banking/Venture"
  },
  {
    label: "Investment Management/Hedge Fund/Private Equity",
    value: "Investment Management/Hedge Fund/Private Equity"
  },
  {
    label: "Judiciary",
    value: "Judiciary"
  },
  {
    label: "Law Enforcement",
    value: "Law Enforcement"
  },
  {
    label: "Law Practice/Law Firms",
    value: "Law Practice/Law Firms"
  },
  {
    label: "Legal Services",
    value: "Legal Services"
  },
  {
    label: "Legislative Office",
    value: "Legislative Office"
  },
  {
    label: "Leisure/Travel",
    value: "Leisure/Travel"
  },
  {
    label: "Library",
    value: "Library"
  },
  {
    label: "Logistics/Procurement",
    value: "Logistics/Procurement"
  },
  {
    label: "Luxury Goods/Jewelry",
    value: "Luxury Goods/Jewelry"
  },
  {
    label: "Machinery",
    value: "Machinery"
  },
  {
    label: "Management Consulting",
    value: "Management Consulting"
  },
  {
    label: "Maritime",
    value: "Maritime"
  },
  {
    label: "Market Research",
    value: "Market Research"
  },
  {
    label: "Marketing/Advertising/Sales",
    value: "Marketing/Advertising/Sales"
  },
  {
    label: "Mechanical or Industrial Engineering",
    value: "Mechanical or Industrial Engineering"
  },
  {
    label: "Media Production",
    value: "Media Production"
  },
  {
    label: "Medical Equipment",
    value: "Medical Equipment"
  },
  {
    label: "Medical Practice",
    value: "Medical Practice"
  },
  {
    label: "Mental Health Care",
    value: "Mental Health Care"
  },
  {
    label: "Military Industry",
    value: "Military Industry"
  },
  {
    label: "Mining/Metals",
    value: "Mining/Metals"
  },
  {
    label: "Motion Pictures/Film",
    value: "Motion Pictures/Film"
  },
  {
    label: "Museums/Institutions",
    value: "Museums/Institutions"
  },
  {
    label: "Music",
    value: "Music"
  },
  {
    label: "Nanotechnology",
    value: "Nanotechnology"
  },
  {
    label: "Newspapers/Journalism",
    value: "Newspapers/Journalism"
  },
  {
    label: "Non-Profit/Volunteering",
    value: "Non-Profit/Volunteering"
  },
  {
    label: "Oil/Energy/Solar/Greentech",
    value: "Oil/Energy/Solar/Greentech"
  },
  {
    label: "Online Publishing",
    value: "Online Publishing"
  },
  {
    label: "Other Industry",
    value: "Other Industry"
  },
  {
    label: "Outsourcing/Offshoring",
    value: "Outsourcing/Offshoring"
  },
  {
    label: "Package/Freight Delivery",
    value: "Package/Freight Delivery"
  },
  {
    label: "Packaging/Containers",
    value: "Packaging/Containers"
  },
  {
    label: "Paper/Forest Products",
    value: "Paper/Forest Products"
  },
  {
    label: "Performing Arts",
    value: "Performing Arts"
  },
  {
    label: "Pharmaceuticals",
    value: "Pharmaceuticals"
  },
  {
    label: "Philanthropy",
    value: "Philanthropy"
  },
  {
    label: "Photography",
    value: "Photography"
  },
  {
    label: "Plastics",
    value: "Plastics"
  },
  {
    label: "Political Organization",
    value: "Political Organization"
  },
  {
    label: "Primary/Secondary Education",
    value: "Primary/Secondary Education"
  },
  {
    label: "Printing",
    value: "Printing"
  },
  {
    label: "Professional Training",
    value: "Professional Training"
  },
  {
    label: "Program Development",
    value: "Program Development"
  },
  {
    label: "Public Relations/PR",
    value: "Public Relations/PR"
  },
  {
    label: "Public Safety",
    value: "Public Safety"
  },
  {
    label: "Publishing Industry",
    value: "Publishing Industry"
  },
  {
    label: "Railroad Manufacture",
    value: "Railroad Manufacture"
  },
  {
    label: "Ranching",
    value: "Ranching"
  },
  {
    label: "Real Estate/Mortgage",
    value: "Real Estate/Mortgage"
  },
  {
    label: "Recreational Facilities/Services",
    value: "Recreational Facilities/Services"
  },
  {
    label: "Religious Institutions",
    value: "Religious Institutions"
  },
  {
    label: "Renewables/Environment",
    value: "Renewables/Environment"
  },
  {
    label: "Research Industry",
    value: "Research Industry"
  },
  {
    label: "Restaurants",
    value: "Restaurants"
  },
  {
    label: "Retail Industry",
    value: "Retail Industry"
  },
  {
    label: "Security/Investigations",
    value: "Security/Investigations"
  },
  {
    label: "Semiconductors",
    value: "Semiconductors"
  },
  {
    label: "Shipbuilding",
    value: "Shipbuilding"
  },
  {
    label: "Sporting Goods",
    value: "Sporting Goods"
  },
  {
    label: "Sports",
    value: "Sports"
  },
  {
    label: "Staffing/Recruiting",
    value: "Staffing/Recruiting"
  },
  {
    label: "Supermarkets",
    value: "Supermarkets"
  },
  {
    label: "Telecommunications",
    value: "Telecommunications"
  },
  {
    label: "Textiles",
    value: "Textiles"
  },
  {
    label: "Think Tanks",
    value: "Think Tanks"
  },
  {
    label: "Tobacco",
    value: "Tobacco"
  },
  {
    label: "Translation/Localization",
    value: "Translation/Localization"
  },
  {
    label: "Transportation",
    value: "Transportation"
  },
  {
    label: "Utilities",
    value: "Utilities"
  },
  {
    label: "Venture Capital/VC",
    value: "Venture Capital/VC"
  },
  {
    label: "Veterinary",
    value: "Veterinary"
  },
  {
    label: "Warehousing",
    value: "Warehousing"
  },
  {
    label: "Wholesale",
    value: "Wholesale"
  },
  {
    label: "Wine/Spirits",
    value: "Wine/Spirits"
  },
  {
    label: "Wireless",
    value: "Wireless"
  },
  {
    label: "Writing/Editing",
    value: "Writing/Editing"
  }
];

export function TenantLogin() {

  const { userInfo } = useUserInfoContext();
  const { tenantInfo } = useTenantContext();

  const { logIn, resetPassword } = UserAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isForgotPasswordClicked, SetIsForgotPasswordClicked] = useState(false);
  const [isResetSuccessful, setIsResetSuccessful] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [login, setLogin] = useState(false);
  /* const [state, setState] = React.useState({
    email: "",
    password: ""
  }); */

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
  const [checkedItems, setCheckedItems] = useState({
    procurement: false,
    inventory: false,
    logistics: false,
  });

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: checked,
    }));
    console.log(checkedItems);
    console.log("At least one selected services: ", Object.values(checkedItems).some((item) => item));
  };

  const [isAtLeastOneSelected, setIsAtLeastOneSelected] = useState(false);

  useEffect(() => {
    const hasAtLeastOneSelected = Object.values(checkedItems).some((item) => item);
    setIsAtLeastOneSelected(hasAtLeastOneSelected);
    console.log("At least 1 selected: ", hasAtLeastOneSelected);
  }, [checkedItems]);

  const [isSubmitting, setIsSubmitting] = useState(false);
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
  
// Log in
  const toggleLogin = () => {
    setLogin(!login);
    SetIsForgotPasswordClicked(false);
  };

  useEffect(() => {
    if (!isForgotPasswordClicked) {
      setState(prevState => ({ ...prevState, email: '', password: '' }));
    }
  },[isForgotPasswordClicked]);

  useEffect(() => {
    if (isInvalid && error) {
      const timer = setTimeout(
        () => setIsInvalid(!isInvalid),
        5000,
      );

      return () => clearTimeout(timer);
    }

    if (!isResetSuccessful || isResetSuccessful) {
      const timer2 = setTimeout(
        () => setIsResetSuccessful(null),
        5000,
      );

      return () => clearTimeout(timer2);
    }
  }, [isInvalid, error, isResetSuccessful]);

  const toggleForgotPassword = (event) => {
    event.preventDefault();
    SetIsForgotPasswordClicked(!isForgotPasswordClicked);
    console.log("toggleForgotPassword: " + toggleForgotPassword);
  };

  const handleChange = evt => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value
    });
  };

  const togglePasswordVisibility = () => {
    
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleOnSubmit = async (evt) => {
    setError('');
    evt.preventDefault();

    const { email, password } = state;
    try {
      // Use Firebase authentication method to sign in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Access the user object
      const user = userCredential.user;

      await logIn(email, password);

      for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
      // Log success message or perform any additional actions
      console.log('Login successful:', user);
      if((userInfo.role) === "Super Admin"){
          navigate('/dashboard');
      }else if((userInfo.role) === "Procurement Manager"){
          navigate('/ProcurementDashboard');
      }else if((userInfo.role) === "Inventory Manager"){
          navigate('/inventory-product-catalogue');
      }else if((userInfo.role) === "Logistics Manager"){
          navigate('/logistics-dashboard');
      }

    } catch (error) {
        setError(error.message);
        setIsInvalid(true);
        if (error.response) {
          console.error('Error during signin:', error.response.data.message);
        } else {
          console.error('Error during signin:', error.message);
        }
      }
  };

  const handleResetPassword = async (evt) => {
    evt.preventDefault();
    setError('');
    setIsInvalid(false);
    setIsResetSuccessful(null);
    try {
      await resetPassword(state.email);
      const { exists } = await checkEmailExists(state.email);
      console.log(exists);
      if (!exists) {
        throw new Error('Email does not exist');
      }
      setIsResetSuccessful(true);
      console.log('Password reset successful');
        for (const key in state) {
        setState({
          ...state,
          [key]: ""
        });
      }
    } catch (error) {
        setError(error.message);
        console.log('wrong');
        setIsResetSuccessful(false);
      }
  };

// Sign up
  const toggleErrorPopup = () => {
    setShowErrorPopup(!showErrorPopup);
  };
  const toggleSuccessPopup = () => {
    setShowSuccessPopup(!showSuccessPopup);
  };

  const handleSignUpChange = (evtOrSelectedOption, actionMeta) => {
    if (actionMeta?.action) {
    // This is the react-select event
    const { value } = evtOrSelectedOption;
    setState({
      ...state,
      companyIndustry: value,
    });
    setCompanyIndustryValid(/^[A-Za-z\s]+$/.test(value));
  } else {
    // This is a standard HTML input event
    const { name, value } = evtOrSelectedOption.target;
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
}
  
  const checkCompanyExists = async (companyName) => {
  try {
    // Create a query to search for documents where the companyName field matches the desired value
    const q = query(collection(db, 'tenants'), where('companyName', '==', companyName));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Check if any documents are returned
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking if company exists:', error);
    // Handle error appropriately
    throw error;
  }
};

const handleOnSubmitSignUp = async (evt) => {
    evt.preventDefault();

    const { firstName, lastName, email, password, companyName, companyAddress, companyIndustry, selectedServices } = state;
    setCompanyNameValid(/^[A-Za-z0-9\s]+$/.test(companyName));
    setCompanyAddressValid(/^[A-Za-z\s\d]+$/g.test(companyAddress));
    setCompanyIndustryValid(/^[A-Za-z\s]+$/.test(companyIndustry));
    setFirstNameValid(/^[A-Za-z\s]+$/.test(firstName));
    setLastNameValid(/^[A-Za-z\s]+$/.test(lastName));
    setEmailValid(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));
    setPasswordValid(password.length >= 8);

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
      } else if (!isAtLeastOneSelected) {
        setShowErrorPopup(true);
        setSubmitForm(false);
        setPopUpTitle('No Services Selected');
        setPopUpMessage('Please select at least one service.');
      } else {
        if (isSubmitting) {
          return; // Prevent further submissions while lock is active
        }

        setIsSubmitting(true); // Activate the lock

        setSubmitForm(true);

        // Set a timeout to reset the lock after a few seconds (e.g., 5 seconds)
        setTimeout(() => {
          setIsSubmitting(false);
        }, 5000);
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
          service_procurement: checkedItems.procurement,
          service_inventory: checkedItems.inventory,
          service_logistics: checkedItems.logistics,
          themePreference: "#5c39e0",
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
    <div className="flex md:flex-row flex-col min-h-screen w-full bg-gray-100 dark:bg-gray-950">
      <div className="flex-1 bg-gray-100 dark:bg-gray-950 flex items-center justify-center">
        <div className="flex mt-[70px] md:mt-0 items-center space-x-4 animate-pulse">
          <img src={trifectaLogo} className='w-20'></img>
          <div className="text-5xl font-bold text-gray-900 dark:text-gray-50">TRIFECTA</div>
        </div>
      </div>
    {!login ? (
      <div className="flex-1 space-y-8 justify-center items-center px-4 md:mt-5 pb-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center md:justify-start">
          <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Create an Account</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign up to get started
            </p>
          </div>
        </div>
        <form className="space-y-3" onSubmit={handleOnSubmitSignUp}>
          {showErrorPopup && (<ErrorPopUpModal onClose={toggleErrorPopup}>
            <h2 className="text-lg text-black font-bold mb-4 flex justify-center items-center">{PopUpTitle}</h2>
            <p className='text-black flex justify-center items-center'>{PopUpMessage}</p>
           </ErrorPopUpModal>)}
          {showSuccessPopup && (<SuccessPopUpModal onClose={toggleSuccessPopup}>
              <h2 className="text-lg text-black font-bold mb-4 flex justify-center items-center">{PopUpTitle}</h2>
              <p className='text-black flex justify-center items-center'>{PopUpMessage}</p>
          </SuccessPopUpModal>)}
          <div>
            <label className="sr-only" htmlFor="company-name">
              Company Name
            </label>
            <input
              className={`relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400 ${companyNameValid ? 'border' : 'border-red-dark'}`}
              name="companyName"
              placeholder="Company Name"
              required
              autoComplete="off"
              type="text"
              value={state.companyName}
              onChange={handleSignUpChange}
              ref={companyNameInputRef}
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="company-address">
              Company Address
            </label>
            <input
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400"
              name="companyAddress"
              placeholder="Company Address"
              required
              autoComplete="off"
              type="text"
              onChange={handleSignUpChange}
              value={state.companyAddress}
              ref={companyAddressInputRef}
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="company-industry">
              Company Industry
            </label>
            <Select
              className='border rounded'
              value={industries.find(industry => industry.value === state.companyIndustry)}
              onChange={(selectedOption) => handleSignUpChange(selectedOption, { action: 'select-option' })}
              options={industries}
              required
              name="companyIndustry"
              placeholder="Select Industry"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="sr-only" htmlFor="first-name">
                First Name
              </label>
              <input
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400"
                name="firstName"
                value={state.firstName}
                placeholder="First Name"
                autoComplete="off"
                required
                type="text"
                onChange={handleSignUpChange}
                ref={firstNameInputRef}
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="last-name">
                Last Name
              </label>
              <input
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400"
                name="lastName"
                value={state.lastName}
                placeholder="Last Name"
                autoComplete="off"
                required
                type="text"
                onChange={handleSignUpChange}
                ref={lastNameInputRef}
              />
            </div>
          </div>
          <div>
            <label className="sr-only" htmlFor="company-email">
              Company Email
            </label>
            <input
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400"
              name="email"
              value={state.email}
              placeholder="Company Email"
              autoComplete="off"
              required
              type="email"
              onChange={handleSignUpChange}
              ref={emailInputRef}
            />
          </div>
          <div className="relative">
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              autoComplete="password"
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400"
              name="password"
              placeholder="Password"
              required
              type={showPassword ? 'text' : 'password'}
              value={state.password}
              onChange={handleSignUpChange}
            />
            <button className="absolute bottom-1 right-1 h-7 w-7 z-50 pb-2" size="icon" variant="ghost" type="button" 
              onClick={togglePasswordVisibility}>
              {showPassword ? <IoEyeOff title="Hide" size={20} color="#666" /> : <IoEyeSharp title="Show" size={20} color="#666" />}
              <span className="sr-only">Toggle password visibility</span>
            </button>
          </div>
          <p className="text-base flex justify-center md:justify-start font-semibold text-gray-900 dark:text-gray-50">Preferred Services</p>
          <div className="flex justify-around items-center">
            <div className="flex items-center gap-1 justify-center">
              <Checkbox id="procurement" name="preferred-services" checked={checkedItems.procurement} onChange={handleCheckboxChange}/>
              <label htmlFor="procurement">Procurement</label>
            </div>
            <div className="flex items-center gap-1 justify-center">
              <Checkbox id="inventory" name="preferred-services" checked={checkedItems.inventory} onChange={handleCheckboxChange}/>
              <label htmlFor="inventory">Inventory</label>
            </div>
            <div className="flex items-center gap-1 justify-center">
              <Checkbox id="logistics" name="preferred-services " checked={checkedItems.logistics} onChange={handleCheckboxChange}/>
              <label htmlFor="logistics">Logistics</label>
            </div>
          </div>
          <div className='flex items-center justify-center pt-2'>
            <button 
              className={`rounded-xl mb-3 p-2 px-6 w-full ${
                isAtLeastOneSelected
                  ? 'bg-black text-white hover:bg-[#2e2e30] cursor-pointer'
                  : 'bg-gray text-gray-500 cursor-not-allowed opacity-60'
              }`}
              type="submit" 
              disabled={!isAtLeastOneSelected}>
              Sign up
            </button>
          </div>
          <div className="text-center text-sm pb-3 text-gray-500 dark:text-gray-400">
            Already have an account?    
            <button className="font-medium ml-1 hover:text-[#7f55ff] hover:underline" onClick={toggleLogin}>
              Log in
            </button>
          </div>
        </form>
      </div>
    ) : (
      <div className="flex-1 md:pt-[140px] space-y-8 justify-center items-center px-4 md:mt-5 pb-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center md:justify-start">
          
          {!isForgotPasswordClicked ?
          <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Log in to your account
            </p>
          </div> :
          <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Reset Password</h2>
          </div>
          }
        </div>
        <form className="space-y-3" onSubmit={isForgotPasswordClicked ? handleResetPassword : handleOnSubmit}>
          {isInvalid && !isForgotPasswordClicked && (
          <InvalidLoginCredentialsPopup className="justify-start"/>
          )}
          {isResetSuccessful === true && (
            <EmailResetSuccessPopup className="flex-start" />
          )}
          {isResetSuccessful === false && (
            <EmailResetInvalidPopup className="flex-start" />
          )}
          <div>
            <label className="sr-only">
              Company Email
            </label>
            <input
              autoComplete="email"
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400"
              name="email"
              placeholder="Email"
              required
              type="email"
              value={state.email === null && isForgotPasswordClicked ? '' : state.email}
              onChange={handleChange}
            />
          </div>
          {!isForgotPasswordClicked && (
          <div className="relative">
            <label className="sr-only">
              Password
            </label>
            <input
              autoComplete="password"
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400"
              name="password"
              placeholder="Password"
              required
              type={showPassword ? 'text' : 'password'}
              value={state.password}
              onChange={handleChange}
            />
            <button className="absolute bottom-1 right-1 h-7 w-7 z-50 pb-2" size="icon" variant="ghost" type="button" 
              onClick={togglePasswordVisibility}>
              {showPassword ? <IoEyeOff title="Hide" size={20} color="#666" /> : <IoEyeSharp title="Show" size={20} color="#666" />}
              <span className="sr-only">Toggle password visibility</span>
            </button>
          </div>
          )}

          {!isForgotPasswordClicked ?
          <div className='flex items-center justify-center pt-2'>
            <button className="rounded-xl mb-3 p-2 px-6 text-white bg-black hover:bg-[#2e2e30] w-full" type="submit">
              Log in
            </button>
          </div> :
          <div className='flex items-center justify-center pt-2'>
            <button className="rounded-xl mb-3 p-2 px-6 text-white bg-black hover:bg-[#2e2e30] w-full" type="submit">
              Reset
            </button>
          </div>
          }

          {!isForgotPasswordClicked ?
          <div className="text-center text-base text-gray-500 dark:text-gray-400">
            <button className="font-medium ml-1 hover:text-[#7f55ff] hover:underline" onClick={toggleForgotPassword}>
                Forgot Password?
            </button>
          </div> :
          <div className="text-center text-base text-gray-500 dark:text-gray-400">
            <button className="font-medium ml-1 hover:text-[#7f55ff] hover:underline" onClick={toggleForgotPassword}>
                Back to Log in
            </button>
          </div> 
          }

          <div className="text-center text-sm pb-3 text-gray-500 dark:text-gray-400">
            Don't have an account?    
            <button className="font-medium ml-1 hover:text-[#7f55ff] hover:underline" onClick={toggleLogin}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    )}
    </div>
  )
}