<template>
    <div class="container">
        <div class="frame">
            <h1 class="title">Item Title</h1>
            <img src="" alt="Item Image" class="image"/>
        </div>
        <div class="pricing">
            <p>Starting Price: $100</p>
            <p>Current Bet: $150</p>
        </div>
        <div class="betting">
            <input type="number" placeholder="Enter your bet" class="bet-input"/>
            <button class="bet-button">Place Bet</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AuctionItem'
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
}

.frame {
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
}

.image {
    width: 100%;
    height: auto;
}

.pricing {
    margin-bottom: 20px;
}

.betting {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.bet-input {
    margin-bottom: 10px;
    padding: 5px;
}

.bet-button {
    padding: 5px 10px;
}
</style>