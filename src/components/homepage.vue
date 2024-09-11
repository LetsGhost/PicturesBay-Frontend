<template>
    <div id="app" class="container">
      <header class="header">
        <h1>PicturesBay.de</h1>
        <div class="profile-icon">
          <img src="" alt="Profile Icon">
        </div>
      </header>
      <div class="grid">
        <div class="room" v-for="(room, index) in rooms" :key="index">
          <img v-if="index === 0" src="" alt="Room Image">
          <p>Room is open since:</p>
          <p class="time">{{ room.time }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        rooms: [
          { time: "4:37" },
          { time: "4:37" },
          { time: "4:37" },
          { time: "4:37" },
          { time: "4:37" },
        ],
      };
    },
  };
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
  