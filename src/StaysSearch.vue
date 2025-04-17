<template>
  <div>
    <div class="search-area">
      <div class="search">
        <input v-model="place" placeholder="Place" class="placeName" />
        <input v-model="checkIn" class="checkIn" type="date" />
        <input v-model="checkOut" class="checkOut" type="date" />
        <input v-model.number="adults" placeholder="Adults" class="adults" type="number" min="1" />
        <input v-model.number="children" placeholder="Children" class="children" type="number" min="0" />
        <button class="search-button" @click="searchStays">Search</button>
      </div>
    </div>
    <StaysResults :offers="offers" :error="error" />
  </div>
</template>

<script>
import axios from 'axios';
import StaysResults from './StaysResults.vue';

export default {
  components: { StaysResults },
  data() {
    return {
      place: '',
      checkIn: '',
      checkOut: '',
      adults: 1,
      children: 0,
      offers: [],
      error: null
    };
  },
  methods: {
    async searchStays() {
      if (!this.place || !this.checkIn || !this.checkOut) {
        this.error = 'Please fill in all required fields.';
        return;
      }
      const requestBody = {
        data: {
          slices: [{
            origin: this.place,
            destination: this.place,
            departure_date: this.checkIn,
            arrival_time: { from: '00:00', to: '23:59' },
            departure_time: { from: '00:00', to: '23:59' }
          }],
          passengers: [{
            type: 'adult',
            age: this.adults
          }, {
            type: 'child',
            age: this.children
          }],
          max_connections: 1,
          cabin_class: 'economy'
        }
      };
      try {
        const response = await axios.post('http://localhost:5000/duffel-flights-list-offers', requestBody);
        this.offers = response.data.data.offers;
        this.error = null;
      } catch (error) {
        this.error = error.response ? error.response.data : 'An error occurred while fetching offers.';
      }
    }
  }
};
</script>

<style scoped>
.search-area {
  margin: 20px;
}
.search {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.search-button {
  width: 100px;
  align-self: flex-start;
}
</style>