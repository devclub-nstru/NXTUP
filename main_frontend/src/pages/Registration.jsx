import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { showError, showSuccess } from "../utils/toastUtil";
import AOS from "aos";
import "aos/dist/aos.css";
import getEvents from "../services/eventService";
import axios from "axios";
import { toast } from "react-toastify";
import NotFound from "./NotFound";

const Registration = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmiting, setisSubmiting] = useState("");

  const [event, setEvent] = useState({});

  const [myevents, setmyEvents] = useState([]);
  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEvents();
        setmyEvents(data);
      } catch (error) {
        showError("Error loading data!");
      }
    };

    fetchData();
  }, []);

 useEffect(() => {
  setLoading(true);

  const timer = setTimeout(() => {
    const eventDetails = myevents.find((event) => event._id === eventId);

    if (eventDetails) {
      setEvent(eventDetails);
      setFormFields(eventDetails?.Form?.sequence);
    } else {
      <NotFound/> // Redirect to the 404 page if no event is found
    }
    setLoading(false);
  }, 1000);

  return () => clearTimeout(timer);
}, [myevents]);


  useEffect(() => {
    AOS.init();
  }, []);
  function handleInputChange(e, max, inputName) {
    const { name, value } = e.target;
    if (e.target.type == "checkbox") {
      if (!e.target.checked) {
        Array.from(
          document.querySelectorAll(`input[name='${inputName}']`)
        ).forEach((el) => el.removeAttribute("disabled"));
        return setFormData((prev) => ({
          ...prev,
          [name]: formData?.[name]
            .split(",")
            .map((e) => e.trim())
            .filter((el) => el !== value)
            .join(", "),
        }));
      }
      if (
        max &&
        formData?.[name] &&
        formData?.[name].split(",").length >= max - 1
      ) {
        Array.from(document.querySelectorAll(`input[name='${inputName}']`))
          .filter((el) => !el.checked)
          .forEach((el) => el.setAttribute("disabled", true));
      }
      return setFormData((prev) => ({
        ...prev,
        [name]: (formData?.[name] ? formData?.[name] + ", " : "") + value,
      }));
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisSubmiting("Submitting");
    const requiredCheckboxGroups = formFields.filter(
      (field) => field.type === "checkbox" && field.required
    );

    for (const group of requiredCheckboxGroups) {
      const checkboxes = document.querySelectorAll(
        `input[name='${group.inputName}']:checked`
      );
      if (checkboxes.length === 0) {
        showError(`Please select at least one option for ${group.inputName}`);
        return;
      }
    }

    try {
      // await new Promise( (res) => setTimeout(res, 1000));
      const response = await axios.post(
        "https://server-nxtup.onrender.com/submits",
        { eventId: event, studentDetails: formData },
        { headers: { "ngrok-skip-browser-warning": "69420" } }
      );

      showSuccess("Submit Success!");
      navigate("/");
    } catch (error) {
      if (error.response) {
        showError("Something wrong happened. Please try again later!");
      } else {
        showError("Something wrong happened. Please try again later!");
      }
    }
    setisSubmiting("");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div data-aos="fade-up" className="registration-form-container">
      <div className="intro-container">
        <h1 className="registration-form-heading">
          {event?.Title.includes("Neutron")
            ? "Application Form"
            : "Registration Form"}
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => {
          if (field.type === "select") {
            return (
              <div key={field.name} className="form-group">
                <div className="formInputLabel">
                  <label>{field.inputName}</label>
                  {field.required && <span className="required">*</span>}
                </div>
                <select
                  style={{ color: "#fff !important" }}
                  name={field.inputName}
                  onChange={handleInputChange}
                  required={field.required}
                >
                  <option value="">Select an option</option>
                  {field.placeholder.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          if (field.type === "checkbox") {
            return (
              <div key={field.name} className="form-group">
                <div className="formInputLabel">
                  <label>{field.inputName}</label>
                  {field.required && <span className="required">*</span>}
                </div>
                <div>
                  {field.placeholder.map((option, index) => (
                    <div key={index} className="checkbox-option">
                      <input
                        style={{ color: "#fff !important" }}
                        type="checkbox"
                        name={field.inputName}
                        value={option}
                        // required={field.required}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            field?.maxValue,
                            field?.inputName
                          )
                        }
                      />
                      <label>{option}</label>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if (field.type === "radio") {
            return (
              <div key={field.name} className="form-group">
                <div className="formInputLabel">
                  <label>{field.inputName}</label>
                  {field.required && <span className="required">*</span>}
                </div>
                <div style={{ display: "flex", gap: "1.5rem" }}>
                  {field.placeholder.map((option, index) => (
                    <div key={index} className="radio-option">
                      <input
                        style={{ color: "#ffffff" }}
                        type="radio"
                        name={field.inputName}
                        value={option}
                        required={field.required}
                        onChange={handleInputChange}
                      />
                      <label>{option}</label>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <div key={field.name} className="form-group">
              <div className="formInputLabel">
                <label>{field.inputName}</label>
                {field.required && <span className="required">*</span>}
              </div>
              {field.type == "textarea" ? (
                <textarea
                  type={"textarea"}
                  style={{ color: "#ffffff" }}
                  name={field.inputName}
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={handleInputChange}
                />
              ) : (
                <input
                  type={field.type == "link" ? "text" : field.type}
                  style={{ color: "#ffffff" }}
                  name={field.inputName}
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={handleInputChange}
                  pattern={field.type == "link" ? "https?://.+" : undefined}
                />
              )}
            </div>
          );
        })}

        <div className="button-container">
          <button
            disabled={isSubmiting != "" ? true : false}
            type="submit"
            className="submit-button"
            style={{
              opacity: isSubmiting != "" ? "0.5" : "1",
              cursor: isSubmiting != "" ? "not-allowed" : "pointer",
            }}
          >
            {isSubmiting || "Apply Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
