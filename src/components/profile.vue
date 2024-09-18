<template>
  <div class="profile-page">
    <header class="header">
      <h1>Profile</h1>
    </header>
    <div class="profile-info">
      <div class="profile-image">
        <img src="../assets/Mona_Lisa.jpg" alt="User Profile Image" />
      </div>
      <div class="profile-details">
        <h2>John Doe</h2>
        <p class="balance">Balance: $500</p>
      </div>
    </div>
    <div class="inventory">
      <h2>Your Inventory</h2>
      <div class="image-grid">
        <div class="image-card" v-for="(image, index) in images" :key="index" @click="viewImage(image)">
          <img :src="image.src" alt="Collected Image" class="card-image" />
          <div class="card-info">
            <p class="card-title">{{ image.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      images: [
        { src: '../assets/Mona_Lisa.jpg', title: 'Painting 1' },
        { src: '../assets/Mona_Lisa.jpg', title: 'Painting 2' },
        // Add more images as needed
      ]
    };
  },
  methods: {
    viewImage(image) {
      // Handle viewing the image details
      console.log('Viewing image:', image);
    }
  }
};
</script>

<style scoped lang="scss">
.profile-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  background-color: #2A2D34;
  color: white;
  padding: 20px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 800px;
}

.profile-image img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #ddd;
}

.profile-details {
  margin-top: 10px;
  text-align: center;
}

.profile-details h2 {
  margin: 10px 0;
  color: #333;
}

.balance {
  font-size: 1.2rem;
  color: #5C6B73;
}

.inventory {
  width: 80%;
  max-width: 800px;
  margin: 20px;
}

.inventory h2 {
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.image-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
  max-width: 200px;
}

.image-card:hover {
  transform: scale(1.05);
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.card-info {
  margin-top: 10px;
  text-align: center;
}

.card-title {
  font-size: 1rem;
  color: #555;
}
</style>
