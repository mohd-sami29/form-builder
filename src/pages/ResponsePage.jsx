import { useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

function ResponsePage() {
  const [forms, setForms] = useState([]);
  const [responses, setResponses] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null);

  useEffect(() => {
    // Fetch forms
    fetch("http://localhost:5000/forms")
      .then((res) => res.json())
      .then((data) => setForms(data));

    // Fetch responses
    fetch("http://localhost:5000/responses")
      .then((res) => res.json())
      .then((data) => setResponses(data));
  }, []);

  return (
    <div className="pl-8 pr-8 overflow-auto max-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold pt-4 pb-4">Form Responses</h2>
        <Link
          to="/form-builder"
          className="flex border border-gray-300 pl-1 pr-2 pt-0.5 pb-0.5 justify-center items-center"
        >
          <span>
            <MdOutlineKeyboardBackspace />
          </span>
          Back
        </Link>
      </div>
      <div className="overflow-auto max-h-[85vh]">
        {forms.map((form) => (
          <div key={form.id}>
            <div
              className="cursor-pointer flex justify-between items-center bg-gray-200 p-4 mt-4 rounded-sm overflow-auto max-h-40"
              onClick={() =>
                setSelectedFormId(selectedFormId === form.id ? null : form.id)
              }
            >
              {form.title} {<SlArrowDown />}
            </div>
            {selectedFormId === form.id && (
              <div className="overflow-auto max-h-80 border border-gray-300">
                <table className="w-full mt-2 border-collapse border border-gray-300">
                  <thead className="sticky top-0">
                    <tr className="bg-[#d7e8ff] text-left">
                      {form.fields.map((field) => (
                        <th key={field.id} className="border p-2 font-medium">
                          {field.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {responses
                      .filter((res) => res.formId === form.id)
                      .map((res, idx) => (
                        <tr className="hover:bg-slate-100 " key={idx}>
                          {form.fields.map((field) => (
                            <td key={field.id} className="border text-sm p-2">
                              {res.responses[field.label] || "-"}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResponsePage;
