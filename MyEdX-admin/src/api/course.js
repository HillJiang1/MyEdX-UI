import request from '@/utils/request'
const api_name = '/eduservice/course'

export default {

    addCourseInfo(courseInfo) {
      return request({
        url: `${api_name}/import`,
        method: 'post',
        data:courseInfo
      }) 
    }
  }