import React, { useState } from "react";
import PublishNote from "../components/PublishNote";
import SelfConfidence from "../components/SelfConfidence";

export default function NoteDashboard() {
  const [displayNote, setDisplayNote] = useState(1);
  const [displayConfidence, setDisplayConfidence] = useState(false);

  const handleButtonClick = (componentNumber) => {
    setDisplayNote(componentNumber === 1);
    setDisplayConfidence(componentNumber === 2);
  };
  return (
    <div className="notedashboard">
      <div className="nav_note_dashboard">
        <ul className="ul_note_dashboard">
          <li className="middle">
            <button
              type="button"
              className="btnNoteDash"
              onClick={() => handleButtonClick(1)}
            >
              Notes
            </button>
          </li>
          <li className="middle">
            <button
              type="button"
              className="btnNoteDash"
              onClick={() => handleButtonClick(2)}
            >
              Audio
            </button>
          </li>
          <li className="middle">
            <button
              type="button"
              className="btnNoteDash"
              onClick={() => handleButtonClick(2)}
            >
              Confiance en soi
            </button>
          </li>
        </ul>
      </div>
      <div className="centered-dashnotecomponents">
        {displayNote && <PublishNote />}
        {displayConfidence && <SelfConfidence />}
      </div>
    </div>
  );
}
