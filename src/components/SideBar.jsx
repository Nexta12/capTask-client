import { DashBottomMenu, DashMiddleMenu, GuestDashenu } from "@dummy/adminMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { paths } from "@routes/paths";
import useAuthStore from "@store/authStore";
import { UserRole } from "@utils/constants";

const SideBar = () => {
  const { pathname } = useLocation();
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const DashBoardMenu =
    user.role !== UserRole.EMPLOYEE ? DashMiddleMenu : GuestDashenu;

  return (
    <div className="hidden lg:flex flex-col bg-neutral-900 min-w-56  text-white ">
      {/* Top Part */}
      <Link to={paths.Index}>
        <div className="px-3  mt-5 mb-7 cursor-pointer">
          <h3 className="h3">
            CAPTASK<sup>™</sup>
          </h3>
        </div>
      </Link>

      {/* Middle Part */}
      <div className="flex-1 ">
        {DashBoardMenu.map((item, index) => {
          return <SideBarLink key={index} item={item} pathname={pathname} />;
        })}
      </div>
      {/*  bottom Part */}
      <div className="border-t border-yellow-900 pt-3">
        {DashBottomMenu.filter((item) => {
          // If the user is an EMPLOYEE and the item title is "Notes", exclude it
          if (user.role === UserRole.EMPLOYEE && item.title === "Notes") {
            return false;
          }
          return true;
        }).map((item, index) => (
          <SideBarLink
            key={index}
            item={item}
            pathname={pathname}
            onClick={
              item.title === "Logout" ? () => logout(navigate) : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};

function SideBarLink({ item, pathname, onClick }) {
  const Icon = item.icon;
  const isActive = pathname === item.link || pathname.includes(item.link);
  return (
    <Link
      to={item.link}
      className={` ${
        isActive ? "bg-amber-600" : ""
      } flex items-center px-3 gap-x-3 mb-2 rounded-sm py-2 group hover:bg-amber-600 transition-all duration-300 ease-in-out `}
      onClick={onClick}
    >
      <span className="text-xl">
        <Icon className="text-yellow-500 group-hover:text-black " />
      </span>
      <span className="">{item.title}</span>
    </Link>
  );
}

export default SideBar;
