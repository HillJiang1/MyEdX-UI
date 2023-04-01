<template>
    <div class="app-container">
        <h2 style="text-align: center;">Add New Course</h2>
        <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="Input Course Info"/> 
            <el-step title="Input Course Chapter"/> 
            <el-step title="Publish"/>
      </el-steps>
      <el-form label-width="120px">
            <el-form-item>
                <el-button @click="previous">Back</el-button>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="next">Next</el-button> 
            </el-form-item>
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
        console.log('chapter created')
    }, 
    methods: {
        previous() {
            console.log('previous')
            this.$router.push({ path: '/course/info/1' })
        }, 
        next() {
            console.log('next')
            this.$router.push({ path: '/course/publish/1' })
        }
    }    
}
</script>