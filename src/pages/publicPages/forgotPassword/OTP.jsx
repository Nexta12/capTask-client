import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import InputField from "@components/Input";
import Spinner from "@components/Spinner";
import AlertMessage from "@pages/errorPages/AlertMessage";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "@utils/localStorage";
import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState({
    errorMessage: "",
    successMessage: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [signedOtp, setSignedOtp] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const otp = getLocalStorageItem("otp");
    const email = getLocalStorageItem("otpEmail");

    setSignedOtp(otp);
    setEmail(email);

    setLoading(false);
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (!signedOtp) {
    navigate(paths.Index);
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!otp || otp === "") {
      setLoading(false);
      return setMessage({
        errorMessage: "Enter the otp sent to your email",
        successMessage: "",
      });
    }

    try {
     await apiClient.post(endpoints.verifyOtp, {
        otp,
        email,
      });

      removeLocalStorageItem("otp");
      setOtp("")
      setMessage({errorMessage: '', successMessage: 'OTP verified redirecting...'})
      setTimeout(()=>{
          
        navigate(paths.setNewPassword)

       },3000)
    } catch (error) {
      setMessage({ errorMessage: ErrorFormatter(error), successMessage: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="">
      <div className="bg-black h-screen relative flex justify-center items-center   ">
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/50"></div>
        {/* Title */}

        <div className=" z-20 w-[80%] lg:w-[40%] bg-sky-600 p-5 rounded-md shadow-2xl ">
          <AlertMessage alert={message} />
          <h3 className="h3 text-white flex items-center gap-x-2 justify-center">
            OTP{" "}
            <FaLock title="Secured by Next securities" className="text-black" />{" "}
          </h3>
          <form action="#" onSubmit={handleSubmit} method="post" >
            <InputField
              placeholder="Enter the otp sent to your email.."
              name="otp"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />

            <button
              type="submit"
              className="btn btn-secondary hover:bg-black/65 w-full py-2 rounded-sm mb-4 "
            >
              {loading ? (
                <>
                  <span>Please wait...</span>
                  <span className="animate-spin">🌀</span>{" "}
                  {/* Replace with your spinner */}
                </>
              ) : (
                "Verify"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OTP;
