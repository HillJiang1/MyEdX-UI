import request from '@/utils/request'
const api_name = '/eduservice/chapter'
export default {

  getAllChapterVideo(courseId) {
    return request({
      url: `${api_name}/getChapterVideo/${courseId}`,
      method: 'get'
    })
  }
}
