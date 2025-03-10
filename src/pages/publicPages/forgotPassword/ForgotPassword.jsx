import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import InputField from "@components/Input";
import AlertMessage from "@pages/errorPages/AlertMessage";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import { setLocalStorageItem } from "@utils/localStorage";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const[message, setMessage] = useState({errorMessage: '', successMessage: ''})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
   e.preventDefault();
   setLoading(true)
      if(!email || email === ''){
        setLoading(false)
        return setMessage({errorMessage: 'Email is required', successMessage: ''})
      }

    try {

         await apiClient.post(endpoints.ForgetPassword, {email})

        setLocalStorageItem('otp', true)
        setLocalStorageItem('otpEmail', email)

        setEmail("")

        setMessage({errorMessage: '', successMessage: 'Check your email for OTP verification'})
         setTimeout(()=>{
          
          navigate(paths.OTPPage)

         },3000)
       
    } catch (error) {
      console.log(error)
      setMessage({errorMessage: ErrorFormatter(error), successMessage: ''})
    }finally{
      setLoading(false)
    }

  }


  return (
    <section className="">
     
      <div className="bg-black h-screen relative flex justify-center items-center  ">
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/50"></div>
        {/* Title */}
    
        <div className=" z-20 w-[80%] lg:w-[40%] bg-sky-600 p-5 rounded-md shadow-2xl ">
               <AlertMessage alert={message} />
              <h3 className="h3 text-white flex items-center gap-x-2 justify-center">ForgotPassword <FaLock title="Secured by Next securities" className="text-black"/> </h3>
            <form action="" onSubmit={handleSubmit} >
                <InputField placeholder='Email' name="email" onChange={(e)=> setEmail(e.target.value) } value={email} required />
                
                <button type="submit" className="btn btn-secondary hover:bg-black/65 w-full py-2 rounded-sm mb-4 " >
                
                {loading ? (
                      <>
                        <span>Please wait...</span>
                        <span className="animate-spin">🌀</span>{" "}
                        {/* Replace with your spinner */}
                      </>
                    ) : (
                      "Reset Password"
                    )}
                
                </button>
            </form>
        </div>
     

      </div>
    </section>
  );
};

export default ForgotPassword ;
