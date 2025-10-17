// Percorso: src/components/UInterface/forms/RegisterForm.jsx

import { useState } from "react";
import { ConfirmSchema, getErrors, getFieldError } from "../../../lib/validattionForm";
import { useNavigate } from "react-router";
import supabase from "../../../QueryDb/queryDB";

export default function RegisterForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchema.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      console.log(errors);
    } else {
      let { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            userName: data.userName,
          },
        },
      });
      if (error) {
        alert("Errore nella registrazione: " + error.message);
      } else {
        alert("Registrazione avvenuta con successo!");
        await new Promise((resolve) => setTimeout(resolve, 500));
        navigate("/");
      }
    }
  };

  const onBlur = (property) => () => {
    const message = getFieldError(property, formState[property]);
    setFormErrors((prev) => ({ ...prev, [property]: message }));
    setTouchedFields((prev) => ({ ...prev, [property]: true }));
  };

  const isInvalid = (property) => {
    if (formSubmitted || touchedFields[property]) {
      return !!formErrors[property];
    }
    return undefined;
  };

  const setField = (property, valueSelector) => (e) => {
    setFormState((prev) => ({
      ...prev,
      [property]: valueSelector ? valueSelector(e) : e.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit} noValidate className="flex justify-center items-center  bg-primary text-primary">
      <div className="card-surface shadow-form max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-accent">Registrati</h1>

        <fieldset className="flex flex-col gap-4">
          {[
            { label: "Email", name: "email", type: "email", placeholder: "Email" },
            { label: "First Name", name: "firstName", type: "text", placeholder: "First Name" },
            { label: "Last Name", name: "lastName", type: "text", placeholder: "Last Name" },
            { label: "Username", name: "userName", type: "text", placeholder: "Username" },
            { label: "Password", name: "password", type: "password", placeholder: "Password" },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label htmlFor={name} className="block mb-1 text-support font-medium">{label}</label>
              <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={formState[name]}
                onChange={setField(name)}
                onBlur={onBlur(name)}
                aria-invalid={isInvalid(name)}
                required
                className={`w-full p-2 rounded-md bg-secondary border border-primary text-primary focus:outline-none focus:shadow-[0_0_10px_5px_rgba(241,91,181,0.8)] transition-shadow duration-300 resize-none ${
                  isInvalid(name) ? "border-[red]" : ""
                }`}
              />
              {formErrors[name] && <small className="text-support">{formErrors[name]}</small>}
            </div>
          ))}

          <div className="text-right">
            <a className="text-sm text-accent hover:text-support transition-colors cursor-pointer">
              Password dimenticata?
            </a>
          </div>

          <button
            type="submit"
            className="btn-primary rounded-md py-2 font-semibold shadow-neon hover:shadow-detail transition-all duration-300"
          >
            Registrati
          </button>
        </fieldset>
      </div>
    </form>
  );
}
