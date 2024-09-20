<template>

    <header class="header">
      <h1>Auction Room1</h1>
      <button @click="goBack" class="back-button">Back</button>
    </header>
    <div class="container" v-if="room">
      <div class="main-content">
        <div class="frame">
          <h1 class="title">Item Title</h1>
          <img src="../assets/Mona_Lisa.jpg" alt="Item Image" class="image"/>
        </div>
        <div class="pricing">
          <p class="price">Starting Price: $100</p>
          <p class="current-bet">Current Bet: $150</p>
        </div>
        <div class="betting">
          <input type="number" placeholder="Enter your bet" class="bet-input"/>
          <button class="bet-button">Place Bet</button>
        </div>
      </div>
      <div class="info-container">
        <h2>Painting Info</h2>
        <p><strong>Painter:</strong> {{ room }}</p>
        <p><strong>Publishing Year:</strong> 2024</p>
        <p><strong>Level:</strong> Common</p>
        <p><strong>Description:</strong> This is a beautiful painting that captures the essence of modern art.</p>
      </div>
      <div class="timers">
      <h2>Timers</h2>
      <p><strong>Room Timer:</strong> {{ formatTime(room.remainingTime) }} seconds</p>
      <p><strong>One-Minute Timer:</strong> {{ formatTime(room.oneMinuteTimer) }} seconds</p>
    </div>
    </div>
  </template>
  
  <script lang="ts">
import { defineComponent, computed, ref, onMounted, onUnmounted } from 'vue';
import { useSocketStore } from '../stores/useSocketStore';
import { useRouter } from 'vue-router';


  export default defineComponent ({
    setup() {
      const socketStore = useSocketStore();
      const token = localStorage.getItem('token');
      const router = useRouter();
      if (token) {
        socketStore.connectSocket(token);
      }

      const room = computed(() => socketStore.currentRoom);
      const currentPaintingIndex = ref(0);

      const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}m ${remainingSeconds}s`;
      };

      const updateRemainingTime = () => {
      if (room.value && room.value.remainingTime > 0) {
        room.value.remainingTime -= 1;
      }
      if (room.value && room.value.oneMinuteTimer > 0) {
        room.value.oneMinuteTimer -= 1;
      }
    };

    const handleMinuteTimerEnd = () => {
      if (room.value && room.value.paintings.length > 0) {
        currentPaintingIndex.value = (currentPaintingIndex.value + 1) % room.value.paintings.length;
      }
    };

    let timer: number;
    onMounted(() => {
      timer = window.setInterval(updateRemainingTime, 1000);
      if (socketStore.socket) {
        socketStore.socket.on('minuteTimerEnd', handleMinuteTimerEnd);
      }
    });

    onUnmounted(() => {
      clearInterval(timer);
      if (socketStore.socket) {
        socketStore.socket.off('minuteTimerEnd', handleMinuteTimerEnd);
      }
    });

      const goBack = () => {
        router.push('/homepage');
      }

      return {
        goBack,
        room,
        formatTime,
      }
    }
  })

  </script>
  
  <style scoped lang="scss">
  body, html {
    background-color: #2A2D34;
  }
  
  .header {
    background-color: #2A2D34;
    color: white;
    padding: 20px;
    text-align: center;
    box-sizing: border-box;
  }
  
  .container {
    margin-top: 0px;
    display: grid;
    grid-template-columns: 2fr 1fr; /* Adjust ratio as needed */
    gap: 20px;
    align-items: start;
    height: 100%; /* Adjust based on header height */
    padding: 20px;
    box-sizing: border-box;

  }
  
  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .frame {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    max-width: 600px;
    width: 100%;
  }
  
  .title {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 10px;
  }
  
  .image {
    max-width: 50%;
    height: auto;
    border-radius: 8px;
  }
  
  .pricing {
    margin-bottom: 20px;
  }
  
  .price, .current-bet {
    font-size: 1.2rem;
    color: #555;
  }
  
  .betting {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .bet-input {
    margin-bottom: 10px;
    padding: 10px;
    width: 100%;
    max-width: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .bet-button {
    padding: 10px 20px;
    background-color: #5C6B73;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }
  
  .bet-button:hover {
    background-color: #4a5a63;
  }
  
  .info-container {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 300px; /* Fixed width for info container */
  }
  
  .info-container h2 {
    font-size: 1.25rem;
    color: #333;
    margin-bottom: 10px;
  }
  
  .info-container p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 10px;
  }
  
  .info-container p strong {
    color: #333;
  }

  .timers {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 300px; /* Fixed width for info container */
    color: black;
  }
  </style>
  