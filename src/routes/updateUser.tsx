import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import scheduleFetch from "../axios/config";
import "../css/newUser.css";
import { Contact } from "../interface/contact";

import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm({});

  useEffect(() => {
    scheduleFetch.get(`/schedule/${id}`).then((response) => {
      console.log(response.data.data);
      reset(response.data.data);
    });
  }, []);

  const onSubmit = async () => {
    scheduleFetch.put(`/schedule/edit/${id}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="labelForm">
        Nome:
        <input className="inputForm" type="text" {...register("name")} />
      </label>
      <br />
      <label className="labelForm">
        E-mail:
        <input className="inputForm" type="email" {...register("email")} />
      </label>
      <br />
      <label className="labelForm">
        Data de Nascimento:
        <input className="inputForm" type="date" {...register("date_born")} />
      </label>
      <br />
      <label className="labelForm">
        CPF:
        <input className="inputForm" type="text" {...register("cpf")} />
      </label>
      <br />
      <label className="labelForm">
        Telefones:
        {Array.from({ length: 3 }).map((_, index) => (
          <input
            className="inputForm"
            type="tel"
            key={index}
            {...register(`numbers.${index}`)}
          />
        ))}
      </label>
      <br />
      <button type="submit" className="buttonForm">
        Enviar
      </button>
    </form>
  );
};

export default UpdateUser;
