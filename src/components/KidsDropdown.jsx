import { RoomContext } from "@context/RoomContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useContext } from "react";
import { BsChevronDown } from "react-icons/bs";

const options = ["0 Kids", "1 Kid", "2 Kids", "3 Kids", "4 Kids"];

const KidsDropdown = () => {
  const { kids, setKids } = useContext(RoomContext);

  return (
    <Menu as="div" className="w-full h-full bg-white relative">
      <MenuButton className="w-full h-full flex items-center justify-between px-8">
        {kids === "0 Kids" ? "No Kids" : kids}
        <BsChevronDown className="text-base text-accent-hover" />
      </MenuButton>
      <MenuItems as="ul" className="bg-white absolute w-full flex flex-col z-40">
        {options.map((option, index) => (
          <MenuItem key={index} as="li" className="border-b last-of-type:border-b-0 h-12 hover:bg-accent hover:text-white w-full flex justify-center items-center cursor-pointer" onClick={() => setKids(option)}>
            {option}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default KidsDropdown;
