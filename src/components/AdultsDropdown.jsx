import { RoomContext } from "@context/RoomContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useContext } from "react";
import { BsChevronDown } from "react-icons/bs";


const list = [
  {name: '1 Adult'},
  {name: '2 Adults'},
  {name: '3 Adults'},
  {name: '4 Adults'},
  {name: '5 Adults'},
]

const AdultsDropdown = () => {
  const { adults, setAdults } = useContext(RoomContext);


  return <Menu as ='div' className="w-full h-full bg-white  relative">
         {/* btn */}
          <MenuButton className="w-full h-full flex items-center justify-between px-8">
            {adults}
            <BsChevronDown className="text-base text-accent-hover"/>
          </MenuButton>
          {/* Items */}
          <MenuItems as ='ul' className='bg-white absolute w-full flex flex-col z-40' >
            {list.map((li, i) =>{
              return <MenuItem onClick={()=> setAdults(li.name)} as='li' key={i} className='border-b last-of-type:border-b-0 h-12 hover:bg-accent hover:text-white w-full flex justify-center items-center cursor-pointer' >
                {li.name}
              </MenuItem>
            })}
          </MenuItems>
  </Menu>;
};

export default AdultsDropdown;
