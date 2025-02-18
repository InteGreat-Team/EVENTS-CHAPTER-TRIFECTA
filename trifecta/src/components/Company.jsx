import tenantLogo from "../assets/jabi.png";
import { useUserContext } from "../hooks/useUserContext.jsx";
import { useState, useEffect, useContext } from "react";
import { useTenantContext} from '../hooks/useTenantContext.jsx';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Select from 'react-select';

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

export default function Company() {
  const { tenantInfo, updateTenantFields } = useTenantContext();

  const { companyName, companyIndustry, companyAddress,
          tenantFirstName, tenantLastName, companyEmail, userPassword, companyDesc, 
           companyLogoImgFile, serviceProcurement, serviceInventory, serviceLogistics,
           primaryColor, setCompanyLogoImgFile, updateLogo, setCompanyDesc, setCompanyName, 
           setCompanyIndustry, setCompanyAddress, setTenantFirstName, setTenantLastName, setcompanyEmail
  } = useTenantContext();

  const [companyDesc1, setCompanyDesc1] = useState(companyDesc);
  const [companyName1, setCompanyName1] = useState(companyName);
  const [companyLogoImgFile1, setCompanyLogoImgFile1] = useState(null);
  const [companyIndustry1, setCompanyIndustry1] = useState(companyIndustry);
  const [companyAddress1, setCompanyAddress1] = useState(companyAddress);
  const [tenantFirstName1, setTenantFirstName1] = useState(tenantFirstName);
  const [tenantLastName1, setTenantLastName1] = useState(tenantLastName);
  const [companyEmail1, setcompanyEmail1] = useState(companyEmail);
  const [userPassword1, setUserPassword1] = useState(userPassword);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  
  useEffect(() => {
        // Call updateUserFields in useEffect to avoid state updates during rendering
        if (tenantInfo) {
        updateTenantFields(tenantInfo);
      }
      console.log("Uploaded File:", companyLogoImgFile1);
      
    }, [tenantInfo]);
  
  useEffect(() => {console.log("lakas", companyLogoImgFile);},[]);

  const handleIndustryChange = (selectedOption) => {
  setSelectedIndustry(selectedOption);
  setCompanyIndustry1(selectedOption.value);
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("companyLogo1", companyLogoImgFile);
    formData.append("companyDesc1", companyDesc1);
    formData.append("companyName1", companyName1);
    formData.append("companyIndustry1", companyIndustry1);
    formData.append("companyAddress1", companyAddress1);
    formData.append("tenantFirstName1", tenantFirstName1);
    formData.append("tenantLastName1", tenantLastName1);
    if (companyLogoImgFile1) {
    const response = await fetch(companyLogoImgFile1);
    const blob = await response.blob();
    formData.append("tenant-image", blob);
  } else{
    formData.append("tenant-image", companyLogoImgFile);
  }

    console.log(formData.get('tenant-image'));
    try {
      const response = await fetch(`http://localhost:5001/edit-company-profile/${companyName}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        console.log("Successfully edited");
        window.location.reload();
        // Optionally, update the state or show a success message
      } else {
        console.error("Error editing company profile:", result.error);
        // Optionally, show an error message
      }
    } catch (error) {
      console.error("Error updating company profile:", error);
      // Optionally, show an error message
    }
  };

  const handleChangeIMG = (e) => {
  e.preventDefault();
  const file = e.target.files[0];
  console.log("Selected file:", file); // Log selected file
  const fileURL = URL.createObjectURL(file);
  console.log("File URL:", fileURL); 
  //setCompanyLogoImgFile(fileURL);
  setCompanyLogoImgFile1(fileURL);
  updateLogo(fileURL);
};
  return (
    <div className="mt-8 lg:ml-0 flex flex-col lg:flex-row">
      <div className="w-full flex flex-col items-center">
        <h1 className="left-0 text-2xl font-bold mt-2" style={{color: primaryColor}}>Company Logo</h1>
        {companyLogoImgFile ? (
            <img
              src={companyLogoImgFile1 ? companyLogoImgFile1 : companyLogoImgFile}
              alt="Company Logo"
              title={companyName + " Logo"}
              className="w-auto h-60 m-2"
              />
        ) : (
            <Skeleton className="mt-4 mb-4" circle={true} height={250} width={250} />
        )}
        <label htmlFor="fileUpload" className="cursor-pointer bg-white text-white px-4 py-2 my-2 rounded-2xl font-semibold" 
            style={{ 
                      color: primaryColor, 
                      borderColor: primaryColor, 
                      transition: "background-color 0.3s", 
                      border: `2px solid ${primaryColor}` 
                  }}
                  onMouseEnter={(e) => {
                      e.target.style.backgroundColor = primaryColor;
                      e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "";
                      e.target.style.color = primaryColor;
                  }}>
              Upload Image
          </label>
          <input id="fileUpload" type="file" accept="image/*" className="hidden" onChange={handleChangeIMG} />

        <p className="left-0 text-2xl font-bold mt-4" style={{color: primaryColor}}>
              Company Description
        </p>
        <div className="flex flex-col items-center">
          <textarea
            value={companyDesc1}
            onChange={(e) => setCompanyDesc1(e.target.value)}
            placeholder={companyDesc}
            className="pl-2 mb-4 border m-2 mx-2 md:w-[500px] w-auto justify-around"
            name="companyDesc"
            rows="10"
            cols="40"
          />
        </div>
      </div>

      {/* Company Info Section */}
      <div className="flex flex-col basis-2/3 h-full w-full lg:border-l">
        {/* Company Info Header */}
        <div className="flex flex-col h-full w-4/5 mt-14 place-self-center">
          <div className="flex flex-row mb-12 gap-4 justify-between">
            <div>
              <p className="flex flex-row items-center justify-center left-0 text-2xl basis-5/6 text-red font-bold" style={{color: primaryColor}}>
                Company Info
              </p>
            </div>
            <div className="flex flex-row items-center justify-center ">
              <button className="p-2 px-3 mr-4 w-auto h-12 flex flex-row rounded-2xl items-center justify-center right-0 basis-1/6 bg-white border-red-dark text-red-dark hover:scale-100 hover:bg-gray font-semibold" 
                style={{ 
                      color: primaryColor, 
                      borderColor: primaryColor, 
                      transition: "background-color 0.3s", 
                      border: `2px solid ${primaryColor}` 
                  }}
                  onMouseEnter={(e) => {
                      e.target.style.backgroundColor = primaryColor;
                      e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "";
                      e.target.style.color = primaryColor;
                  }}>
                Cancel
              </button>
              <button className="px-4 right-0 w-auto h-12 rounded-2xl bg-white text-white hover:scale-100 hover:bg-gray font-semibold"
                style={{ 
                      color: primaryColor, 
                      borderColor: primaryColor, 
                      transition: "background-color 0.3s", 
                      border: `2px solid ${primaryColor}` 
                  }}
                  onMouseEnter={(e) => {
                      e.target.style.backgroundColor = primaryColor;
                      e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "";
                      e.target.style.color = primaryColor;
                  }}
                  onClick={handleSaveChanges}>
                Save
              </button>
            </div>
          </div>

          {/* Company Details Inputs */}
          <div className="flex flex-row">
            <div className="w-1/2">
              <h1 className="font-bold">Company Name</h1>
              <input
                type="text"
                className="mt-2 placeholder:italic placeholder:text-slate-400 block bg-gray h-6 w-4/5 border border-slate-300 rounded-md py-2 pl-2 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 cursor-not-allowed sm:text-sm"
                placeholder={companyName}
                value={companyName1}
                readOnly
                onChange={(e) => setCompanyName1(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <h1 className="font-bold">Company Industry</h1>
              <Select
                className='border rounded'
                value={industries.find(option => option.value === companyIndustry1)}
                onChange={handleIndustryChange}
                options={industries}
                required
                name="companyIndustry"
                placeholder={companyIndustry}
                styles={{
                  control: provided => ({
                    ...provided,
                    fontSize: '12px', // Adjust the font size to make the dropdown smaller
                    minHeight: '10px', // Adjust the height of the control
                    padding: '-8px', // Adjust padding
                  }),
                  menu: provided => ({
                    ...provided,
                    fontSize: '12px', // Adjust the font size of the dropdown menu
                  }),
                  option: provided => ({
                    ...provided,
                    fontSize: '12px', // Adjust the font size of the options in the dropdown
                  }),
                }}
              />
            </div>
          </div>

          {/* Other Company Details */}
          <div className="mt-4 mb-4 pb-4">
            <h1 className="font-bold">Company Address</h1>
            <input
              type="text"
              className="mt-2 placeholder:italic placeholder:text-slate-400 block bg-white h-6 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder={companyAddress}
              required
              value={companyAddress1}
              onChange={(e) => setCompanyAddress1(e.target.value)}
            />
          </div>

          {/* Tenant Info */}
          <h1 className="text-2xl font-bold text-red" style={{color: primaryColor}}>Tenant Info</h1>
          <div className="flex flex-row mt-4">
            <div className="w-1/2">
                <h1 className="font-bold">Tenant First Name</h1>
                   <input type="text" 
                   className="mt-2 placeholder:italic placeholder:text-slate-400 block bg-white h-6 w-4/5 border border-slate-300 rounded-md py-2 pl-2 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                   placeholder={tenantFirstName} 
                   required
                   value={tenantFirstName1}
                   onChange={(e) => setTenantFirstName1(e.target.value)}/>
            </div>
            <div className="w-1/2">
                <h1 className="font-bold">Tenant Last Name</h1>
                    <input type="text" 
                    className="mt-2 placeholder:italic placeholder:text-slate-400 block bg-white h-6 w-4/5 border border-slate-300 rounded-md py-2 pl-2 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                    placeholder={tenantLastName}
                    required 
                    value={tenantLastName1}
                    onChange={(e) => setTenantLastName1(e.target.value)}/>
            </div>
          </div>

          <div className="flex flex-col mt-4 mb-4 pb-4">
            <div className="mb-3">
                <h1 className="font-bold">Email</h1>
                <input 
                    type="text" 
                    className="mt-2 placeholder:italic placeholder:text-slate-400 block bg-gray h-6 w-5/6 border border-slate-300 rounded-md py-2 pl-2 pr-3 focus:outline-none cursor-not-allowed sm:text-sm" 
                    placeholder={companyEmail} 
                    value={companyEmail1}
                    readOnly
                />
            </div>
            <div className="w-full mb-24">
                <h1 className="font-bold">Password</h1>
                    <input type="text" 
                    className="mt-2 placeholder:italic placeholder:text-slate-400 block bg-white h-6 w-auto border border-slate-300 rounded-md py-2 pl-2 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                    placeholder={userPassword} 
                    value={userPassword1}
                    onChange={(e) => setUserPassword1(e.target.value)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
