import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotescoGreen from "../assets/images/NotescoGreen.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate("/note");
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const sendCredentials = (event) => {
    event.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.info("Connexion réussie :", response);
        setError(false);
        navigateToDashboard();
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });

    console.info("Email :", email, "Password :", password);
  };

  return (
    <div className="connectionUser">
      <img src={NotescoGreen} className="Nc-logo" alt="logo" />

      <div className="formConnectionUser">
        <h2>Connectez - vous</h2>
        <form onSubmit={sendCredentials}>
          <label htmlFor="email"> Email </label>

          <input type="text" placeholder="Email" onChange={handleChangeEmail} />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={handleChangePassword}
          />
          <button className="btnLogin" type="submit">
            Se connecter
          </button>
        </form>
        {error ? "Email ou mot de passe incorrects" : ""}
      </div>
    </div>
  );
}
