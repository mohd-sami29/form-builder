import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

function FormList() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/forms")
      .then((res) => res.json())
      .then((data) => setForms(data));
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="pl-8 pr-8 pt-4 pb-4 w-4/5">
        <div className="flex justify-between items-center mr-1">
          <h2 className="text-xl font-bold mb-4">Available Forms</h2>
          <Link
            to="/"
            className="flex rounded-sm border border-gray-300 pl-1 pr-2 pt-0.5 pb-0.5 justify-center items-center"
          >
            <span>
              <MdOutlineKeyboardBackspace />
            </span>
            Back
          </Link>
        </div>
        {forms.length > 0 ? (
          forms.map((form) => (
            <div key={form.id} className="border p-1 pl-3 rounded-sm mb-2">
              <h3 className="font-bold">{form.title}</h3>
              <Link to={`/forms/${form.id}`} className="text-blue-500">
                Fill Form
              </Link>
            </div>
          ))
        ) : (
          <p>No forms available.</p>
        )}
      </div>
    </div>
  );
}

export default FormList;
