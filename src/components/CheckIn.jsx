import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import '../utils/datepicker.css'
import { useRef, useState } from "react";
import { BsCalendar } from "react-icons/bs";

const CheckIn = ({onDateChange}) => {
  const [startDate, setStartDate] = useState(false);
  const datePickerRef = useRef(null);
  const today = new Date()

  const handleDateChange = (date) => {
    setStartDate(date);
    onDateChange(date); 
  };

  return (
    <div className="relative flex items-center justify-end h-full ">
      <div onClick={()=> datePickerRef.current.setFocus()} // Focus DatePicker when icon is clicked
       className="absolute z-10 pr-8">
        <div className=" text-accent text-base" title="Select Date" >
          <BsCalendar/>
        </div>
      </div>
      <DatePicker ref={datePickerRef} className="w-full h-full" selected={startDate} placeholderText="Check in" onChange={handleDateChange} minDate={today} />
    </div>
  )
};

export default CheckIn;
