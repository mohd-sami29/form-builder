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
      id: Date.now().toString(), // Ensure ID is a string
      type: selectedField,
      label,
      placeholder: selectedField !== "radio" ? placeholder : "", // Remove placeholder for radio fields
      options: selectedField === "radio" ? [...radioOptions] : [], // Store options for radio
    };

    dispatch(addField(newField));

    // Reset input fields
    setLabel("");
    setPlaceholder("");
    setRadioOptions([]);
  };

  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h3 className="text-lg font-bold">Field Settings</h3>

      {selectedField && (
        <>
          <label className="block">Label Name</label>
          <input
            type="text"
            className="border p-2 w-full mb-2 rounded-md"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />

          {selectedField === "radio" ? (
            <>
              <label className="block font-medium">Add Radio Options</label>
              <div className="flex mb-2">
                <input
                  type="text"
                  className="border p-2 w-full rounded-md"
                  value={optionInput}
                  onChange={(e) => setOptionInput(e.target.value)}
                />
                <button
                  className="bg-green-500 text-white px-4 ml-2 rounded-md shadow-lg"
                  onClick={handleAddOption}
                >
                  Add
                </button>
              </div>
              <ul className="mb-2">
                {radioOptions.map((option, index) => (
                  <li
                    key={index}
                    className="flex justify-between border p-2 mt-2"
                  >
                    {option}
                    <button
                      className="text-lg"
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
              <label className="block font-medium">Placeholder Name</label>
              <input
                type="text"
                className="border p-2 w-full mb-2 rounded-md"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
              />
            </>
          )}

          <button
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md shadow-lg"
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
