import { FormEvent, SetStateAction, useState } from "react";
import { formDataToUserDTO, getLoginInputs } from "../../util/user.util";
import { TInputUserFormKeys } from "../../models/app.model";
import { validateLogin, validateSignup } from "../../validations/auth";
import { login, signup } from "../../store/actions/user.action";
import Loader from "../Loader";

interface Props {
  handleModelClose: () => void;
  setIsDemoUser: (isDemoUser: SetStateAction<boolean>) => void;
}

export default function RegularLogin({
  handleModelClose,
  setIsDemoUser,
}: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState<Map<TInputUserFormKeys, string>>(
    new Map<TInputUserFormKeys, string>()
  );
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitForm = async (ev: FormEvent<HTMLFormElement>) => {
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

  const inputs = getLoginInputs(isLogin, errors);
  const text = !isLogin
    ? {
        headerText: "Sign up to start listing",
        changeIsLoginBtn: "Already a member? Login",
      }
    : {
        headerText: "Login to Tubefy",
        changeIsLoginBtn: "Don't have an account? Sign Up",
      };

  return (
    <div className="regular-login">
      <header>
        <h2>{text.headerText}</h2>
        <button onClick={() => setIsDemoUser((prev) => !prev)}>
          Demo Users
        </button>
      </header>

      <form onSubmit={onSubmitForm}>
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
            <span>{text.changeIsLoginBtn}</span>
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
    </div>
  );
}
