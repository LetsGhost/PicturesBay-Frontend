<template>
  <header class="header">
    <h1>PicturesBay.de</h1>
    <button class="burger-button" @click="toggleMenu">☰</button>
  </header>

  <nav class="menu" :class="{ 'menu-open': isMenuOpen }">
    <ul>
      <li><a href="#" @click="">Profile</a></li>
      <li><a href="#" @click="">Settings</a></li>
      <li><a href="#" @click="logout()">Logout</a></li>
    </ul>
  </nav>

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

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.setItem("loggedIn", "false");
      router.push({ name: 'Login' });
    };

    return {
      rooms,
      joinRoom,
      formatTime,
      toggleMenu,
      isMenuOpen,
      logout,
    };
  },
});
</script>

<style lang="scss">
html, body {
  position: relative;
  margin: 0;
  overflow-x: hidden;
  font-family: 'Arial', sans-serif;
  background-color: #fff;
  height: 100%;
}

/* Header Styling */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #2A2D34;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header h1 {
  font-size: 1.8rem;
}

.profile-icon img {
  width: 45px;
  height: 45px;
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
  position: fixed;
  top: 100px;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: #fff;
  border-left: 1px;
  padding: 20px;
  transform: translateX(100%);
  transition: transform 0.3s ease, opacity 0.3s ease;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  background-color: #2A2D34;
}

.menu-open {
  transform: translateX(0);
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  margin: 20px 0;
}

.menu a {
  text-decoration: none;
  color: #5C6B73;
  font-size: 1rem;
}

.menu a:hover {
  color: white;
}

/* Container Styling */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 20px;
  margin-top: 80px; /* Added margin to adjust for header */
  flex-wrap: wrap;
  gap: 30px;
}

/* Grid and Room Styling */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
}

.room {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #93A2A3;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.room:hover {
  background-color: #2A2D34;
  color: white;
}

.room p {
  margin: 5px 0;
  color: #5C6B73;
}

</style>
