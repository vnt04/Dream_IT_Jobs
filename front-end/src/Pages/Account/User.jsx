/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import useNotification from "../../hooks/useNotification";

import { preventScroll } from "../../utils/index";
import { FaChevronDown } from "react-icons/fa6";
import { BiFile, BiLogOut, BiWallet } from "react-icons/bi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { AiOutlineFileDone } from "react-icons/ai";
import { HiOutlineBookmarkAlt } from "react-icons/hi";
import { RiAccountPinBoxLine } from "react-icons/ri";

function User() {
  const [isOpenProfileManage, setIsOpenProfileManage] = useState(false);
  const profileManage = useRef(null);
  const dispatch = useDispatch();
  const { successLogout } = useNotification();
  const { dataCompany } = useSelector((state) => state.company);
  const { dataRecruiters } = useSelector((state) => state.recruiter);
  const user = useSelector((state) => state.auth.user);

  const recruiter = dataRecruiters.find((r) => r.uid === user.uid);
  const currentCompany = dataCompany.find(
    (com) => com._id === recruiter?.company_id,
  );

  const handleLogout = () => {
    dispatch(logoutUser());
    successLogout();
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideUP);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideUP);
    };
  }, []);

  const handleClickOutsideUP = (event) => {
    if (profileManage && !profileManage.current.contains(event.target)) {
      setIsOpenProfileManage(false);
    }
  };
  useEffect(() => {
    preventScroll(isOpenProfileManage);
  }, [isOpenProfileManage]);
  const userMenu =
    user?.role === "candidate"
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
            route: `/cong-ty-IT/${recruiter?.company_id}`,
          },
          { icon: <BiWallet />, title: "Ví tuyển dụng" },
          { icon: <AiOutlineFileDone />, title: "Việc làm đã đăng" },
          { icon: <HiOutlineBookmarkAlt />, title: "Đang theo dõi" },
          { icon: <BiLogOut />, title: "Đăng xuất", action: handleLogout },
        ];
  return (
    <div ref={profileManage} className="group relative">
      <button
        onClick={() => setIsOpenProfileManage((currentState) => !currentState)}
        className="group/button flex max-w-[100px] items-center gap-2 rounded p-2 hover:bg-gray-100 lg:max-w-none"
      >
        {user?.photoURL ? (
          <img
            className="max-h-7 rounded-full"
            src={user.photoURL}
            alt="user"
          />
        ) : currentCompany?.logo ? (
          <img
            className="max-h-7 border"
            src={`/src/assets/img-company/${currentCompany?.logo}`}
            alt="user"
          />
        ) : (
          <img
            className="max-h-7"
            src="/src/assets/user_default.jpg"
            alt="user"
          />
        )}

        <span className="hidden font-semibold lg:block">
          {user?.displayName}
        </span>
        <FaChevronDown
          className={`transition duration-500 ${isOpenProfileManage ? "rotate-180" : ""}`}
        />
      </button>
      <ul
        className={`absolute right-0 top-[110%] min-w-[275px] rounded bg-white shadow-2xl transition duration-500 lg:left-0 lg:min-w-[315px] ${isOpenProfileManage ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        {userMenu.map((item, index) => (
          <Link
            key={index}
            to={item.route}
            className="group/link flex items-center p-3 text-gray-600 hover:bg-gray-100"
            onClick={() => {
              if (item.action) item.action();
              setIsOpenProfileManage((currentState) => !currentState);
            }}
          >
            <div className="mr-2 rounded bg-gray-100 p-2 text-2xl transition duration-300 group-hover/link:bg-white group-hover/link:text-primary">
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
