import { IYouTubePlayer } from "../models/player.model";

export class YouTubePlayer {
  #player: IYouTubePlayer | null = null;

  setPlayer(player: IYouTubePlayer) {
    this.#player = player;
  }

  setVolume(volume: number) {
    this.player?.setVolume(volume);
  }

  playVideo() {
    this.player?.playVideo();
  }

  pauseVideo() {
    this.player?.pauseVideo();
  }

  get volume() {
    return this.player?.getVolume();
  }

  get player() {
    return this.#player;
  }

  getVolume() {
    return this.player?.getVolume() ?? 0;
  }

  getCurrentTime(): number {
    return this.player?.getCurrentTime() || 50;
  }

  getDuration(): number {
    return this.player?.getDuration() || 0;
  }

  seekTo(time: number) {
    this.player?.seekTo(time);
  }

  isPlayerReady() {
    return this.player !== null;
  }
}

export const youTubePlayer = new YouTubePlayer();
