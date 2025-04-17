<template>
  <div>
    <ul v-if="offers.length">
      <li v-for="offer in offers" :key="offer.id" class="offer-item">
        <p class="destination">{{ offer.slices[0].destination.city_name }}</p>
        <div>
          <p class="zone">{{ offer.slices[0].destination_type }}</p>
          <p class="discount">{{ offer.conditions.change_before_departure.penalty_amount || 'No discount' }}</p>
        </div>
        <p class="rate-class">{{ offer.slices[0].fare_brand_name }}</p>
        <div>
          <p class="category">{{ offer.slices[0].segments[0].cabin.marketing_name }}</p>
          <p class="board-name">{{ offer.slices[0].segments[0].cabin.name }}</p>
        </div>
        <div>
          <p class="rate">{{ offer.total_amount }} {{ offer.total_currency }}</p>
          <button class="select-button" @click="selectOffer(offer)">Select</button>
        </div>
      </li>
    </ul>
    <div v-else>
      <p>No offers available.</p>
    </div>
    <div v-if="isModalOpen" class="select-modal">
      <p class="total-emissions">Emissions: {{ selectedOffer.total_emissions_kg }} kg</p>
      <p class="destination-type">Tax Amount: {{ selectedOffer.tax_amount }} {{ selectedOffer.tax_currency }}</p>
      <p class="corporate-code">Code: {{ selectedOffer.id }}</p>
      <button @click="closeModal">Close</button>
    </div>
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['offers', 'error'],
  data() {
    return {
      isModalOpen: false,
      selectedOffer: null
    };
  },
  methods: {
    selectOffer(offer) {
      this.selectedOffer = offer;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedOffer = null;
    }
  }
};
</script>

<style scoped>
.offer-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
.select-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.error {
  color: red;
  margin-top: 20px;
}
</style>