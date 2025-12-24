import request from "@/utils/request";

export function getAwardPage(params) {
  return request({
    url: "/award/page",
    method: "get",
    params
  });
}

export function saveAward(data) {
  return request({
    url: "/award",
    method: "post",
    data
  });
}

export function updateAward(data) {
  return request({
    url: "/award",
    method: "put",
    data
  });
}

export function deleteAward(id) {
  return request({
    url: `/award/${id}`,
    method: "delete"
  });
}
