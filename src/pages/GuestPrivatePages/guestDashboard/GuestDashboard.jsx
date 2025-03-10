import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import { BoxWrapper } from "@components/DashboardStats";
import LodginBenefits from "@components/LodginBenefits";
import LodgingGuidelines from "@components/LodgingGuidelines";
import ErrorAlert from "@pages/errorPages/errorAlert";
import useAuthStore from "@store/authStore";
import { countDataStatus } from "@utils/helpers";
import { useEffect, useState } from "react";
import { BsBarChartLine, BsBarChartSteps, BsGraphUp } from "react-icons/bs";
import { GiAbstract080, } from "react-icons/gi";


const GuestDashboard = () => {
  const { user } = useAuthStore();
  const [allTasks, setAllTasks] = useState([])
  const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
         // Fetch only active bookings
      const response = await apiClient.get(`${endpoints.getAllTasks}`, {
        params: { userId: user.id} // Pass status as a query parameter
      });
      setAllTasks(response.data.data.data);
          setError(null);
        } catch {
          setError("An error occurred");
        }
      };
      fetchData();
    }, [user.id]);


  return (
    <div className="flex flex-col gap-4 pb-12 lg:pb-0">
          {/* Render ErrorAlert if there's an error */}
          {error && <ErrorAlert message={error} />}
    <div className="flex gap-4 w-full flex-wrap" >
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <BsBarChartLine className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Tasks</span>
          <div className="flex items-center">
            {allTasks.length}
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-500">
          <GiAbstract080 className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Approved Tasks</span>
          <div className="flex items-center">
             {countDataStatus(allTasks, 'Approved')}
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
          <BsGraphUp className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Pending Tasks</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
            {countDataStatus(allTasks, 'Pending')}
            </strong>
           
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-500">
          <BsBarChartSteps className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Rejected Tasks</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
            {countDataStatus(allTasks, 'Rejected')}
            </strong>
           
          </div>
        </div>
      </BoxWrapper>
    </div>

    <div className="flex flex-col lg:flex-row gap-4 w-full h-[42rem] lg:h-auto ">
            <LodgingGuidelines option1={true} />
           <LodginBenefits/>
          </div>

    </div>
  );
};

export default GuestDashboard;
