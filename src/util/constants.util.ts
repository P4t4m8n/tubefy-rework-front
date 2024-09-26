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
    
  },
  {
    username: "CaptainObvious",
    email: "CaptainObvious77@gmail.com",
    password: "Aa123456",
    
  },
  {
    username: "SirLaughsALot",
    email: "SirLaughsALot@gmail.com",
    password: "Aa123456",
    
  },
  {
    username: "PineappleOnPizza",
    email: "PineappleOnPizza@gmail.com",
    password: "Aa123456",
    
  },
  {
    username: "KeyboardWarrior",
    email: "KeyboardWarrior123@gmail.com",
    password: "Aa123456",
    
  },
];
