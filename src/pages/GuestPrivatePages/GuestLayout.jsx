import AdminHeader from "@components/AdminHeader";
import SideBar from "@components/SideBar";
import Spinner from "@components/Spinner";
import { paths } from "@routes/paths";
import useAuthStore from "@store/authStore";
import { UserRole } from "@utils/constants";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const GuestLayout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, validateAuth } = useAuthStore();
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      setAuthLoading(true);
      try {
        await validateAuth(); // Ensure validateAuth works properly
      } finally {
        setAuthLoading(false);
      }
    };

    verifyAuth();
  }, [validateAuth]);

  useEffect(() => {
    if (!user && !isAuthenticated) {
      navigate(paths.Index); //
    } else if (user && !isAuthenticated) {
      setAuthLoading(true);
    }
  }, [user, isAuthenticated, navigate]);

  // Screen Roles

  useEffect(() => {

    if (!user) {
      // Redirect to Index if no user is present
      navigate(paths.Index);
      return;
    }
    switch (user?.role) {
      case UserRole.EMPLOYEE:
        // User has a valid role, no action needed
        break;
      case UserRole.ADMIN:
      case UserRole.ICT:
      case UserRole.MANAGER:
        navigate(paths.AdminDashboard);
        break;
      default:
        // Redirect to the index page if the role is invalid
        navigate(paths.Index);
        break;
    }
  }, [user, navigate]);

  if (authLoading) {
    return <Spinner />;
  }

  if (isAuthenticated) {
    return (
      <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
        <SideBar />
        <div className=" flex-grow overflow-x-hidden">
          <AdminHeader />
          <div className="bg-neutral-100 w-full h-[calc(100vh-82px)] p-4">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
};

export default GuestLayout;
