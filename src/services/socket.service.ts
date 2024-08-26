import { io, Socket } from "socket.io-client";
import { TListener, TSocketEvent } from "../models/socket.model";

export class SocketService {
  private socket: Socket | null = null;

  constructor() {
    this.connect();
  }

  connect() {
    this.socket = io("http://localhost:3030", { withCredentials: true });
  }

  disconnect() {
    this.socket?.disconnect();
  }

  get(){
    return this.socket?.id;
  }

  on<T>(evName: TSocketEvent, listener: TListener<T>) {
    this.socket?.on(evName, listener);
  }

  off<T>(evName: TSocketEvent, listener: TListener<T>) {
    if (!listener) {
      this.socket?.removeAllListeners(evName);
      return;
    }
    this.socket?.off(evName, listener);
  }

  emit<T>(evName: TSocketEvent, data: T) {
    this.socket?.emit(evName, data);
  }

  terminate() {
    this.socket = null;
  }
}

export const socketService = new SocketService();
