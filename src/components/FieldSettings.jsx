import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addField } from "../store/formSlice";
import { RiDeleteBin6Line } from "react-icons/ri";

function FieldSettings() {
  const dispatch = useDispatch();
  const selectedField = useSelector((state) => state.form.selectedField);

  const [label, setLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [radioOptions, setRadioOptions] = useState([]);
  const [optionInput, setOptionInput] = useState("");

  const handleAddOption = () => {
    if (optionInput.trim()) {
      setRadioOptions([...radioOptions, optionInput.trim()]);
      setOptionInput("");
    }
  };

  const handleRemoveOption = (index) => {
    setRadioOptions(radioOptions.filter((_, i) => i !== index));
  };

  const handleAddField = () => {
    if (!label || !selectedField) return;

    const newField = {
      id: Date.now().toString(),
      type: selectedField,
      label,
      placeholder: selectedField !== "radio" ? placeholder : "",
      options: selectedField === "radio" ? [...radioOptions] : [],
    };

    dispatch(addField(newField));

    setLabel("");
    setPlaceholder("");
    setRadioOptions([]);
  };

  return (
    <div className="w-full h-full md:w-1/4 bg-gray-100 p-4 rounded-sm shadow-md flex flex-col items-center md:items-start">
      <h3 className="text-lg font-bold text-center md:text-left">
        Field Settings
      </h3>

      {selectedField && (
        <>
          <label className="block w-full">Label Name</label>
          <input
            required
            type="text"
            className="border p-2 w-full mb-2 rounded-md"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />

          {selectedField === "radio" ? (
            <>
              <label className="block font-medium w-full">
                Add Radio Options
              </label>
              <div className="flex flex-col md:flex-row w-full mb-2">
                <input
                  required
                  type="text"
                  className="border p-2 w-full rounded-md"
                  value={optionInput}
                  onChange={(e) => setOptionInput(e.target.value)}
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 mt-2 md:mt-0 md:ml-2 rounded-md shadow-lg"
                  onClick={handleAddOption}
                >
                  Add
                </button>
              </div>
              <ul className="mb-2 w-full">
                {radioOptions.map((option, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border p-2 mt-2 rounded-md"
                  >
                    {option}
                    <button
                      className="text-lg text-red-500"
                      onClick={() => handleRemoveOption(index)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <label className="block font-medium w-full">
                Placeholder Name
              </label>
              <input
                required
                type="text"
                className="border p-2 w-full mb-2 rounded-md"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
              />
            </>
          )}

          <button
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md shadow-lg w-full md:w-auto"
            onClick={handleAddField}
          >
            Add Field
          </button>
        </>
      )}
    </div>
  );
}

export default FieldSettings;
