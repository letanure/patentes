<template>
  <div class="ColumnsFilter">
    <el-select
      @change="change"
      filterable
      multiple
      placeholder="Exibir colunas"
      v-model="columnsToShow"
    >
      <el-option
        v-for="item in columnsAvailable"
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
  name: 'ColumnsFilter',

  data () {
    return {
      columnsToShow: this.$store.state.columnsToShow
    }
  },

  computed: {
    ...mapState({
      columnsAvailable: 'columnsAvailable'
    })
  },

  methods: {
    change (data) {
      this.$store.dispatch('updateColumnsAvailable', data)
    }
  }

}
</script>

<style scoped lang="stylus">
</style>
