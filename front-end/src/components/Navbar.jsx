// import { useState } from "react";
import { Link, NavLink } from "react-router-dom";


function Navbar() {

    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const handleMenuToggle = () => {
    //     setIsMenuOpen(!isMenuOpen);
    // }
    const navItems = [
        {path: "/viec-lam-it", title: "Việc làm IT"},
        {path: "/ho-so-CV", title: "Hồ sơ & CV"},
        {path: "/cong-ty-it", title: "Công ty IT"},
        {path: "/blog", title: "Blog IT"},
        {path: "/dien-dan", title: "Diễn đàn IT"},
    ]
    return ( 
        <header>
            <nav className=" bg-main_color_1 flex gap-20 items-center  w-full">
                {/* navbar left - Logo */}
                <a className="p-2 px-5"  href="/">
                    <img src="logo.jpg" alt="logo" className="w-40 h-20"/>
                </a>
                {/* navbar center - MAIN TOOLS */}
                <ul className="text-main_color_2 flex gap-10 px-5 py-2 font-bold">
                    {
                        navItems.map(({path,title}) => 
                            <li key = {path}>
                                <NavLink 
                                    to = {path}
                                    className={({isActive}) => {
                                        return (isActive? "active":"text-main_color_2")
                                    }}>
                                    {title}
                                </NavLink>
                            </li>
                        )
                    }
                </ul>
                {/* navbar right  */}
                <div className="flex ml-auto items-center gap-5">
                    <div className="flex gap-5">
                        <Link to = "/login"  className="py-2 px-7 border border-background text-background font-bold  ">Đăng nhập</Link>
                        <Link to = "/sign-up" className="py-2 px-7 border bg-background text-main_color_1 font-bold ">Đăng ký</Link>
                    </div>

                    <div className="ml-auto mr-5" >
                        <Link to="/eng">Eng</Link>
                        <span> | </span>
                        <Link to="/vie" className="text-background font-bold">Vie</Link>
                    </div>
                </div>
                
            </nav>
        </header> 
    );
}

export default Navbar;