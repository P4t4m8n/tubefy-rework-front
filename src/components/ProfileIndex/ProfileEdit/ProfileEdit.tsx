import { ChangeEvent, FormEvent, useState } from "react";

import { useAppSelector } from "../../../hooks/useStore";
import { IUser } from "../../../models/user.model";
import { setImgForBackground } from "../../../store/actions/imgGradient.action";
import { profileEditKeys } from "../../../util/constants.util";
import { UserIconSVG } from "../../svg/SVGs";

import PlaylistEditHeroImg from "../../PlaylistEdit/PlaylistEditHero/ImageUploadContainer";
import { formDataToUserDTO } from "../../../util/user.util";
import { updateUser } from "../../../store/actions/user.action";
import { useEffectUpdate } from "../../../hooks/useEffectUpdate";
import { uploadImg } from "../../../services/imgUpload.service";

export default function ProfileEdit() {
  const user = useAppSelector((state) => state.user.user);
  const [isEdit, setIsEdit] = useState(false);
  const [imgPreview, setImgPreview] = useState<string | undefined>(
    user?.imgUrl
  );

  useEffectUpdate(() => {
    setImgForBackground(imgPreview || "/grey.jpeg");
  }, [imgPreview]);

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    console.log("ev.target:", ev.target);

    const userDto = formDataToUserDTO(form);
    if (userDto.imgData) {
      userDto.imgUrl = await uploadImg(userDto.imgData);
      delete userDto.imgData;
    }
    await updateUser({ ...user, ...userDto });
  };

  const handleImagePreview = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!ev.target.files || !ev.target.files[0]) return;
    const file = ev.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    setImgPreview(imgUrl);
  };

  return (
    <>
      {!isEdit ? (
        <div className="user-edit">
          <div className="avatar-con">
            {imgPreview ? (
              <img src={imgPreview} alt="profile" />
            ) : (
              <UserIconSVG />
            )}
          </div>
          <ul className="user-details">
            {profileEditKeys.map((key) => (
              <li className="profile-details-row" key={key}>
                <h3 className="user-details-key">{key}</h3>
                <p className="user-details-info">
                  {user?.[key.toLowerCase() as keyof IUser]}
                </p>
              </li>
            ))}
            <button className="btn-right" onClick={() => setIsEdit(!isEdit)}>
              <span>Edit</span>
            </button>
          </ul>
        </div>
      ) : (
        <form className="user-edit" onSubmit={onSubmit}>
          <PlaylistEditHeroImg
            imgUrl={imgPreview}
            svg={<UserIconSVG />}
            onUploadImg={handleImagePreview}
            name={user?.username || ""}
          />
          <ul className="user-details">
            {profileEditKeys.map((key) => (
              <li className="profile-edit-row" key={key}>
                <label className="user-edit-key" htmlFor={key}>
                  {key}
                </label>
                <input
                  className="user-edit-info"
                  type={key === "Username" ? "text" : key.toLowerCase()}
                  id={key}
                  name={key.toLowerCase()}
                  defaultValue={
                    user?.[key.toLowerCase() as keyof IUser] as string | number
                  }
                />
              </li>
            ))}
            <div className="actions">
              <button type="button" onClick={() => setIsEdit(!isEdit)}>
                <span>Cancel</span>
              </button>
              <button type="submit" className="save-btn">
                <span>Save</span>
              </button>
            </div>
          </ul>
        </form>
      )}
    </>
  );
}
