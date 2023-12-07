import LogoNotesndCo from "../assets/images/LogoNotesndCo.png";

export default function Home() {
  return (
    <header className="App-header">
      <img src={LogoNotesndCo} className="App-logo" alt="logo" />
      <p>Vos inspirations au bout des doigts ! ✨</p>

      {/* <p>
        Edit <code>App.jsx</code> and save to test HMR updates.
      </p> */}
      <p>
        <a
          className="App-link"
          href="/creationdecompte"
          target="_blank"
          rel="noopener noreferrer"
        >
          Créer votre compte
        </a>
        {" | "}
        <a
          className="App-link"
          href="/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          Connectez - vous
        </a>
      </p>
    </header>
  );
}
