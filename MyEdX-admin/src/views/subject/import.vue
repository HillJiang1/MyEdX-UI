<template>
    <div class="app-container">
        <el-form label-width="120px"> 
            <el-form-item label="Description">
                <el-tag type="info">Excel Template</el-tag> 
                <el-tag>
                    <i class="el-icon-download"/>
                    <a :href="OSS_PATH + '/excel/01.xlsx'">Download Template</a>
                </el-tag>
            </el-form-item>
            <el-form-item label="New Subject"> 
                <el-upload
                    ref="upload"
                    :auto-upload="false"
                    :on-success="fileUploadSuccess"
                    :on-error="fileUploadError"
                    :disabled="importBtnDisabled"
                    :limit="1"
                    :action="BASE_API+'/eduservice/subject/import'"
                    name="file"
                    accept="application/vnd.xlsx">
                    <el-button slot="trigger" size="small" type="primary">Select File</el-button>
                    <el-button
                        :loading="loading"
                        style="margin-left: 10px;"
                        size="small"
                        type="success"
                        @click="submitUpload">{{ fileUploadBtnText }}
                    </el-button>
                </el-upload>
            </el-form-item>
      </el-form>
    </div>
</template>

<script>



export default {
  data() {
    return {
        BASE_API:process.env.VUE_APP_BASE_API,
        OSS_PATH:process.env.VUE_APP_OSS_PATH,
        fileUploadBtnText: 'Import Subject',
        importBtnDisabled: false, 
        loading: false
    } 
  },

  created(){
    console.log(this.OSS_PATH)
  },

  methods: {
    submitUpload() {
        this.fileUploadBtnText = 'Uploading...' 
        this.importBtnDisabled = true 
        this.loading = true 
        this.$refs.upload.submit()
    },
    fileUploadSuccess(response) {
        if (response.success === true) { 
            this.fileUploadBtnText = 'Import Success!' 
            this.loading = false 
            this.$message({
                type: 'success',
                message: response.message
            })
            this.$router.push({ path: '/subject/list' })
        }
    },
    fileUploadError(response) {
        this.fileUploadBtnText = 'Import Failed!' 
        this.loading = false 
        this.$message({
            type: 'error', message: 'Import Failed!' 
        })
    } 
  },




}
</script>