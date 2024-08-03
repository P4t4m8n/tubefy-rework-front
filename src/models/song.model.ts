export interface ISong {
  id: string;
  name: string;
  artist: string;
  duration: number;
  youtubeId: string;
  imgUrl: string;
  addedBy: string;
  createAt: Date;
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
