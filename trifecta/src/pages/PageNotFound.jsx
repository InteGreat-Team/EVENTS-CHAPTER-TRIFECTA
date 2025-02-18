import { NavLink } from "react-router-dom";

function PageNotFound() {
  return (
    <NavLink to="/dashboard" className="flex h-[100%] flex-col items-center justify-center text-center m-14 md:mt-[150px]">
      <img
        src="./src/assets/org_logo.png"
        alt=""
        className="mb-10 w-[25%] max-w-[200px]"
      />
      <h1 className="mb-[0.5rem] text-[1.85rem] font-extrabold lg:mb-[0.35rem] lg:text-[4rem]">
        We can't find the page you're looking for
      </h1>
      <p className="mb-[1.25rem] text-[1.25rem] leading-5 lg:mb-[2.5rem] lg:text-[2.25rem] lg:leading-10">
        Check your spelling in the address bar. Or, try opening this site's home page to search or browse for the content.
      </p>
      <button className="bg-[#6239c5] shadow-shadow-db rounded-10 hover:bg-brand-yellow-dark px-6 py-2 text-[1.05rem] font-semibold text-[#FFFFFF] duration-300 lg:text-[1.5rem]">
      Go To Homepage
      </button>
    </NavLink>
  );
}

export default PageNotFound;
