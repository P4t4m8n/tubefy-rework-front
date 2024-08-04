import { FormEvent, useRef, useState } from "react";

export default function Login() {
  const loginModelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    // isLogin ? login() : signup();
  };

  const inputs: {
    type: "text" | "password" | "email";
    placeHolder: string;
    name: string;
    label: string;
  }[] = [
    {
      type: "text",
      placeHolder: "Username",
      name: "username",
      label: "Username",
    },
    {
      type: "email",
      placeHolder: "Email",
      name: "email",
      label: "Email",
    },
    {
      type: "password",
      placeHolder: "Password",
      name: "password",
      label: "Password",
    },
  ];
  return (
    <>
      <button className="login-model-btn" onClick={() => setIsModelOpen(true)}>Log in</button>
      {isModelOpen && (
        <div
          ref={loginModelRef}
          className="login-model"
          style={{ display: isModelOpen ? "block" : "none" }}
        >
          <h2>{!isLogin ? "Sign up to start listing" : "Login to Tubefy"}</h2>
          <form onSubmit={onSubmit}>
            {inputs.map((input) => (
              <>
                <label htmlFor={input.name}>{input.label}</label>
                <input
                  type={input.type}
                  placeholder={input.placeHolder}
                  name={input.name}
                />
              </>
            ))}
            <button type="submit">{!isLogin ? " Sign up" : "Sign in"}</button>
          </form>
          <button onClick={() => setIsLogin(!isLogin)}>
            {!isLogin
              ? "Already a member? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      )}
    </>
  );
}
