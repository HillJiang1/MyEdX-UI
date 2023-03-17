<template>
    <div class="app-container">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="teacherQuery.name" placeholder="Teacher Name"/>
            </el-form-item>
        
            <el-form-item>
            <el-select v-model="teacherQuery.level" clearable placeholder="Title"> <el-option :value="1" label="高级讲师"/>
                <el-option :value="2" label="首席讲师"/>
                </el-select>
            </el-form-item>
            
            <el-form-item label="Added Time">
                <el-date-picker
                    v-model="teacherQuery.begin" type="datetime" placeholder="Start Time" value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00"
                />
            </el-form-item>
            <el-form-item>
                <el-date-picker
                    v-model="teacherQuery.end" type="datetime" placeholder="End Time" value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00"
                />
            </el-form-item>

            <el-button type="primary" icon="el-icon-search" @click="getPageList()">Search</el-button>

            <el-button type="default" @click="resetData()">Clear</el-button>
        </el-form>


        <el-table
            :data="resultList"
            stripe
            style="width: 100%">
            
            <el-table-column
                label="Index"
                width="70"
                align="center">
                <template slot-scope="scope">
                        {{ (page - 1) * limit + scope.$index + 1 }}
                </template>
            </el-table-column>

            <el-table-column prop="name" label="Name" width="80" /> 
                
            <el-table-column label="Title" width="80">
                <template slot-scope="scope">
                {{ scope.row.level===1?'高级讲师':'首席讲师' }}
                </template>
            </el-table-column>

            <el-table-column prop="intro" label="Introduction" />

            <el-table-column prop="gmtCreate" label="Added Time" width="160"/> 
            
            <el-table-column prop="sort" label="Sort" width="60" /> 
            
            <el-table-column label="Operation" width="200" align="center">
                <template slot-scope="scope">
                    <router-link :to="'/teacher/edit/'+scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">Edit
                        </el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            :current-page="page"
            :page-size="limit"
            :total="total"
            style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper"
            @current-change="getPageList"
        />
    </div>
</template>

<script>
import teacher from '@/api/teacher'

export default {
    data() {// 定义变量和初始值
        return {
            resultList:null,
            page:1,
            limit:10,
            total:0,
            teacherQuery:{}
        }
    },

    created() { // 当页面加载时获取数据 
        this.getPageList()
    },

    methods: {
        getPageList(page = 1){
            this.page = page
            teacher.getPageList(this.page,this.limit,this.teacherQuery)
            .then(response => {
                this.resultList = response.data.rows
                this.total = response.data.total
            })
            .catch(error => {
                console.log(error)
            })
        },

        resetData(){
            this.teacherQuery = {}
            this.getPageList
        },

        removeDataById(id){

            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定', 
                cancelButtonText: '取消', 
                type: 'warning'
            }).then(() => { 
                return teacher.removeById(id)
            }).then(() => {
                this.getPageList()
                this.$message({
                    type: 'success',
                    message: '删除成功!' 
                })
            }).catch((response) => { // 失败 
                if (response === 'cancel') {
                    this.$message({
                        type: 'info',
                        message: '已取消删除' })
                } else {
                    this.$message({
                        type: 'error',
                        message: '删除失败' })
                } 
            })
        
        }
    } 
}
</script>