import { useState,useContext, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";

function Navbar() {
  const [isFixed, setIsFixed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
      });
  };
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

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/viec-lam-it", title: "Việc làm IT" },
    { path: "/ho-so-CV", title: "Hồ sơ & CV" },
    { path: "/cong-ty-IT", title: "Công ty IT" },
    { path: "/blog", title: "Blog IT" },
    { path: "/dien-dan", title: "Diễn đàn IT" },
  ];

  const fixedClass = isFixed ? "fixed top-0 left-0 w-full z-50" : "";

  return (
    <header className="max-w-screen-2xl container mx-auto ">
      <nav
        className={`bg-main_color_1 flex justify-between px-4 items-center ${fixedClass}`}
      >
        {/* Navbar for fullscreen desktop */}
        {/* navbar left - Logo */}
        <a href="/">
          <img src="/src/assets/logo.jpg" alt="logo" className="w-40 h-20" />
        </a>

        {/* navbar center - MAIN TOOLS */}
        <ul className="text-main_color_2  hidden md:flex gap-12 font-bold">
          {navItems.map(({ path, title }) => (
            <li key={path}>
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

        {/* navbar right */}
        <div className="gap-5 items-center hidden lg:flex">
        {user ? (
            <>
              <div className="flex gap-4 items-center">
                <div className="flex -space-x-2 overflow-hidden">
                  {
                    user?.photoURL ? <> <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src={user?.photoURL}
                    alt=""
                  /></> : <> <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  /></>
                  }
                 
                </div>
                <button onClick={handleLogout} className="py-2 px-5 border rounded border-background hover:bg-background hover:text-white">Đăng xuất</button>
              </div>
            </>)
            :(
          <div className="flex gap-5">
            <Link
              to="/sign-up"
              className="py-1 px-4 border rounded border-background text-background font-bold"
            >
              Nhà tuyển dụng
            </Link>
            <Link
              to="/login"
              className="py-1 px-4 border rounded bg-background text-main_color_1 font-bold"
            >
              Đăng nhập
            </Link>
          </div>)}

          <div>
            <Link to="/eng">Eng</Link>
            <span> | </span>
            <Link to="/vie" className="text-background font-bold">
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
      <div className="bg-gradient-to-b from-gray-400 to-teal-300 h-0.5"></div>
    </header>
  );
}

export default Navbar;
