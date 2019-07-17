<template>
  <div class="NaturesFilter">
    <el-select
      @change="change"
      filterable
      multiple
      placeholder="Classificaçoes"
      v-model="naturesActives"
    >
      <el-option
        v-for="item in natureAll"
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
  name: 'NaturesFilter',

  data () {
    return {
      naturesActives: this.$store.state.naturesActives
    }
  },

  computed: {
    ...mapState({
      natureAll: 'natureAll'
    })
  },

  methods: {
    change (data) {
      this.$store.dispatch('updateNaturesActives', data)
    }
  }

}
</script>

<style scoped lang="stylus">
</style>
