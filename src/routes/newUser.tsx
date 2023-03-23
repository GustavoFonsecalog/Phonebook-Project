import { useState } from "react";
import scheduleFetch from "../axios/config";
import "../css/newUser.css";
import { Contact } from "../interface/contact";

import { useNavigate } from "react-router-dom";

const initialFormValues: Contact = {
  id: -1,
  name: "",
  email: "",
  date_born: "",
  cpf: "",
  numbers: [],
};

const NewUser = () => {
  const [formValues, setFormValues] = useState<Contact>(initialFormValues);

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handlePhoneChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    const newPhones = [...formValues.numbers];
    newPhones[index] = value;
    setFormValues({ ...formValues, numbers: newPhones });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(JSON.stringify(formValues));
      const response = await scheduleFetch.post(
        "/schedule",
        JSON.stringify(formValues),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      console.log("API RESPONSE:", data);
      navigate("/");
    } catch (error) {
      console.error("API ERROR:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="labelForm">
        Nome:
        <input
          className="inputForm"
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label className="labelForm">
        E-mail:
        <input
          className="inputForm"
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label className="labelForm">
        Data de Nascimento:
        <input
          className="inputForm"
          type="date"
          name="date_born"
          value={formValues.date_born}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label className="labelForm">
        CPF:
        <input
          className="inputForm"
          type="text"
          name="cpf"
          value={formValues.cpf}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label className="labelForm">
        Telefones:
        {formValues.numbers.map((phone, index) => (
          <input
            className="inputForm"
            type="tel"
            key={index}
            value={phone}
            onChange={(event) => handlePhoneChange(event, index)}
          />
        ))}
        <button
          className="buttonForm"
          type="button"
          onClick={() =>
            setFormValues({
              ...formValues,
              numbers: [...formValues.numbers, ""],
            })
          }
        >
          Adicionar Telefone
        </button>
      </label>
      <br />
      <button type="submit" className="buttonForm">
        Enviar
      </button>
    </form>
  );
};

export default NewUser;
