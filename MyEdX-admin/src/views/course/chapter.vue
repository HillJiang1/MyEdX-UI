<template>
    <div class="app-container">
        <h2 style="text-align: center;">Add New Course</h2>
        <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="Input Course Info"/>
            <el-step title="Input Course Chapter"/>
            <el-step title="Publish"/>
      </el-steps>

      <el-button type="text">添加章节</el-button> <!-- 章节 -->
      <ul class="chanpterList">
        <li
          v-for="chapter in chapterVideoList"
          :key="chapter.id">
          <p>
            {{ chapter.title }}
            <span class="acts">
              <el-button type="text">添加课时</el-button>
              <el-button style="" type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </span>
          </p>
          <!-- 视频 -->
          <ul class="chanpterList videoList">
            <li
              v-for="video in chapter.sectionVoList"
              :key="video.id">
              <p>{{ video.title }}
                <span class="acts">
                  <el-button type="text">编辑</el-button>
                  <el-button type="text">删除</el-button>
                </span>
              </p>
            </li>
          </ul>
        </li>
      </ul>


      <el-form label-width="120px">
            <el-form-item>
                <el-button @click="previous">Back</el-button>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="next">Next</el-button>
            </el-form-item>
      </el-form>
    </div>
  </template>

  <script>
  import chapter from "@/api/chapter"
  export default {
    data() {
      return {
        saveBtnDisabled: false, // 保存按钮是否禁用
        courseId:'',
        chapterVideoList:[]
    }
    },
    created() {
        console.log('chapter created')
        if(this.$route.params && this.$route.params.id) {
          this.courseId = this.$route.params.id
          this.getChapterVideo()
        }
    },
    methods: {
        getChapterVideo() {
          chapter.getAllChapterVideo(this.courseId)
            .then(response => {
              this.chapterVideoList = response.data.chapters
            })
        },

        previous() {
            console.log('previous')
            this.$router.push({ path: '/course/info/' + this.courseId })
        },
        next() {
            console.log('next')
            this.$router.push({ path: '/course/publish/' + this.courseId })
        }
    }
}
</script>

<style scoped>

.chanpterList{
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li{
  position: relative;
}
.chanpterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}
.videoList{
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}

</style>
