import { ISong } from "../models/song.model";

const getDefaultSong = (): ISong => {
  return {
    id: "1",
    name: "Sheena Is A Punk Rocker (Official Music Video)",
    artist: "Ramones",
    duration: 176,
    youtubeId: "yCW7Aw8ugOI",
    imgUrl: "https://i.ytimg.com/vi/yCW7Aw8ugOI/mqdefault.jpg",
    addedBy: "artist",
    createAt: new Date(1705347571892),
    isLikedByUser: false,
  };
};

export const songService = {
  getDefaultSong,
};
