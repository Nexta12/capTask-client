
import { paths } from "@routes/paths";
import {BsArrowsFullscreen, BsPeople } from "react-icons/bs"
import { Link } from "react-router-dom";
import dummyImage from "@assets/img/rooms/3.png"
const Room = ({room}) => {

  const { _id, totalBeds, maxPeople, title, description, price, bookingStatus } = room
  return <div className="bg-white shadow-2xl min-h-[520px] group ">
    {/* img */}
    <Link to={`${paths.Apartment}/${_id}`}>
    <div className="overflow-hidden w-full h-[280px] flex items-center justify-center ">
    <img className="group-hover:scale-110 transition-all duration-300 w-full h-full object-cover" src={room?.images[0]?.url || dummyImage } alt="images" />
    </div>
    </Link>
    {/* Details */}
    <div className="bg-white shadow-lg max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base ">
      <div className="flex justify-between w-[80%]">
        {/* Size */}
        <div className="flex items-center gap-x-2">
          <div className="text-accent">
            <BsArrowsFullscreen className="text-[15px]"/>
          </div>
          <div className="flex gap-x-1">
            <div className="">Beds</div>
            <div className="">{totalBeds}</div>
          </div>
        </div>
        {/* room capacity */}
        <div className="flex items-center gap-x-2">
          <div className="text-accent">
            <BsPeople className="text-[18px]"/>
          </div>
          <div className="flex gap-x-1">
            <div className="">Max People</div>
            <div className="">{maxPeople}</div>
          </div>
        </div>
      </div>
    </div>
    {/* name  & description */}
    <div className="text-center">
      <Link to={`${paths.Apartment}/${_id}`}>
       <h3 className="h3 capitalize">{title}</h3>
      </Link>
      <p className="max-w-[300px] mx-auto mb-3 lg:mb-6">{description.slice(0,56)}</p>
    </div>
   
    {/* btn */}
    {bookingStatus !== 'free' ? (
       <Link to={`#`} className="btn btn-primary btn-sm max-w-[240px] mx-auto" aria-disabled >Unavailable</Link>
    ) : (
       <Link to={`${paths.Apartment}/${_id}`} className="btn btn-secondary btn-sm max-w-[240px] mx-auto" >Book Now ₦{price.toLocaleString()}</Link>
    ) }
   
  </div>;
};

export default Room;
