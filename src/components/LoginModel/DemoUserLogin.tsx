import { SetStateAction, useState } from "react";
import { DEMO_USERS } from "../../util/constants.util";
import { login } from "../../store/actions/user.action";

interface Props {
  setIsDemoUser: (isDemoUser: SetStateAction<boolean>) => void;
}

export default function DemoUserLogin({ setIsDemoUser }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="demo-user-login">
      <header>
        <h2>Demo Users</h2>
        <button onClick={() => setIsDemoUser((prev) => !prev)}>
          Regular Login
        </button>
      </header>
      <div>
        <div>
          <p>
            Click on a user to login with their account. You can test the app
            features without creating an account.
          </p>
        </div>
        <div>
          {DEMO_USERS.map((user) => (
            <button
              disabled={isLoading}
              key={user.username}
              onClick={async () => {
                setIsLoading(true);
                await login(user);
                setIsLoading(false);
              }}
            >
              <img
                width="80"
                height="80"
                decoding="async"
                src={user.imgUrl}
                alt={"demo user "}
           
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
