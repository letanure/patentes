<template>
  <div class="InventorsFilter">
    <el-select
      @change="change"
      filterable
      multiple
      placeholder="Inventores"
      v-model="inventorsActives"
    >
      <el-option
        v-for="item in inventorsAll"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'InventorsFilter',

  data () {
    return {
      inventorsActives: this.$store.state.inventorsActives
    }
  },

  computed: {
    ...mapState({
      inventorsAll: 'inventorsAll'
    })
  },

  methods: {
    change (data) {
      this.$store.dispatch('updateInventorsActives', data)
    }
  }

}
</script>

<style scoped lang="stylus">
</style>
