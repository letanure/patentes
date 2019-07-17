<template>
  <div class="PatentDetail">
    <el-dialog
      title="Detalhes"
      :visible.sync="visible"
      width="70%"
      >
      <el-row :gutter="20" v-for="(item, index) in patentData" :key="index">
          <el-col :span="5">
            {{index}}
          </el-col>
          <el-col :span="19">
            <template v-if="index === 'CLASSIFICAÇÃO'">
              <el-tag
                v-for="tag in item"
                :key="tag"
                size="small"
                >
                  {{tag}}
              </el-tag>
            </template>
            <template v-else-if="index === 'INVENTOR'">
              <el-tag
                v-for="tag in item"
                :key="tag"
                size="small"
                >
                  {{tag}}
              </el-tag>
            </template>
            <template v-else>
              {{item}}
            </template>
          </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">Fechar</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PatentDetail',
  props: {
    id: Number,
    visible: Boolean
  },
  computed: {
    patentData () {
      return this.$store.getters.getPatentById(this.id)
    }
  },

  methods: {
    close () {
      this.$emit('detail:close', false)
    }
  }

}
</script>

<style scoped lang="stylus">
</style>
