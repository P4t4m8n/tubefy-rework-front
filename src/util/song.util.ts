import { ISong } from "../models/song.model";

export const getDefaultSong = (): ISong => {
  return {
    id: "1",
    name: "Sheena Is A Punk Rocker (Official Music Video)",
    artist: "Ramones",
    duration: "02:16",
    youtubeId: "yCW7Aw8ugOI",
    imgUrl: "https://i.ytimg.com/vi/yCW7Aw8ugOI/mqdefault.jpg",
    addedBy: {
      id: "1",
      username: "Ramones",
      imgUrl: "https://i.ytimg.com/vi/yCW7Aw8ugOI/mqdefault.jpg",
      isAdmin: false,
    },
    addedAt: new Date(1705347571892).toString(),
    isLikedByUser: false,
    genres: ["punk"],
    itemType: "song",
  };
};
