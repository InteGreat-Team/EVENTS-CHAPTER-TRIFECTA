import NavBarMobile from "../components/NavLogistics/NavbarMobile";
import NavBar from "../components/NavLogistics/Navbar";
import DateComponent from "../components/Dashboard/DateComponent.jsx";
import DashboardLayout from "../components/Dashboard/DashboardLayout.jsx";

const LogisticsDashboard = () => {
  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div className="md:h-screen mb-4 md:mb-0">
        <NavBar />
        <NavBarMobile />
      </div>
      <div className="h-screen md:w-full flex  overflow-x-auto">
        <div className="flex flex-col w-full">
          <DateComponent />
          {/* <div className="flex flex-row gap-5 ml-24 mt-5 items-center">
            Hello
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LogisticsDashboard;
