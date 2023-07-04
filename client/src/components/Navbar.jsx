import React from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";

const Navbar = ({checkLogin, setCheckLogin, name, email}) => {

  const logOut = () => {
    localStorage.removeItem("token");
    setCheckLogin(false);
    // navigate('/')
  };

  return (
    <>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 pb-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          {/* <img src={logo} alt="logo" className="w-28 object-contain" /> */}
          <h1 className="font-sans text-3xl font-bold text-slate-500 hover:text-black italic ">IMAGINE</h1>
        </Link>

        <div className="flex">
          <Link
            to="/create-post"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md mr-2"
          >
            Create
          </Link>

          {checkLogin ? ( <div className="flex items-center">
            <Link
              onClick={logOut}
              to="/"
              className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md mr-2"
            >
              LogOut
            </Link>
            <Link to='/profile' className="w-10 h-10 rounded-full object-cover bg-[#6469ff] flex justify-center items-center text-white text-3xl text-center font-bold">
              {name[0]?.toUpperCase()}
            </Link>
            </div>
            
          ) : (
            <Link
              to="/login"
              className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
            >
              LogIn
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
