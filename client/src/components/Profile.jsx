import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Profile = () => {
  // For Login/Logoout
  const [checkLogin, setCheckLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const checkLoginFunc = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://ai-image-generator-2-0-six.vercel.app/api/v1/checklogin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.success) {
            setCheckLogin(true);
            setName(data.message.name);
            setEmail(data.message.email);
          } else {
            setCheckLogin(false);
          }
      } catch (error) {
        console.log(error);
      }

    };

    checkLoginFunc();
  }, []);

  return (
    <>
      <Navbar
        checkLogin={checkLogin}
        setCheckLogin={setCheckLogin}
        name={name}
        email={email}
      />
      <div className="flex flex-col items-center">
        <div className="flex flex-col justify-center p-6 shadow-md rounded-xl w-[70%]">
          <span className="w-24 h-24 rounded-full object-cover bg-[#6469ff] flex justify-center items-center text-white text-5xl text-center font-bold mx-auto">
            {name[0]?.toUpperCase()}
          </span>
          <div className="space-y-4 text-center divide-y">
            <div className="my-2 space-y-1">
              <h2 className="text-xl font-semibold sm:text-2xl">{name}</h2>
              <p className="px-5 text-xs sm:text-base dark:text-gray-400">
                {email}
              </p>
            </div>
          </div>
          {/* <form className="flex flex-col justify-center items-center">
        <input className="w-[70%] p-2 m-2 border-2 border-gray-400 rounded-lg" type="text" placeholder="Name"/>
        </form> */}
        </div>
      </div>
    </>
  );
};

export default Profile;
