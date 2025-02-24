import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function FormDetail() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/forms/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch((error) => console.error("Error fetching form:", error));
  }, [id]);

  const handleChange = (e, fieldName) => {
    setResponses({ ...responses, [fieldName]: e.target.value });
  };

  const handleSubmit = async () => {
    const responsePayload = { formId: id, responses };

    await fetch("http://localhost:5000/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(responsePayload),
    });

    navigate("/");
  };

  return (
    <div className="p-4">
      {form ? (
        <>
          <h2 className="text-xl font-bold">{form.title}</h2>
          <form className="mt-4">
            {form.fields.map((field) => (
              <div key={field.id} className="mb-2">
                <label className="block font-bold">{field.label}</label>
                
                {field.type === "radio" ? (
                  field.options && field.options.length > 0 ? (
                    field.options.map((option, index) => (
                      <div key={index} className="flex items-center mb-1">
                        <input
                          type="radio"
                          name={field.label}
                          value={option}
                          className="mr-2"
                          onChange={(e) => handleChange(e, field.label)}
                        />
                        <span>{option}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No options available</p>
                  )
                ) : (
                  <input
                    type={field.type}
                    className="border p-2 w-full"
                    placeholder={field.placeholder}
                    onChange={(e) => handleChange(e, field.label)}
                  />
                )}
              </div>
            ))}
            <button type="button" className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </>
      ) : (
        <p>Loading form...</p>
      )}
    </div>
  );
}

export default FormDetail;
