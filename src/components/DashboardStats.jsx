import { BsBarChartLine, BsBarChartSteps, BsEnvelope} from "react-icons/bs";
import { GiAbstract080 } from "react-icons/gi";
import { useEffect, useState } from "react";
import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import ErrorAlert from "@pages/errorPages/errorAlert";
import Spinner from "./Spinner";
import { FaArrowUp } from "react-icons/fa";
import { countDataStatus } from "@utils/helpers";
const DashboardStats = () => {
  const [allTasks, setAllTasks] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
       // Fetch only active bookings
    const response = await apiClient.get(`${endpoints.getAllTasks}`);
    setAllTasks(response.data.data.data);
        setError(null);
      } catch {
        setError("An error occurred");
      }finally{
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="flex gap-4 w-full flex-wrap">
      {error && <ErrorAlert message={error} />}
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <BsBarChartLine className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Tasks</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold ">
           {allTasks.length || 0}
            </strong>
            <span
              className="text-sm text-green-500 pl-2 flex items-center gap-1"
              title="% Increase compared with last month"
            >
              0 new <FaArrowUp />{" "}
            </span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
          <GiAbstract080 className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Approved Tasks</span>
          <div className="text-center">
            <strong className="text-xl text-gray-700 font-semibold ">
               {countDataStatus(allTasks, 'Approved')}
            </strong>
            {/* <span className="text-sm text-green-500 pl-2">free</span> */}
          </div>
        </div>
      </BoxWrapper>
      
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-500">
          <BsEnvelope className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Pending Tasks</span>
          <div className="text-center">
            <strong className="text-xl text-gray-700 font-semibold ">{countDataStatus(allTasks, 'Pending')}</strong>
            {/* <span className="text-sm text-green-500 pl-2">+23</span> */}
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-500">
          <BsBarChartSteps className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Rejected Tasks</span>
          <div className="text-center">
            <strong className="text-xl text-gray-700 font-semibold ">{countDataStatus(allTasks, 'Rejected')}</strong>
            {/* <span className="text-sm text-green-500 pl-2">+23</span> */}
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
};

export function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center ">
      {children}
    </div>
  );
}

export default DashboardStats;
