import { useEffect, useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import Avater from "@assets/img/avater.png";
import { MdClose, MdOutlineMenu } from "react-icons/md";
import { DashBottomMenu, DashMiddleMenu, GuestDashenu } from "@dummy/adminMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "@store/authStore";
import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import Marquee from "react-fast-marquee";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { paths } from "@routes/paths";
import { AiOutlineDelete } from "react-icons/ai";
import { BsHouse } from "react-icons/bs";
import { getGreeting } from "@utils/helpers";
import { UserRole } from "@utils/constants";

const AdminHeader = () => {
  const { user, logout } = useAuthStore();
  const [notificationDropdown, setNotificationDropdown] = useState(false);
  const [userMenuDropdown, setUserMenuDropdown] = useState(false);
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState(user);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const greeting = getGreeting();

  const [notificationData, setNotificationData] = useState([]);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  const [showMarquee, setShowMarquee] = useState(true);

  const [tasksData, setTasksData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(endpoints.getAllTasks);
        setTasksData(response.data.data.data);
        setError(null);
      } catch {
        setError("An error occurred");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMarquee(false);
    }, 40000);

    return () => clearTimeout(timer);
  }, []);

  const pathSegments = pathname.split("/").filter(Boolean); // Remove empty segments
  let title = pathSegments.pop(); // Get last segment

  // Check if the last segment is an ID (typically a long alphanumeric string)
  if (title && /^[a-fA-F0-9]{24}$/.test(title)) {
    title = pathSegments.pop() || "Dashboard"; // Fallback to previous segment or default title
  }

  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);
  const sidebarRef = useRef(null);

  const handleNotificationToggle = (e) => {
    e.stopPropagation();
    setNotificationDropdown(!notificationDropdown);
  };

  const handleUserMenuToggle = (e) => {
    e.stopPropagation();
    setUserMenuDropdown(!userMenuDropdown);
  };

  const handleSidebarToggle = () => {
    setSideBarToggle(!sideBarToggle);
  };

  // Close Message dropdown when Outside the box is clicked.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setNotificationDropdown(false);
      }

      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuDropdown(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSideBarToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const SidebarToggleIcon = sideBarToggle ? MdClose : MdOutlineMenu;

  // Extract currentUser Details

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await apiClient.get(
          `${endpoints.getUserDetails}/${user.id}`
        );
        setCurrentUser(response.data.data);
      } catch (error) {
        setError(ErrorFormatter(error));
      }
    };

    fetchCurrentUser();
  }, [user]);

  // Get Contact messages

  // Get Notification Messages
  // useEffect(() => {
  //   const fetchNotification = async () => {
  //     try {
  //       const response = await apiClient.get(endpoints.getAllNotifications);
  //       setNotificationData(response.data);
  //       setError(null);
  //     } catch {
  //       setError("An error occurred");
  //     }
  //   };
  //   fetchNotification();
  // }, []);

  // Recalculate unread Notifications count when data changes
  useEffect(() => {
    if (notificationData && Array.isArray(notificationData)) {
      const unreadCount = notificationData.filter(
        (item) => !item.status
      ).length;
      setUnreadNotificationCount(unreadCount);
    }
  }, [notificationData]);

  // Handle Read Status
  const handleReadStatus = async (item) => {
    try {
      await apiClient.put(`${endpoints.updateNotifications}/${item._id}`);
      // Update the specific notification's status locally
      setNotificationData((prevData) =>
        prevData.map((notif) =>
          notif._id === item._id ? { ...notif, status: true } : notif
        )
      );
    } catch (error) {
      setError(ErrorFormatter(error));
    }
  };

  // Handle Delete Notification
  const handleDeleteNotice = async (item) => {
    try {
      await apiClient.delete(`${endpoints.deleteNotifications}/${item._id}`);
      // Remove the deleted notification from the local state
      setNotificationData((prevData) =>
        prevData.filter((notif) => notif._id !== item._id)
      );
    } catch (error) {
      setError(ErrorFormatter(error));
    }
  };

  // Choose Which Menu to display
  const DashBoardMenu =
    user.role !== UserRole.guest ? DashMiddleMenu : GuestDashenu;

  return (
    <>
      <div className="relative bg-white w-ful py-5 shadow-sm flex items-center justify-between gap-x-4">
        {error && <ErrorAlert message={error} />}
        {/* Left */}
        <div className="flex-1 flex items-center gap-x-3 pl-3 ">
          <SidebarToggleIcon
            onClick={handleSidebarToggle}
            className="text-accent text-2xl lg:hidden"
          />
          <h3 className="h3 font-tertiary tracking-[2px] font-light capitalize">
            {/* Extract the Title of the page from the Pathname */}
            {title}
          </h3>
        </div>

        {/* Middle */}
        <div className="hidden lg:block text-md font-tertiary tracking-[2px] font-light capitalize  text-accent">
          {greeting}, {currentUser.firstName} 🎉
        </div>
        {/* Right */}
        <div className="flex-1 ">
          <div className=" flex items-center justify-end  gap-x-6 pr-3 ">
            {user.role !== UserRole.guest && (
              <>
                {/* General Notification */}
                <div ref={notificationRef} className="relative  ">
                  <div
                    className="relative cursor-pointer"
                    onClick={handleNotificationToggle}
                  >
                    <IoMdNotificationsOutline className="text-accent text-[23px]" />

                    {unreadNotificationCount != 0 ? (
                      <span className="absolute top-[-15px] right-[-5px] bg-red-500 w-[20px] h-[20px] flex items-center justify-center rounded-full text-white text-[13px]">
                        {unreadNotificationCount}
                      </span>
                    ) : null}
                  </div>

                  <div
                    role="menu"
                    aria-hidden={!notificationDropdown}
                    aria-labelledby="notificationDropdown-menu-button"
                    className={`${
                      !notificationDropdown ? "hidden" : "block"
                    } absolute w-64 p-4 rounded-sm bg-white top-16 z-10 right-[-25px] shadow-2xl `}
                  >
                    {/* Started */}

                    <div className="flex flex-col gap-y-3 max-h-[300px] overflow-y-auto  relative">
                      <div className="">
                        {notificationData.length > 0 ? (
                          <>
                            <div className="bg-white sticky top-0  ">
                              <h3 className="mb-6 text-secondary text-2xl text-accent text-center ">
                                Notifications{" "}
                                <span className="text-xs">
                                  ({notificationData.length})
                                </span>
                              </h3>
                            </div>
                            {/* Notification Msg */}

                            {notificationData.map((item, index) => (
                              <div
                                key={index}
                                className={`${
                                  item.status === false ? "text-blue-400" : ""
                                } flex items-start justify-between mb-4 cursor-pointer`}
                              >
                                <div
                                  onClick={() => handleReadStatus(item)}
                                  className="text-left"
                                >
                                  <h3 className="text-[12px] font-semibold">
                                    {item.title}
                                  </h3>
                                  <p className="text-xs">{item.message}</p>
                                </div>
                                <div className="">
                                  <AiOutlineDelete
                                    role="button"
                                    onClick={() => handleDeleteNotice(item)}
                                    className="text-red-500 cursor-pointer mr-4 text-[16px]"
                                    title="Delete"
                                  />
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <span className="text-neutral-400 text-center">
                            No Notifications
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stopped */}
                  </div>
                </div>
              </>
            )}

            {/* User Icon */}
            <div ref={userMenuRef} className="relative  ">
              <div
                className="relative cursor-pointer"
                onClick={handleUserMenuToggle}
              >
                <img
                  src={currentUser.profilPic || Avater}
                  alt="user"
                  className="w-[35px] h-[35px] rounded-full object-cover border border-neutral-100 p-[3px] "
                />
              </div>

              <div
                role="menu"
                aria-hidden={!userMenuDropdown}
                aria-labelledby="userMenuDropdown-menu-button"
                className={`${
                  !userMenuDropdown ? "hidden" : "block"
                } absolute w-40 p-4 rounded-sm bg-white top-16 z-10 right-0 shadow-2xl`}
              >
                <div className=" p-2 flex flex-col gap-y-4 text-left">
                  <p className="capitalize whitespace-nowrap text-accent">
                    {" "}
                    Hi, {currentUser.firstName}{" "}
                  </p>

                  <Link
                    onClick={() => setUserMenuDropdown(false)}
                    to={`${
                      user.role !== UserRole.EMPLOYEE
                        ? paths.Users
                        : paths.GuestUser
                    }/update/password/${currentUser._id}`}
                    className="whitespace-nowrap text-accent hover:underline"
                  >
                    Change Password
                  </Link>

                  <Link
                    onClick={() => setUserMenuDropdown(false)}
                    to={`${
                      user.role !== UserRole.EMPLOYEE
                        ? paths.Users
                        : paths.GuestUser
                    }/${currentUser._id}`}
                    className=" text-accent hover:underline"
                  >
                    My Profile
                  </Link>
                  <button
                    className="btn btn-primary py-2"
                    onClick={() => logout(navigate)}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Menu Sidebar Mobile */}
        <div
          ref={sidebarRef}
          className={`${
            !sideBarToggle && "-translate-x-full xl:translate-x-0"
          } absolute transition-all duration-300  lg:hidden w-screen overflow-hidden top-[82px] z-30 h-[calc(100vh-82px)] bg-blue-950 text-white `}
        >
          <div className="w-full flex flex-col justify-between h-full">
            {/* Middle Part */}
            <div className="flex-2 ">
              <Link
                to={paths.Index}
                className="flex items-center px-3 gap-x-3 mb-2 rounded-sm py-2 group hover:bg-sky-500 transition-all duration-300 ease-in-out"
              >
                <span className="text-xl">
                  <BsHouse className="text-white group-hover:text-black " />
                </span>

                <span className="">Homepage</span>
              </Link>

              {DashBoardMenu.map((item, index) => {
                return (
                  <SideBarLink
                    key={index}
                    item={item}
                    handleSidebarToggle={handleSidebarToggle}
                    pathname={pathname}
                  />
                );
              })}
            </div>
            {/*  bottom Part */}

            <div className="border-t border-white pt-3">
              {DashBottomMenu.map((item, index) => (
                <SideBarLink
                  key={index}
                  item={item}
                  handleSidebarToggle={handleSidebarToggle}
                  pathname={pathname}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {showMarquee && (
        <Marquee
          className="p-2 text-center bg-blue-950 text-white cursor-pointer"
          pauseOnHover
        >
          <h2 className="">
            {greeting}, {currentUser.firstName}
          </h2>
          {tasksData.some(
            (data) =>
              data.status === "Pending" && user.role === UserRole.MANAGER) && (
            <>
              <h2 className="mx-40">
                You have an  unreviewed Task
              </h2>
            </>
          )}
        </Marquee>
      )}
    </>
  );
};
// Mobile Sidebar
function SideBarLink({ item, handleSidebarToggle, pathname }) {
  const Icon = item.icon;
  const isActive = pathname === item.link || pathname.includes(item.link);
  return (
    <>
      <Link
        onClick={() => handleSidebarToggle()}
        to={item.link}
        className={`${
          isActive ? "bg-sky-500 text-white" : ""
        } flex items-center px-3 gap-x-3 mb-2 rounded-sm py-2 group hover:bg-sky-600 transition-all duration-300 ease-in-out `}
      >
        <span className="text-xl">
          <Icon className="text-white group-hover:text-black " />
        </span>

        <span className="">{item.title}</span>
      </Link>
    </>
  );
}

export default AdminHeader;
