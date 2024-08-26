
//Interfaces
export interface ISocketService {
  connect(): void;
  disconnect(): void;
  on<T>(evName: TSocketEvent, listener: TListener<T>): void;
  off<T>(evName: TSocketEvent, listener: TListener<T>): void;
  emit<T>(evName: TSocketEvent, data: T): void;
  terminate(): void;
}

//Types
export type TListener<T> = (data: T) => void;
export type TSocketEvent =
  | "connect"
  | "disconnect"
  | "message"
  | "error"
  | "sharePlaylist";
