import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

function FormDetail() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/forms/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch form");
        return res.json();
      })
      .then((data) => setForm(data))
      .catch((error) => console.error("Error fetching form:", error));
  }, [id]);

  // validate form for male > 20 and feamle > 18
  const validateForm = (fieldName, value) => {
    if (fieldName === "Gender") {
      const age = parseInt(responses["Age"], 10) || 0;

      if (value === "Male" && age < 20) {
        setValidationError("Males must be at least 20 years old.");
      } else if (value === "Female" && age < 18) {
        setValidationError("Females must be at least 18 years old.");
      } else {
        setValidationError("");
      }
    }
  };

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setResponses((prev) => ({ ...prev, [fieldName]: value }));

    validateForm(fieldName, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (validationError) return;
    if (!id) {
      setValidationError("Form ID is missing.");
      return;
    }

        // Check if all required fields are filled
        const requiredFields = form?.fields?.filter((field) => field.required);
        const emptyFields = requiredFields?.filter(
          (field) => !responses[field.label]
        );
    
        if (emptyFields?.length > 0) {
          setValidationError("Please fill out all required fields.");
          return;
        }
    
        if (!Object.keys(responses).length) {
          setValidationError("Please fill out the form before submitting.");
          return;
        }
    
        if (validationError) return;

    try {
      const responsePayload = { formId: id, responses };

      await fetch("http://localhost:5000/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(responsePayload),
      });

      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-4 w-4/5">
        {form ? (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{form.title}</h2>
              <Link
                to="/forms"
                className="flex rounded-sm border border-gray-300 pl-1 pr-2 pt-0.5 pb-0.5 justify-center items-center"
              >
                <span>
                  <MdOutlineKeyboardBackspace />
                </span>
                Back
              </Link>
            </div>
            <form className="mt-4">
              {form.fields?.map((field) => {
                // Hide both parent name fields by default
                if (
                  (field.label === "Mother's Name" &&
                    responses["Select Parent"] !== "Mother") ||
                  (field.label === "Father's Name" &&
                    responses["Select Parent"] !== "Father")
                ) {
                  return null;
                }

                return (
                  <div key={field.id} className="mb-2">
                    <label className="block font-bold">{field.label}</label>

                    {field.type === "radio" ? (
                      field.options?.length > 0 ? (
                        field.options.map((option, index) => (
                          <div key={index} className="flex items-center mb-1">
                            <input
                              required={field.required}
                              type="radio"
                              name={field.id}
                              value={option}
                              className="mr-2"
                              checked={responses[field.label] === option}
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
                        required={field.required}
                        type={field.type}
                        className="border p-2 w-full"
                        placeholder={field.placeholder}
                        value={responses[field.label] || ""}
                        onChange={(e) => handleChange(e, field.label)}
                      />
                    )}
                  </div>
                );
              })}

              {validationError && (
                <p className="text-red-500">{validationError}</p>
              )}

              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 mt-2"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </>
        ) : (
          <p>Loading form...</p>
        )}
      </div>
    </div>
  );
}

export default FormDetail;
