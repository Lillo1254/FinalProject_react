// Percorso: src/components/UInterface/forms/LoginForm.jsx

import { useNavigate } from "react-router";
import supabaseClient from "../../../QueryDb/queryDB";
import { useState } from "react";
import {
  ConfirmSchemaLogin,
  getErrors,
  getFieldError,
  LoginSchema,
} from "../../../lib/loginValidation";

export default function LoginForm() {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchemaLogin.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(error);
      console.log(errors);
    } else {
      console.log(data);
      let { error } = await supabaseClient.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        alert("Errore nel login: " + error.message);
      } else {
        alert("Login effettuato con successo!");
        await new Promise((resolve) => setTimeout(resolve, 200));
        navigate("/");
      }
    }
  };

  const onBlur = (property) => () => {
    const message = getFieldError(LoginSchema, property, formState[property]);
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
    <form onSubmit={onSubmit} className="flex justify-center items-center  bg-primary text-primary">
      <div className="card-surface shadow-form max-w-sm w-full p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-accent">
          Accedi
        </h1>

        <fieldset className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-support font-medium">
              Email
            </label>
            <input
              className={`w-full p-2 rounded-md bg-secondary border border-primary text-primary focus:outline-none focus:shadow-[0_0_10px_5px_rgba(241,91,181,0.8)] transition-shadow duration-300 resize-none ${
                isInvalid("email") ? "border-[red]" : ""
              }`}
              placeholder="Inserisci la tua email"
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={setField("email")}
              onBlur={onBlur("email")}
              aria-invalid={isInvalid("email")}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-support font-medium">
              Password
            </label>
            <input
              className={`w-full p-2 rounded-md bg-secondary border border-primary text-primary focus:outline-none focus:shadow-[0_0_10px_5px_rgba(241,91,181,0.8)] transition-shadow duration-300 resize-none ${
                isInvalid("password") ? "border-[red]" : ""
              }`}
              placeholder="Inserisci la password"
              type="password"
              id="password"
              name="password"
              value={formState.password}
              onChange={setField("password")}
              onBlur={onBlur("password")}
              aria-invalid={isInvalid("password")}
              required
            />
          </div>

          <div className="text-right">
            <a className="text-sm text-accent hover:text-support transition-colors cursor-pointer">
              Password dimenticata?
            </a>
          </div>

          <button
            type="submit"
            className="btn-primary rounded-md py-2 font-semibold shadow-neon hover:shadow-detail transition-all duration-300"
          >
            Login
          </button>
        </fieldset>
      </div>
    </form>
  );
}
