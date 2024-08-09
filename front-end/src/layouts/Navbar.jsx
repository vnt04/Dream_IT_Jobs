import { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaXmark, FaBell, FaGreaterThan } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import User from "../Pages/Account/User";
import { preventScroll } from "../utils";
import useLogin from "../hooks/useLogin";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const { user } = useContext(AuthContext);
  const { handleLogout } = useLogin();
  console.log(user);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event) => {
    // check click inside or outside menu
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };
  useEffect(() => {
    preventScroll(isMenuOpen);
  }, [isMenuOpen]);
  const navItems =
    user?.role === "recruiter"
      ? [
          { path: "/viec-lam-it", title: "Việc làm IT" },
          { path: "/dang-bai", title: "Đăng việc làm" },
          { path: "/cong-ty-it", title: "Công ty IT" },
          { path: "/blog", title: "Blog IT" },
        ]
      : [
          { path: "/viec-lam-it", title: "Việc làm IT" },
          { path: "/ho-so-CV", title: "Hồ sơ & CV" },
          { path: "/cong-ty-it", title: "Công ty IT" },
          { path: "/blog", title: "Blog IT" },
        ];
  const menuMobile = user
    ? [
        { path: "/viec-lam-it", title: "Việc làm IT" },
        user.role === "recruiter"
          ? { path: "/dang-bai", title: "Đăng việc làm" }
          : { path: "/ho-so-CV", title: "Hồ sơ & CV" },
        { path: "/cong-ty-it", title: "Công ty IT" },
        { path: "/blog", title: "Blog IT" },
        { path: "/register", title: "Nhà tuyển dụng" },
        { path: "#", title: "Đăng xuất", action: handleLogout },
      ]
    : [
        { path: "/viec-lam-it", title: "Việc làm IT" },
        { path: "/ho-so-CV", title: "Hồ sơ & CV" },
        { path: "/cong-ty-it", title: "Công ty IT" },
        { path: "/blog", title: "Blog IT" },
        { path: "/register", title: "Nhà tuyển dụng" },
        { path: "/login", title: "Đăng nhập" },
      ];
  return (
    <header className="sticky top-0 z-[1000] bg-white shadow-2xl">
      <div className="mx-auto flex h-20 max-w-[1680px] items-center justify-between px-3 text-base md:px-6 lg:px-8 lg:font-semibold screen4K:max-w-[2048px]">
        {/* Navbar for mobile  */}
        <div className="block lg:hidden">
          <button onClick={handleMenuToggle}>
            <FaBars
              className={`h-6 w-6 ${!isMenuOpen ? "visible" : "invisible"}`}
            />
          </button>
        </div>
        {/* Logo */}
        <a href="/">
          <img
            src="/src/assets/logo.jpg"
            alt="logo"
            className="h-16 w-36 lg:h-20 lg:w-40"
          />
        </a>
        <nav className="w-[42%] px-2 max-lg:hidden">
          {/* Navbar for fullscreen desktop */}
          <ul className="flex justify-between">
            {navItems.map(({ path, title }) => (
              <li key={path} className="hover:text-red-500">
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "text-red-500" : "")}
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        {/* User and language */}
        <div className="items-center lg:flex lg:gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              <FaBell />
              <User
                displayName={user.displayName}
                url={user.avatar}
                role={user.role}
                uid={user.uid}
              />
            </div>
          ) : (
            <div className="flex lg:gap-2">
              <Link to="/register" className="btn-2 hidden lg:block">
                Nhà tuyển dụng
              </Link>
              <Link to="/login" className="btn-1">
                Đăng nhập
              </Link>
            </div>
          )}
          <div className="hidden lg:block">
            <Link to="/eng">En</Link>
            <span className="font-normal"> | </span>
            <Link to="/vie" className="text-primary">
              Vi
            </Link>
          </div>
        </div>
        {/* NavItems menu mobile */}
        <div
          ref={menuRef}
          className={`fixed left-0 top-0 h-full w-[280px] space-y-5 bg-white shadow-2xl ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-500 ease-in-out`}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="ml-auto flex px-2 py-4 font-semibold text-primary hover:text-red-600"
          >
            <span className="flex items-center">
              Đóng
              <FaXmark className="h-5 w-5" />
            </span>
          </button>
          <ul className="space-y-3">
            {menuMobile.map((item) => (
              <li key={item.path} className="p-2 hover:text-red-600">
                <NavLink
                  to={item.path}
                  onClick={() => {
                    if (item.action) item.action();
                    setIsMenuOpen(false);
                  }}
                >
                  <span className="flex items-center justify-between">
                    {item.title} <FaGreaterThan className="size-3" />
                  </span>
                </NavLink>
                <hr />
              </li>
            ))}
          </ul>
          <div className="text-center">
            <span>Ngôn ngữ: </span>
            <button>En</button>
            <span> | </span>
            <button className="font-semibold text-primary">Vi</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
