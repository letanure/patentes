<template>
  <div class="ColumnsFilter">
    <el-select
      @change="changeColumns"
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
    changeColumns (columns) {
      console.log(columns)
      this.$store.dispatch('updateColumnsAvailable', columns)
    }
  }

}
</script>

<style scoped lang="stylus">
</style>
