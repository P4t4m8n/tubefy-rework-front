export interface ISong {
  id: string;
  name: string;
  artist: string;
  duration: number;
  youtubeId: string;
  imgUrl: string;
  addedBy: string;
  createAt: Date;
  likedBy: number;
  isLikedByUser?: boolean;
}

export interface ISongDTO {
  name: string;
  artist: string;
  duration: number;
  youtubeId: string;
  imgUrl: string;
  addedBy: string;
  createAt: Date;
  likedBy: number;
}

export interface ISongYT {
  name: string;
  artist: string;
  duration: string;
  youtubeId: string;
  imgUrl: string;
  addedBy: string;
  createAt: Date;
}
