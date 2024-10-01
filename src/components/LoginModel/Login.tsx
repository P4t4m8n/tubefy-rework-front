import { useRef, useState } from "react";

import { useModel } from "../../hooks/useModel";
import { LoginSVG } from "../svg/SVGs";


import RegularLogin from "./RegularLogin";
import DemoUserLogin from "./DemoUserLogin";

export default function Login() {
  const loginModelRef = useRef<HTMLDivElement>(null);
  const [animation, setAnimation] = useState<"" | "fade-in" | "fade-out">("");
  const [isModelOpen, setIsModelOpen] = useModel(
    loginModelRef,
    handleModelClose
  );

  //Improve later into a separate component
  const [isDemoUser, setIsDemoUser] = useState(false);

  function handleModelClose() {
    setAnimation("fade-out");
    setTimeout(() => {
      setIsModelOpen(false);
    }, 210);
  }

  const modelClass = `login-model ${animation}`;

  return (
    <div ref={loginModelRef} className="login-model-con">
      <button
        className="login-model-btn"
        onClick={() => {
          setIsModelOpen(true);
          setAnimation("fade-in");
        }}
      >
        <span>Log in</span>
        <LoginSVG />
      </button>

      {isModelOpen && (
        <div className={modelClass}>
          {/* header is split into each child for flip effect */}
          <div className={`card-con " ${isDemoUser ? " flip" : ""}`}>
            <RegularLogin
              setIsDemoUser={setIsDemoUser}
              handleModelClose={handleModelClose}
            />

            <DemoUserLogin setIsDemoUser={setIsDemoUser} />
          </div>
        </div>
      )}
    </div>
  );
}
