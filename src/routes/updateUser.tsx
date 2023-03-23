import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import scheduleFetch from "../axios/config";
import "../css/newUser.css";
import { Contact } from "../interface/contact";

import { useNavigate, useParams } from "react-router-dom";

interface PhoneNumber {
  id: number;
  id_schedule: number;
  number: number;
}

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, getValues, setValue } = useForm({});
  const [localNumbers, setLocalNumbers] = useState<PhoneNumber[]>();

  console.log(localNumbers);

  const resetAsyncForm = useCallback(async () => {
    scheduleFetch.get(`/schedule/${id}`).then((response) => {
      const { name, id, date_born, cpf, email, numbers } =
        response.data.data[0];
      reset({
        name: name,
        id: id,
        date_born: date_born,
        cpf: cpf,
        email: email,
        numbers: numbers,
      });
      setLocalNumbers(
        numbers
          .map((item: any) => item)
          .sort((a: PhoneNumber, b: PhoneNumber) => a.id - b.id)
      );
    });
  }, [reset]);

  useEffect(() => {
    resetAsyncForm();
  }, [resetAsyncForm]);

  useEffect(() => {
    setValue(
      "numbers",
      localNumbers?.map((item) => String(item.number))
    );
  }, [localNumbers]);

  const hasNumbers = getValues("numbers");

  const onSubmit = async () => {
    console.log(getValues("name"));
    scheduleFetch.put(`/schedule/${id}`, {
      name: getValues("name"),
      cpf: getValues("cpf"),
      email: getValues("email"),
      date_born: getValues("date_born"),
      numbers: getValues("numbers"),
    });
  };

  const handleChangeNumber = (event: any, number: PhoneNumber) => {
    event.preventDefault();

    const inputValue = event.target.value;

    if (!localNumbers || localNumbers.length === 0) return;

    const editedNumber = localNumbers.find(
      (item: PhoneNumber) => item.id === number.id
    );

    if (!editedNumber) return;

    const currentFiltered = localNumbers.filter(
      (item: PhoneNumber) => item.id !== number.id
    );

    if (!currentFiltered) {
      setLocalNumbers(
        [
          {
            ...editedNumber,
            number: inputValue,
          },
        ].sort((a: PhoneNumber, b: PhoneNumber) => a.id - b.id)
      );
    }

    setLocalNumbers(
      [
        ...currentFiltered,
        {
          ...editedNumber,
          number: inputValue,
        },
      ].sort((a: PhoneNumber, b: PhoneNumber) => a.id - b.id)
    );
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
        {localNumbers &&
          localNumbers.map((number: PhoneNumber) => (
            <input
              className="inputForm"
              type="tel"
              key={number.id}
              onChange={(e: any) => handleChangeNumber(e, number)}
              value={number.number}
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
