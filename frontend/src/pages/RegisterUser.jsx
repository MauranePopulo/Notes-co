import axios from "axios";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notesco from "../assets/images/Notesco.png";

export default function RegisterCandidate() {
  const notify = () =>
    toast("Bienvenue chez Notes&Co !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  // const navigate = useNavigate();

  // const navigateToDashboard = () => {
  //   navigate("/");
  // };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkedPassword, setCheckedPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSucces] = useState(false);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeCheckedPassword = (event) => {
    setCheckedPassword(event.target.value);
  };

  const sendUserData = (event) => {
    event.preventDefault();

    if (password === checkedPassword) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/user`, {
          email,
          password,
        })
        .then((response) => {
          setSucces(response.data.message);
          setError(false);
          console.info(response);
          // navigateToDashboard();
        })
        .catch((err) => {
          if (
            err.response.data.error === `"email" is not allowed to be empty`
          ) {
            setError("L'email ne peut pas être vide");
          } else if (
            err.response.data.error === `"email" must be a valid email`
          ) {
            setError("Mettre un email valide");
          } else if (
            err.response.data.error === `"password" is not allowed to be empty`
          ) {
            setError("Merci de donner un password");
          } else if (
            err.response.data.error ===
            `"password" length must be at least 8 characters long`
          ) {
            setError("Le mot de passe doit faire au moins 8 caractères");
          } else if (err.response.data.error === 1062) {
            setError("L'email est déjà enregistré");
          } else {
            console.error(err.response.data.error);
          }
          setSucces(false);
        });
    } else {
      setError("Les mots de passe ne correspondent pas");
      console.error("Les mots de passe ne correspondent pas");
    }
  };

  console.info(
    "Email :",
    email,
    "Password :",
    password,
    "Password Vérifié:",
    checkedPassword
  );

  return (
    <div className="registerUser">
      <img src={Notesco} className="Nc-logo" alt="logo" />

      <div className="formRegisterUser">
        <h2>Créer votre compte</h2>
        <form onSubmit={sendUserData}>
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Email" onChange={handleChangeEmail} />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={handleChangePassword}
          />
          <label htmlFor="password">Confirmation du mot de passe</label>
          <input
            type="password"
            placeholder=" Confirmation de mot de passe "
            onChange={handleChangeCheckedPassword}
          />
          <div className="registerbtn">
            <button type="submit" onClick={notify}>
              Créer un compte
            </button>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
          <p>
            Déjà membre ?
            <span>
              {" "}
              <a href="/login" id="seConnecter">
                Connectez - vous !
              </a>
            </span>
          </p>
          {success ? <p className="messages">{success}</p> : ""}
          {error ? <p className="messages">{error}</p> : ""}
        </form>
      </div>
    </div>
  );
}
