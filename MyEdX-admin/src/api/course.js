import request from '@/utils/request'
const api_name = '/eduservice/course'

export default {

    addCourseInfo(courseInfo) {
      return request({
        url: `${api_name}/import`,
        method: 'post',
        data:courseInfo
      })
    },

  getCourseInfoById(id) {
    return request({
      url: `${api_name}/getCourseInfo/${id}`,
      method: 'get'
    })
  },

  updateCourseInfo(courseInfo) {
    return request({
      url: `${api_name}/updateCourseInfo`,
      method: 'post',
      data:courseInfo
    })
  }
  }
