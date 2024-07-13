import { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaXmark, FaBell } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import User from "../Pages/Account/User";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const { user } = useContext(AuthContext);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleClickOutside = (event) => {
    // Kiểm tra nếu click xảy ra ngoài menu thì đóng menu
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems =
    user?.role === "recruiter"
      ? [
          { path: "/viec-lam-it", title: "Việc làm IT" },
          { path: "/dang-bai", title: "Đăng việc làm" },
          { path: "/cong-ty-IT", title: "Công ty IT" },
          { path: "/blog", title: "Blog IT" },
        ]
      : [
          { path: "/viec-lam-it", title: "Việc làm IT" },
          { path: "/ho-so-CV", title: "Hồ sơ & CV" },
          { path: "/cong-ty-IT", title: "Công ty IT" },
          { path: "/blog", title: "Blog IT" },
        ];
  return (
    <header className="sticky top-0 z-50 max-w-screen-4xl mx-auto  ">
      <nav
        className={`bg-white flex justify-between px-4 items-center shadow-xl `}
      >
        {/* Navbar for fullscreen desktop */}
        {/* navbar left - Logo */}
        <a href="/">
          <img src="/src/assets/logo.jpg" alt="logo" className="w-40 h-20" />
        </a>

        {/* navbar center - MAIN TOOLS */}
        <ul className=" hidden md:flex gap-16 font-bold ">
          {navItems.map(({ path, title }) => (
            <li key={path} className="hover:text-red-500">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "active" : "text-main_color_2"
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* User */}

        <div className="gap-5 items-center hidden lg:flex">
          {user ? (
            <div className="flex gap-6 items-center">
              <FaBell />
              <User
                displayName={user.displayName}
                url={user.avatar}
                role={user.role}
                uid={user.uid}
              />
            </div>
          ) : (
            <div className="flex gap-5">
              <Link to="/register" className="btn-2">
                Nhà tuyển dụng
              </Link>
              <Link to="/login" className="btn-1">
                Đăng nhập
              </Link>
            </div>
          )}
          {/* Language */}
          <div>
            <Link to="/eng">Eng</Link>
            <span> | </span>
            <Link to="/vie" className="text-primary font-bold">
              Vie
            </Link>
          </div>
        </div>

        {/* Navbar for mobile  */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggle}>
            {isMenuOpen ? <FaXmark /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* NavItems menu mobile */}
      <div
        ref={menuRef}
        className={`fixed h-auto w-4/5 bg-white px-8 py-2 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-500 ease-in-out`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "active" : "text-main_color_2"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
        <Link to="/sign-up" className="block">
          Nhà tuyển dụng
        </Link>
        <Link to="/login" className="block">
          Đăng nhập
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
