import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import userAvater from "@assets/img/avater.png";
import Spinner from "@components/Spinner";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import useAuthStore from "@store/authStore";
import { UserRole } from "@utils/constants";
import {useEffect, useState } from "react";
import { BsEnvelope, BsMarkerTip, BsPencil, BsTelephone } from "react-icons/bs";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
const UserProfile = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [userDetails, setUserDetails] = useState({});


  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(paths.AdminDashboard);
    }
  };


  useEffect(() => {
    if (!id) return;

    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          `${endpoints.getUserDetails}/${id}`
        );
        setUserDetails(response.data.data);
      
      } catch (error) {
        setError(ErrorFormatter(error));
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <div className="">
        <FaArrowLeftLong
                onClick={() => handleGoBack()}
                className="cursor-pointer text-2xl text-neutral-400 mb-2 lg:hidden "
              />
        {/* Render ErrorAlert if there's an error */}
        {error && <ErrorAlert message={error} />}
    <div className=" bg-white border border-neutral-300 p-5 flex flex-col lg:flex-row  relative">
      {( user.role === UserRole.ICT || user.id === userDetails._id) && ( 
       <Link to={`${user.role !== UserRole.EMPLOYEE ? paths.Users : paths.GuestUser}/edit/${userDetails._id}`} title="Edit Profile" className="absolute top-5 right-5 text-blue-500" ><BsPencil/></Link>
      ) }
      <div className="left flex-1 flex flex-col items-center lg:border-r-2 border-neutral-300 ">
        <img
          src={ userDetails.profilePic || userAvater }
          alt="profile"
          className="w-[150px] h-[150px] rounded-full object-cover mb-4 "
        />
        <h3 className="text-3xl font-tertiary text-accent capitalize ">{userDetails.firstName} {userDetails.lastName} </h3>
        <p className="text-sm text-gray-500">({userDetails.role})</p>
      </div>

      <div className="right flex-[4] ">
        <div className="top border-b-2 border-neutral-300 py-5 lg:px-10 ">

          <div className="flex items-center gap-x-3 lg:gap-x-6">
            <h3 className=" text-lg  font-tertiary flex items-center ">
              {" "}
              <BsEnvelope className="text-gray-600 text-sm mr-2 " /> Email:
            </h3>
            <p className="text-gray-600 text-sm ">{userDetails.email}</p>
          </div>

          <div className="flex items-center gap-x-3 lg:gap-x-6">
            <h3 className=" text-lg  font-tertiary flex items-center ">
              {" "}
              <BsTelephone className="text-neutral-600 text-sm mr-2 " /> Phone:
            </h3>
            <p className="text-gray-600 text-sm ">{userDetails.phone}</p>
          </div>
          <div className="flex items-center gap-x-3 lg:gap-x-6">
            <h3 className=" text-lg  font-tertiary flex items-center ">
              {" "}
              <BsMarkerTip className="text-neutral-600 text-sm mr-2 " />Address:
            </h3>
            <p className="text-gray-600 text-sm ">{userDetails.address}</p>
          </div>

        </div>
        <div className="bottom py-5 lg:px-10">
          <div className="mb-8 w-full">
          {userDetails.description}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
