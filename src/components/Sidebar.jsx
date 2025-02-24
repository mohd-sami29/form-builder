import { useDispatch, useSelector } from "react-redux";
import { selectField } from "../store/formSlice";
import { IoTextOutline } from "react-icons/io5";
import { HiHashtag } from "react-icons/hi2";
import { SlCalender } from "react-icons/sl";
import { PiRadioButton } from "react-icons/pi";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";

function Sidebar() {
  const dispatch = useDispatch();
  const selectedField = useSelector((state) => state.form.selectedField);

  const fieldTypes = [
    { type: "text", label: "Text Field", icon: <IoTextOutline /> },
    { type: "number", label: "Number Field", icon: <HiHashtag /> },
    { type: "date", label: "Date Field", icon: <SlCalender /> },
    { type: "radio", label: "Radio Button", icon: <PiRadioButton /> },
  ];

  return (
    <>
      <div className="w-1/4 bg-gray-100 p-4 flex flex-col justify-between items-center">
        <div className="w-full">
          <h3 className="text-lg font-bold">Form Components</h3>
          <ul>
            {fieldTypes.map(({ type, label, icon }) => (
              <li
                key={type}
                className={`flex items-center gap-2 border p-2 my-2 cursor-pointer hover:bg-[#d7e8ff] ${
                  selectedField === type ? "bg-[#d7e8ff]" : ""
                }`}
                onClick={() => dispatch(selectField(type))}
              >
                <span
                  className={`p-2 text-lg rounded-sm ${
                    selectedField === type
                      ? "bg-white"
                      : "bg-[#d7e8ff] hover:bg-white text-sky-800"
                  }`}
                >
                  {icon}
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center gap-y-6">
          <Link
            to="/responses"
            className="p-2 border rounded-sm border-gray-300 font-medium"
          >
            View Responses
          </Link>
          <Link
            to="/"
            className="p-1 flex rounded-sm justify-center items-center border border-gray-400"
          >
            <span className="text-xl">
              <MdLogout />
            </span>
            LOGOUT
          </Link>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
