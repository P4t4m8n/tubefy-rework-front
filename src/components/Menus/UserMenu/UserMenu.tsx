import { MouseEvent, useRef } from "react";
import { IModelItem } from "../../../models/app.model";
import { logout } from "../../../store/actions/user.action";
import { LogoutSVG, UserIconSVG } from "../../svg/SVGs";
import { useModel } from "../../../hooks/useModel";
import GenericBtn from "../../GenericComponents/GenericBtn";
import { NavigateFunction } from "react-router-dom";

interface Props {
  imgUrl: string;
  username: string;
  navigate: NavigateFunction;
}

export default function UserMenu({ imgUrl, username, navigate }: Props) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);
  const items: IModelItem[] = [
    {
      text: "Profile",
      btnSvg: <UserIconSVG />,
      onClick: (ev?: MouseEvent) => {
        ev?.preventDefault();
        navigate("/profile");
        setIsModelOpen(false);
      },
    },
    {
      btnSvg: <LogoutSVG />,
      text: "Logout",
      onClick:async (ev?: MouseEvent) => {
        ev?.preventDefault();
        await logout();
        setIsModelOpen(false);
      },
    },
  ];
  return (
    <div ref={modelRef} className="user-model-con">
      <GenericBtn
        className="user-model-btn"
        imgUrl={imgUrl}
        onModelBtnClick={() => setIsModelOpen((prev) => !prev)}
      />
      {isModelOpen && (
        <ul className={"user-model"}>
          <li className="user-model-hello">
            <h2>
              Hello
              <span>{username}</span>
            </h2>
          </li>
          {items.map((item, idx) => (
            <li className={"user-model-item"} key={idx}>
              <GenericBtn
                btnSvg={item.btnSvg!}
                text={item.text}
                onModelBtnClick={item.onClick!}
                className={"user-model-item-btn"}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
