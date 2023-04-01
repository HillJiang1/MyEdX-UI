import request from '@/utils/request'
const api_name = '/eduservice/teacher'

export default {

  getPageList(page, limit, teacherQuery) {
    return request({
      url: `${api_name}/paging/condition/${page}/${limit}`,
      method: 'post',
      //data: means transfer object to JSON format (Matching @RequestBody)
      data: teacherQuery
    }) 
  },

  removeById(id) {
    return request({
        url: `${api_name}/${id}`,
        method: 'delete'
      }) 
  },

  insert(teacher) {
    return request({
        url: api_name,
        method: 'post',
        data: teacher
    }) 
  },

  getById(id){
    return request({
        url: `${api_name}/${id}`,
        method: 'get'
    })
  },

  getList() {
    return request({
        url: `${api_name}/getAll`,
        method: 'get'
    })
  },

  updateById(teacher){
    return request({
        url: `${api_name}/${teacher.id}`,
        method: 'put',
        data: teacher
    })
  }
}
