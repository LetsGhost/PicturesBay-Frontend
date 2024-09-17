<template>
  <header class="header">
      <h1>PicturesBay.de</h1>
      <div class="profile-icon">
        <img src="" alt="Profile Icon">
      </div>
      <button class="burger-button" @click="toggleMenu">☰</button>
    </header>
  <div id="app" class="container">
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
import { defineComponent, computed, ref } from 'vue';
import { useSocketStore } from '../stores/useSocketStore';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Homepage',
  setup() {
    const isMenuOpen = ref(false);
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

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    return {
      rooms,
      joinRoom,
      formatTime,
      toggleMenu,
      isMenuOpen,
    };
  },
});
</script>
  
<style scoped>
html, body {
  position: relative;
  overflow-x: hidden;
}

/* Container Styling */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: calc(100vh - 60px); /* Adjust based on header height */
  padding: 20px;
  align-items: flex-start; /* Align items to the start */
  overflow: hidden;
}

/* Header Styling */
.header {
  display: flex;
  justify-content: space-between;
  width: auto;
  align-items: center;
  padding: 10px;
  background-color: #93A2A3;
  height: 60px; /* Adjust as needed */
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

.burger-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white;
}

/* Menu Styling */
.menu {
  position: absolute;
  top: 60px; /* Adjust based on header height */
  right: 0;
  width: 250px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  transform: translateX(100%); /* Initially hidden off-screen */
  transition: transform 0.3s ease, opacity 0.3s ease; /* Smooth transition */
  opacity: 0; /* Initially invisible */
}

.menu-open {
  transform: translateX(0); /* Slide in from the right */
  opacity: 1; /* Make visible */
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  margin: 10px 0;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  margin: 10px 0;
}

.menu a {
  text-decoration: none;
  color: #333;
}

/* Grid Styling */
.grid {
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  margin-top: 20px;
  justify-content: center; /* Center the grid items horizontally */
  flex-wrap: wrap; /* Allow items to wrap to the next row */
  overflow: hidden;
}

.room {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px; /* Adjust padding to make rooms smaller */
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  width: 200px; /* Set a fixed width for the rooms */
  height: 200px; /* Set a fixed height for the rooms */
}

.room:hover {
  background-color: #93A2A3;
  color: #5C6B73;
}
</style>