import { FormEvent, useRef, useState } from "react";
import { getLoginInputs } from "../../util/user.util";
import { useModel } from "../../hooks/useModel";
import { login, signup } from "../../store/actions/user.action";
import { LoginSVG } from "../svg/SVGs";

export default function Login() {
  const loginModelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(loginModelRef);
  const [isLogin, setIsLogin] = useState(true);

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const form = ev.target as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    isLogin
      ? login({ email, password })
      : signup({ email, password, username });
  };

  const inputs = getLoginInputs(isLogin);

  return (
    <div ref={loginModelRef} className="login-model-con">
      <button
        className="login-model-btn"
        onClick={() => {
          setIsModelOpen(true);
        }}
      >
        <span>Log in</span>
        <LoginSVG />
      </button>
      {isModelOpen && (
        <div
          className="login-model"
          style={{ display: isModelOpen ? "block" : "none" }}
        >
          <h2>{!isLogin ? "Sign up to start listing" : "Login to Tubefy"}</h2>
          <form onSubmit={onSubmit}>
            {inputs.map((input, idx) => (
              <li key={idx}>
                <label htmlFor={input.name}>{input.label}</label>
                <input
                  type={input.type}
                  placeholder={input.placeHolder}
                  name={input.name}
                />
              </li>
            ))}
            <div className="actions">
              <button
                onClick={(ev) => {
                  ev.preventDefault();
                  setIsLogin(!isLogin);
                }}
              >
                <span>
                  {!isLogin
                    ? "Already a member? Login"
                    : "Don't have an account? Sign Up"}
                </span>
              </button>
              <button type="submit">
                <span>{!isLogin ? " Sign up" : "Sign in"}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
