import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addForm } from "../store/formSlice";
import Sidebar from "../components/Sidebar";
import FieldSettings from "../components/FieldSettings";

function FormBuilder() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const selectedForm = useSelector((state) => state.form.selectedForm);

  const handleSave = async () => {
    if (!title) return;

    const newForm = { ...selectedForm, title };

    try {
      const response = await fetch("http://localhost:5000/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newForm),
      });

      if (response.ok) {
        const savedForm = await response.json();
        dispatch(addForm(savedForm));
      } else {
        console.error("Failed to save the form");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setTitle("");
  };

  return (
    <div className="flex w-full h-screen bg-white p-2 rounded-sm">
      <Sidebar />
      <div className="flex-1 p-8 pt-4 ">
        <p className="bg-[#d7e8ff] p-3 text-lg font-semibold">Form Title</p>
        <input
          required
          type="text"
          placeholder="Enter Form Title"
          className="border rounded-sm p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="mt-4 border p-2 rounded-sm bg-gray-50 overflow-auto max-h-[65vh]">
          {selectedForm.fields.length > 0 ? (
            selectedForm.fields.map((field) => (
              <div key={field.id} className="mb-2">
                <label className="block p-2 font-semibold">{field.label}</label>
                {field.type === "radio" ? (
                  field.options.map((option, index) => (
                    <div key={index} className="flex items-center mb-1 ml-2">
                      <input
                        required
                        type="radio"
                        readonly
                        name={field.label}
                        className="mr-2"
                      />
                      <span>{option}</span>
                    </div>
                  ))
                ) : (
                  <input
                    required
                    type={field.type}
                    className="border p-2 w-full rounded-md"
                    placeholder={field.placeholder}
                    readOnly
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No fields added yet.</p>
          )}
        </div>

        <button
          className="bg-[#a3caff] text-black hover:bg-[#67a6ff] hover:text-white px-4 py-2 mt-2 shadow-lg rounded-md"
          onClick={handleSave}
        >
          Save Form
        </button>
      </div>
      <FieldSettings />
    </div>
  );
}

export default FormBuilder;
