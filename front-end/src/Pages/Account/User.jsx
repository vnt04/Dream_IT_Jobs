/* eslint-disable react/prop-types */
import { FaChevronDown } from "react-icons/fa6";
import { BiFile, BiLogOut, BiWallet } from "react-icons/bi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { AiOutlineFileDone } from "react-icons/ai";
import { HiOutlineBookmarkAlt } from "react-icons/hi";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";

function User({ displayName, url, role, uid }) {
  const { handleLogout } = useLogin();
  const { dataRecruiter, dataCompany } = useContext(DataContext);
  const recruiter = dataRecruiter.find((r) => r.uid === uid);
  const currentCompany = dataCompany.find(
    (com) => com._id === recruiter?.company_id
  );
  console.log(currentCompany);
  const userMenu =
    role === "candidate"
      ? [
          {
            icon: <RiAccountPinBoxLine />,
            title: "Tài khoản của tôi",
            route: "/user/profile",
          },
          { icon: <BiFile />, title: "Quản lý CV", route: "user/my-cv" },
          {
            icon: <AiOutlineFileDone />,
            title: "Việc đã ứng tuyển",
            route: "user/my-jobs",
          },
          {
            icon: <HiOutlineBookmarkAlt />,
            title: "Đang theo dõi",
            route: "user/my-follow",
          },
          { icon: <BiLogOut />, title: "Đăng xuất", action: handleLogout },
        ]
      : [
          { icon: <RiAccountPinBoxLine />, title: "Tài khoản của tôi" },
          {
            icon: <HiOutlineBuildingOffice2 />,
            title: "Công ty của tôi",
            route: `/cong-ty-IT/${recruiter.company_id}`,
          },
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
        ) : currentCompany?.logo ? (
          <img
            className="max-h-7 border "
            src={`/src/assets/img-company/${currentCompany?.logo}`}
            alt="user"
          />
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
            to={item.route}
            className="group/link flex items-center p-3 text-gray-600 hover:bg-gray-100"
            onClick={item.action}
          >
            <div className="p-2 mr-2 rounded text-2xl transition duration-300 group-hover/link:bg-white group-hover/link:text-red-600  bg-gray-100">
              {item.icon}
            </div>
            <span className="group-hover/link:font-semibold">{item.title}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default User;
