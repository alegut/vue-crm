<template>
  <div>
  <div class="page-title">
    <h3>Счет</h3>

    <button class="btn waves-effect waves-light btn-small" @click="refresh">
      <i class="material-icons">refresh</i>
    </button>
  </div>

  <Loader v-if="loading"/>

  <div class="row" v-else>
    <HomeBill :rates="currency.rates"/>
    <HomeCurrency :rates="currency.rates" :date="currency.date"/>
  </div>
</div>
</template>

<script>
import HomeBill from '@/components/HomeBill';
import HomeCurrency from '@/components/HomeCurrency';
import localizeFilter from '@/filters/localize.filter'


export default {
  name: 'home',
  metaInfo() {
    return {
      title: localizeFilter('Home')
    }
  },
  data: () => ({
    loading: true,
    currency: null,
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false;
  },
  components: {
    HomeBill,
    HomeCurrency
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    }
  }  
}
</script>
