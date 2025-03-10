import { Route, Routes } from "react-router-dom";
import { paths } from "./paths";
import PublicLayout from "@pages/publicPages/PublicLayout";
import Homepage from "@pages/publicPages/homepage/Homepage";
import Login from "@pages/publicPages/login/Login";

import ForgotPassword from "@pages/publicPages/forgotPassword/ForgotPassword";
import AdminLayout from "@pages/privatePages/AdminLayout";
import AdminDashboard from "@pages/privatePages/dashboard/AdminDashboard";
import AdminStaff from "@pages/privatePages/users/AllUsers";
import AddUser from "@pages/privatePages/users/addUser";
import AddnewExpenditure from "@pages/privatePages/tasks/CreateTask";
import UserProfile from "@pages/privatePages/users/UserProfile";
import EditProfile from "@pages/privatePages/users/EditProfile";
import OTP from "@pages/publicPages/forgotPassword/OTP";
import NewPassword from "@pages/publicPages/forgotPassword/NewPassword";
import UpdatePassword from "@pages/privatePages/users/UpdatePassword";
import GuestLayout from "@pages/GuestPrivatePages/GuestLayout";
import GuestDashboard from "@pages/GuestPrivatePages/guestDashboard/GuestDashboard";
import AllTasks from "@pages/privatePages/tasks/AllTasks";
import ViewTask from "@pages/privatePages/tasks/ViewTask";
import UpdateTask from "@pages/privatePages/tasks/updateTask";
import StaffTasks from "@pages/GuestPrivatePages/staffTasks/StaffTasks";
import Notes from "@pages/privatePages/settings/Notes";





const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path={paths.Index} element={<PublicLayout />}>
      <Route path={paths.Index} element={<Homepage />} />

    

      <Route path={paths.Login} element={<Login />} />
      <Route path={paths.ForgotPassword} element={<ForgotPassword />} />
      <Route path={paths.setNewPassword} element={<NewPassword/>} />
      <Route path={paths.OTPPage} element={<OTP />} />
  
    </Route>
    {/* Private Rputes */}
    <Route path={paths.Admin} element={<AdminLayout />}>
      <Route path={paths.AdminDashboard} element={<AdminDashboard />} />
      <Route path={paths.Notes} element={<Notes />} />
     
      <Route path={paths.Tasks} element={<AllTasks />} />
      <Route path={`${paths.Tasks}/view/:id`} element={<ViewTask/>} />

      <Route path={paths.Users} element={<AdminStaff />} />
      <Route path={`${paths.Users}/add`} element={<AddUser/>} />
      <Route path={`${paths.Users}/:id`} element={<UserProfile/>} />
      <Route path={`${paths.Users}/edit/:id`} element={<EditProfile/>} />
      <Route path={`${paths.Users}/update/password/:id`} element={<UpdatePassword/>} />
    </Route>

    {/* Guest Pages */}
    <Route path={paths.Guest} element={<GuestLayout />}>
      
      <Route path={paths.GuestDashboard} element={<GuestDashboard />} />
      <Route path={paths.StaffTasks} element={<StaffTasks />} />
      <Route path={`${paths.StaffTasks}/add`} element={<AddnewExpenditure/>} />
      <Route path={`${paths.StaffTasks}/edit/:id`} element={<UpdateTask/>} />
      <Route path={`${paths.StaffTasks}/view/:id`} element={<ViewTask/>} />
      <Route path={`${paths.GuestUser}/update/password/:id`} element={<UpdatePassword/>} />
      <Route path={`${paths.GuestUser}/:id`} element={<UserProfile/>} />
      <Route path={`${paths.GuestUser}/edit/:id`} element={<EditProfile/>} />

    </Route>
  </Routes>
);

export default AppRoutes;
