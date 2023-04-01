<template>
    <div class="app-container">
  <h2 style="text-align: center;">Add New Course</h2>
      <el-steps :active="3" process-status="wait" align-center style="margin-
  bottom: 40px;">
            <el-step title="Input Course Info"/> 
            <el-step title="Input Course Chapter"/> 
            <el-step title="Publish"/>
      </el-steps>
      <el-form label-width="120px">
  <el-form-item>
  <el-button @click="previous">Back</el-button> <el-button :disabled="saveBtnDisabled" type="primary"
  @click="publish">Publish</el-button> </el-form-item>
      </el-form>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
  saveBtnDisabled: false // 保存按钮是否禁用 
}
},
  created() {
    console.log('publish created')
  },
  methods: {
    previous() {
      console.log('previous')
      this.$router.push({ path: '/course/chapter/1' })
    },
    publish() {
      console.log('publish')
      this.$router.push({ path: '/course/list' })
} }
}
</script>