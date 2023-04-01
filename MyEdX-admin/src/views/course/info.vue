<template>
    <div class="app-container">
        <h2 style="text-align: center;">Add New Course</h2>
        <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="Input Course Info"/> 
            <el-step title="Input Course Chapter"/> 
            <el-step title="Publish"/>
        </el-steps>
        
        <el-form label-width="120px"> 
            <el-form-item label="课程标题">
                <el-input v-model="courseInfo.title" placeholder=" 示例:机器学习项目课:从基础到搭建项目" ></el-input>
            </el-form-item>
            <el-form-item label="课程类别">
                <el-select @change="subjectLevelOneChanged"
                    v-model="courseInfo.subjectParentId" placeholder="请选择">
                    <el-option
                        v-for="subject in subjectNestedList"
                        :key="subject.id"
                        :label="subject.title"
                        :value="subject.id"/>
                </el-select>
                <el-select v-model="courseInfo.subjectId" placeholder="请选择">
                    <el-option
                        v-for="subject in subSubjectList"
                        :key="subject.value"
                        :label="subject.title"
                        :value="subject.id"/>
                </el-select>
            </el-form-item>
            <el-form-item label="课程讲师">
                <el-select
                    v-model="courseInfo.teacherId" placeholder="请选择"> 
                    <el-option
                        v-for="teacher in teacherList"
                        :key="teacher.id"
                        :label="teacher.name"
                        :value="teacher.id"/>
                </el-select>
            </el-form-item>
            <el-form-item label="总课时">
                <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="64"></el-input-number>
           </el-form-item>
            <el-form-item label="课程简介">
                <el-input v-model="courseInfo.description" placeholder=" 示例:这是一节机器学习课" ></el-input>
            </el-form-item>
            <el-form-item label="课程封面">
                <el-upload
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :action="BASE_API+'/ossservice/file/upload'"
                    class="avatar-uploader">
                    <img :src="courseInfo.cover"
                    :width="200"
                    :height="200">
                </el-upload>
            </el-form-item>
            <el-form-item label="课程价格">
                <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="100"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
            </el-form-item>
        </el-form>


    </div>
</template>

<script>
  import course from '@/api/course'
  import subject from '@/api/subject'
  import teacher from '@/api/teacher'
  export default {
    data() {
      return {
        saveBtnDisabled: false, // 保存按钮是否禁用 
        courseInfo:{
            title: '',
            subjectId: '',
            teacherId: '',
            lessonNum: 0,
            description: '',
            cover: process.env.VUE_APP_OSS_PATH + '/cover/default.png',
            price: 0
        },
        BASE_API: process.env.VUE_APP_BASE_API,
        teacherList:[],
        subjectNestedList: [],//一级分类列表 
        subSubjectList: []//二级分类列表
      }
    },
    created() {
        console.log('info created')
        this.getTeacherList()
        this.getSubject1()
    },
    methods: {
        getTeacherList() {
            teacher.getList()
                .then(response => {
                    this.teacherList = response.data.AllTeacherList
                })
        },

        getSubject1() {
            subject.getNestedTreeList()
                .then(response => {
                    this.subjectNestedList = response.data.items
                })
        },

        subjectLevelOneChanged(value) {
            console.log(value)
            for (let i = 0; i < this.subjectNestedList.length; i++) {
                if (this.subjectNestedList[i].id === value) {
                    this.subSubjectList = this.subjectNestedList[i].children
                    this.courseInfo.subjectId = ''
                } 
            }
        },

        saveOrUpdate() {
            course.addCourseInfo(this.courseInfo)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '添加课程信息成功!' 
                    })

                    this.$router.push({ path: '/course/chapter/'+ response.data.courseId })
                })
        },

        handleAvatarSuccess(res, file) {
        console.log(res)// 上传响应 
        console.log(URL.createObjectURL(file.raw))// base64编码 
        this.courseInfo.cover = res.data.url
        },

        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isJPG) { this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!') }
            return isJPG && isLt2M
        }
    } 
  }
</script>