import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "@routes/paths";

import useAuthStore from "@store/authStore";

const Header = () => {
  const [header, setHeader] = useState(false);
  const { isAuthenticated, validateAuth, logout } = useAuthStore();
  const [userMenuDropdown, setUserMenuDropdown] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      await validateAuth(); // Ensure validateAuth works properly
    };
    verifyAuth();
  }, [validateAuth]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 10 ? setHeader(true) : setHeader(false);
    });
  }, []);

  const handleUserMenuToggle = (e) => {
    e.stopPropagation();
    setUserMenuDropdown(!userMenuDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`${
        header ? "bg-white shadow-lg" : "bg-black text-white"
      } fixed z-50 w-full transition-all duration-500 p-6 `}
    >
     <div className="flex items-center justify-between ">
        <div className="left">
          <Link to={paths.Index} className="h3">CAPTASK<sup>™</sup></Link>

        </div>
        <div className="right flex gap-3">
          {isAuthenticated ? (
            <div ref={userMenuRef} className="relative  ">
              <div
                className="relative cursor-pointer"
                onClick={handleUserMenuToggle}
              >
                Account
              </div>

              <div
                role="menu"
                aria-hidden={!userMenuDropdown}
                aria-labelledby="userMenuDropdown-menu-button"
                className={`${
                  !userMenuDropdown ? "hidden" : "block"
                } absolute w-40 p-4 rounded-sm bg-white top-10 z-10 right-0 shadow-2xl`}
              >
                <div className=" p-2 flex flex-col gap-y-4 text-left">
                  <Link
                    to={paths.AdminDashboard}
                    className="whitespace-nowrap text-accent hover:underline"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={"#"}
                    onClick={() => logout(navigate)}
                    className=" text-accent hover:underline"
                  >
                    Logout
                  </Link>
                </div>
              
              
              </div>
            </div>
          ) : (
            <Link to={paths.Login} className="hover:underline transition">
              Login
            </Link>
          )}
        </div>
     </div>
    </header>
  );
};

export default Header;
