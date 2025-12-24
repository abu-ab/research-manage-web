import request from '@/utils/request'


export const getAllResearchers = async () => {
  const res = await request.get("/researcher/list");
  return res.data; // 返回科研人员数组 [{id, name, code, ...}]
};

export function getResearcherPage(params) {
  return request({
    url: '/researcher/page',
    method: 'get',
    params
  })
}

export function addResearcher(data) {
  return request({
    url: '/researcher',
    method: 'post',
    data
  })
}

export function updateResearcher(data) {
  return request({
    url: '/researcher',
    method: 'put',
    data
  })
}

export function deleteResearcher(id) {
  return request({
    url: `/researcher/${id}`,
    method: 'delete'
  })
}

export function getResearcherDetail(id) {
  return request({
    url: `/researcher/${id}`,
    method: 'get'
  })
}
