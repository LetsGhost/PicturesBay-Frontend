// src/stores/useSocketStore.ts
import { defineStore } from 'pinia';
import { io, Socket } from 'socket.io-client';

interface Room {
  roomName: string;
  users: Array<string>;
  remainingTime: number;
  oneMinuteTimer: number;
}

interface SocketState {
  socket: Socket | null;
  rooms: Array<Room>;
  currentRoom?: any;
}

export const useSocketStore = defineStore('socket', {
  state: (): SocketState => ({
    socket: null,
    rooms: [],
  }),
  actions: {
    connectSocket(token: string) {
      if (!this.socket) {
        this.socket = io(import.meta.env.VITE_API_URL_SOCKET, {
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.socket.on('connect', () => {
          console.log('Connected to socket.io server');
        });

        this.socket.on('roomsList', (data: Array<Room>) => {
          console.log('Received room list:', data);
          this.rooms = data;
        });

        this.socket.on('connect_error', (err: Error) => {
          console.error('Connection error:', err);
        });
      }
    },
    disconnectSocket() {
      if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
      }
    },
    joinRoom(roomName: string) {
      if (this.socket) {
        this.socket.emit('joinRoom', roomName);
        this.socket.on("room", (data: any) => {
          // Ensure no circular references
          this.currentRoom = data
        });
      }
    },
    leaveRoom(roomName: string) {
      if (this.socket) {
        this.socket.emit('leaveRoom', roomName);
      }
    },
  },
});