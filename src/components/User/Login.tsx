import { FormEvent, useRef, useState } from "react";
import { formDataToUserDTO, getLoginInputs } from "../../util/user.util";
import { useModel } from "../../hooks/useModel";
import { login, signup } from "../../store/actions/user.action";
import { LoginSVG } from "../svg/SVGs";
import { validateLogin, validateSignup } from "../../validations/auth";
import { TInputUserFormKeys } from "../../models/app.model";
import Loader from "../Loader";

export default function Login() {
  const loginModelRef = useRef<HTMLDivElement>(null);
  const [animation, setAnimation] = useState<"" | "fade-in" | "fade-out">("");
  const [isModelOpen, setIsModelOpen] = useModel(
    loginModelRef,
    handleModelClose
  );
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState<Map<TInputUserFormKeys, string>>(
    new Map<TInputUserFormKeys, string>()
  );
  const [isLoading, setIsLoading] = useState(false);

  //Improve later into a separate component
  const [isDemoUser, setIsDemoUser] = useState(false);
  const inputs = getLoginInputs(isLogin, errors);

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    try {
      ev.preventDefault();

      const form = ev.target as HTMLFormElement;
      const userDto = formDataToUserDTO(form);

      const errors = isLogin ? validateLogin(userDto) : validateSignup(userDto);
      setErrors(errors);
      if (errors.size) {
        return;
      }

      setIsLoading(true);

      isLogin ? await login(userDto) : await signup(userDto);
      handleModelClose();
    } catch (error) {
      if (error instanceof Error) {
        if (error.cause === 409) {
          const field = error.message.split(" ")[0].toLowerCase();
          setErrors(
            new Map<TInputUserFormKeys, string>([
              [field as TInputUserFormKeys, error.message],
            ])
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  function handleModelClose() {
    setAnimation("fade-out");
    setTimeout(() => {
      setIsModelOpen(false);
    }, 210);
  }

  const demoUsers = [
    { email: "test@test.com", password: "Aa123456" },
    { email: "bobo@bobo.com", password: "Aa123456" },
  ];

  const modelClass = `login-model ${animation}`;

  const isLoginText = !isLogin ? "Sign up to start listing" : "Login to Tubefy";

  const changeIsLoginBtn = !isLogin
    ? "Already a member? Login"
    : "Don't have an account? Sign Up";

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
          {!isDemoUser && (
            <>
              <form onSubmit={onSubmit}>
                {inputs.map((input) => (
                  <li key={input.name}>
                    <label htmlFor={input.name}>
                      <span>{input.label}</span>
                      {input.error && (
                        <>
                          <span className="error"> {"> "}</span>
                          <span className="error">{input.error}</span>
                        </>
                      )}
                    </label>
                    <input
                      className={input.error ? "error" : ""}
                      type={input.type}
                      placeholder={input.placeHolder}
                      name={input.name}
                    />
                  </li>
                ))}
                <div className="actions">
                  <button
                    disabled={isLoading}
                    type="button"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setIsLogin(!isLogin);
                    }}
                  >
                    <span>{changeIsLoginBtn}</span>
                  </button>

                  <button disabled={isLoading} type="submit">
                    {!isLoading ? (
                      <span>{!isLogin ? " Sign up" : "Sign in"}</span>
                    ) : (
                      <Loader />
                    )}
                  </button>
                </div>
              </form>
              <h2>{isLoginText}</h2>
            </>
          )}
          {isDemoUser && (
            <>
              <button onClick={async () => login(demoUsers[0])}>test</button>
              <button onClick={async () => login(demoUsers[1])}>bobo</button>
            </>
          )}
          <button onClick={() => setIsDemoUser(!isDemoUser)}>
            {isDemoUser ? "Login" : "Demo Users"}
          </button>
        </div>
      )}
    </div>
  );
}
