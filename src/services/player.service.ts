import { IYouTubePlayer } from "../models/player.model";

export class YouTubePlayer {
  private player: IYouTubePlayer | null = null;

  setPlayer(player: IYouTubePlayer) {
    this.player = player;
  }

  getVolume() {
    return this.player?.getVolume() ?? 0;
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

  getCurrentTime(): number {
    return this.player?.getCurrentTime() ||50;
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
