import { TInputUserFormKeys } from "../models/app.model";

export const searchGenres = [
  "Latino",
  "Party",
  "K-pop",
  "Soul",
  "Rock",
  "Reggae",
  "Rap",
  "Punk",
  "Pop",
  "Metal",
  "Meditation",
  "Live",
  "Jazz",
  "indie",
  "Sleep",
  "Electronic",
  "Country",
  "Classical",
  "Chill",
  "Blues",
  "90s",
];

export const loginInputs: {
  type: "text" | "password" | "email";
  placeHolder: string;
  name: TInputUserFormKeys;
  label: string;
  error?: string;
}[] = [
  {
    type: "text",
    placeHolder: "Username",
    name: "username",
    label: "Username",
  },
  {
    type: "text",
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

export const profileLinks = ["profile", "friends", "notifications"];
export const profileEditKeys = ["Username", "Email"];

export const REGULAR_SONG_MENU_SIZE = { width: 208, height: 92 };
export const WITH_REMOVE_SONG_MENU_SIZE = { width: 208, height: 132 };

export const DEMO_USERS = [
  {
    username: "NachoUsername",
    email: "NachoUsername@gmail.com",
    password: "Aa123456",
    imgUrl:
      "https://res.cloudinary.com/dpnevk8db/image/upload/q_auto,w_auto/v1727205327/brandon-zacharias-ITo4f_z3wNM-unsplash_zf58hf.jpg",
  },
  {
    username: "CaptainObvious",
    email: "CaptainObvious77@gmail.com",
    password: "Aa123456",
    imgUrl:
      "https://res.cloudinary.com/dpnevk8db/image/upload/q_auto,w_auto/v1727205327/alex-suprun-bYODySpLIhE-unsplash_hwqc6q.jpg",
  },
  {
    username: "SirLaughsALot",
    email: "SirLaughsALot@gmail.com",
    password: "Aa123456",
    imgUrl:
      "https://res.cloudinary.com/dpnevk8db/image/upload/q_auto,w_auto/v1727205327/igor-karimov-lPLqDlnhxbE-unsplash_hfnaer.jpg",
  },
  {
    username: "PineappleOnPizza",
    email: "PineappleOnPizza@gmail.com",
    password: "Aa123456",
    imgUrl:
      "https://res.cloudinary.com/dpnevk8db/image/upload/q_auto,w_auto/v1727205326/ruan-richard-rodrigues-6MHDW3_0RRI-unsplash_rd5bna.jpg",
  },
  {
    username: "KeyboardWarrior",
    email: "KeyboardWarrior123@gmail.com",
    password: "Aa123456",
    imgUrl:
      "https://res.cloudinary.com/dpnevk8db/image/upload/q_auto,w_auto/v1727205326/vadim-bogulov-rdHrrFA1KKg-unsplash_oe9wjy.jpg",
  },
];
