import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Contact } from "../interface/contact";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import scheduleFetch from "../axios/config";

const Home = () => {
  const [contacts, setContact] = useState<any[]>([]);

  const getContacts = async () => {
    try {
      const response = await scheduleFetch.get("/schedule");
      const data = response.data.data;

      setContact(data);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const deleteUser = (id: number) => {
    scheduleFetch.delete(`/schedule/${id}`);

    setContact(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", color: "red" }}>Agenda Telefônica</h1>

      <TableContainer
        sx={{
          margin: "20px 0 0 0",
          boxShadow: "0 6px 10px 0 rgba(0, 0, 0, 0.14)",
        }}
      >
        <Table
          sx={{
            minWidth: 650,
            backgroundColor: "#FFF",
            opacity: 0.8,
          }}
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell className="tableCell"> Nome </TableCell>
              <TableCell align="center" className="tableCell">
                CPF
              </TableCell>
              <TableCell align="center" className="tableCell">
                Email
              </TableCell>
              <TableCell align="center" className="tableCell">
                Data de Nascimento
              </TableCell>
              <TableCell align="center" className="tableCell">
                Telefones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact: Contact) => (
              <TableRow
                key={contact.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {contact.name}
                </TableCell>
                <TableCell align="center">{contact.cpf}</TableCell>
                <TableCell align="center">{contact.email}</TableCell>
                <TableCell align="center">{contact.date_born}</TableCell>
                {contact.numbers.map((number: any) => (
                  <TableCell align="center" key={number.id}>
                    {number.number}
                  </TableCell>
                ))}
                <TableCell
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button className="btnDelete">
                    <span
                      className="material-icons"
                      onClick={() => deleteUser(contact.id)}
                    >
                      delete
                    </span>
                  </button>
                  <button className="btnEdit">
                    <Link to={{ pathname: `/edit/${contact.id}` }}>
                      <span className="material-icons">edit</span>
                    </Link>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
