import request from '@/utils/request'

export function getResearcherPage(params) {
  return request({
    url: '/api/researcher/page',
    method: 'get',
    params
  })
}

export function addResearcher(data) {
  return request({
    url: '/api/researcher',
    method: 'post',
    data
  })
}

export function updateResearcher(data) {
  return request({
    url: '/api/researcher',
    method: 'put',
    data
  })
}

export function deleteResearcher(id) {
  return request({
    url: `/api/researcher/${id}`,
    method: 'delete'
  })
}

export function getResearcherDetail(id) {
  return request({
    url: `/api/researcher/${id}`,
    method: 'get'
  })
}
