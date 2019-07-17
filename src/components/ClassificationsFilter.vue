<template>
  <div class="ClassificationsFilter">
    <el-select
      @change="change"
      filterable
      multiple
      placeholder="Classificaçoes"
      v-model="classificationsActive"
    >
      <el-option
        v-for="item in allClassifications"
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
  name: 'ClassificationsFilter',

  data () {
    return {
      classificationsActive: this.$store.state.classificationsActive
    }
  },

  computed: {
    ...mapState({
      allClassifications: 'allClassifications'
    })
  },

  methods: {
    change (data) {
      this.$store.dispatch('updateclassificationsActive', data)
    }
  }

}
</script>

<style scoped lang="stylus">
</style>
