<template>
  <div>
  <div class="page-title">
    <h3>Категории</h3>
  </div>
  <section>
    <Loader v-if="loading"/>
    <div class="row" v-else>
      <CategoryCreate @created="addNewCategory"/>
      <CategoryEdit v-if="categories.length" :categories="categories" @updated="updateCategories" :key="categories.length + updateCount"/>
      <p v-else class="center">Категорий пока нет</p>
    </div>
  </section>
</div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
import localizeFilter from '@/filters/localize.filter'


export default {
  name: 'categories',
  metaInfo() {
    return {
      title: localizeFilter('Categories')
    }
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  components: {
    CategoryCreate,
    CategoryEdit
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  }
}
</script>

<style>

</style>