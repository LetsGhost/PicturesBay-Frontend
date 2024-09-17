<template>
  <div id="app" class="container">
    <header class="header">
      <h1>PicturesBay.de</h1>
      <div class="profile-icon">
        <img src="" alt="Profile Icon">
      </div>
    </header>
    <div class="grid">
      <div class="room" v-for="(room, index) in rooms" :key="index" @click="joinRoom(room.roomName)">
        <p>{{ room.roomName }}</p>
        <p>Room closes in:</p>
        <p class="time">{{ formatTime(room.remainingTime) }}</p>
      </div>
    </div>
  </div>
</template>

  
  <script lang="ts">
import { defineComponent, computed } from 'vue';
import { useSocketStore } from '../stores/useSocketStore';
import { useRouter } from 'vue-router';

interface Room {
  roomName: string;
  users: Array<string>;
  remainingTime: number;
}

export default defineComponent({
  setup() {
    const socketStore = useSocketStore();
    const token = localStorage.getItem('token');
    const router = useRouter();
    if (token) {
      socketStore.connectSocket(token);
    }

    const rooms = computed(() => socketStore.rooms);

    const formatTime = (seconds: number): string => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}m ${remainingSeconds}s`;
    };

    const joinRoom = (roomName: string) => {
      socketStore.joinRoom(roomName);
      router.push({ name: 'Room', params: { roomName } });
    };

    return {
      rooms,
      joinRoom,
      formatTime,
    };
  },
});
</script>
  
  <style scoped>
  /* Container Styling */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #81909e;
    height: 100vh;
    padding: 20px;
  }
  
  /* Header Styling */
  .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding: 10px;
  }
  
  .header h1 {
    color: white;
    font-family: Arial, sans-serif;
  }
  
  .profile-icon img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
  }
  
  /* Grid Styling */
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    margin-top: 20px;
  }
  
  .room {
    background-color: #a4b2bf;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    height: 200px;
    cursor: pointer;
  }

  .room:hover {
    background-color: #81909e;
  }
  
  .room img {
    width: 100px;
    height: auto;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  
  .room p {
    color: white;
    font-family: Arial, sans-serif;
  }
  
  .time {
    font-size: 24px;
    color: #f48b32;
  }
  </style>
  