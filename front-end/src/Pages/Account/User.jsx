/* eslint-disable react/prop-types */
import { FaChevronDown } from "react-icons/fa6";
import { BiFile, BiLogOut, BiWallet } from "react-icons/bi";
import { AiOutlineFileDone } from "react-icons/ai";
import { HiOutlineBookmarkAlt } from "react-icons/hi";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

function User({ displayName, url, role }) {
  const { handleLogout } = useLogin();

  const userMenu =
    role === "candidate"
      ? [
          { icon: <RiAccountPinBoxLine />, title: "Tài khoản của tôi" },
          { icon: <BiFile />, title: "Quản lý CV" },
          { icon: <AiOutlineFileDone />, title: "Việc đã ứng tuyển" },
          { icon: <HiOutlineBookmarkAlt />, title: "Đang theo dõi" },
          { icon: <BiLogOut />, title: "Đăng xuất", action: handleLogout },
        ]
      : [
          { icon: <RiAccountPinBoxLine />, title: "Tài khoản của tôi" },
          { icon: <BiWallet />, title: "Ví tuyển dụng" },
          { icon: <AiOutlineFileDone />, title: "Việc làm đã đăng" },
          { icon: <HiOutlineBookmarkAlt />, title: "Đang theo dõi" },
          { icon: <BiLogOut />, title: "Đăng xuất", action: handleLogout },
        ];
  return (
    <div className="group relative">
      <button className="group/button flex items-center gap-2 lg:max-w-none max-w-[100px] p-2 rounded hover:bg-gray-100">
        {url ? (
          <img className="max-h-7 rounded-[50%]" src={url} alt="user" />
        ) : (
          <img
            className="max-h-7 "
            src="/src/assets/user_default.jpg"
            alt="user"
          />
        )}

        <span className="font-bold">{displayName}</span>
        <FaChevronDown className="m-2 transition duration-500 group-hover/button:rotate-180" />
      </button>
      <ul className="absolute opacity-0 group-hover:opacity-100 lg:min-w-[315px] top-[110%] group-hover:top-full lg:left-0 right-0 invisible group-hover:visible shadow-2xl bg-white rounded ">
        {userMenu.map((item, index) => (
          <Link
            key={index}
            className="group/link flex items-center p-3 text-gray-600 hover:bg-gray-100"
            onClick={item.action}
          >
            <div className="p-2 mr-2 rounded text-2xl transition duration-300 group-hover/link:bg-white group-hover/link:text-red-600  bg-gray-100">
              {item.icon}
            </div>
            <span>{item.title}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default User;
