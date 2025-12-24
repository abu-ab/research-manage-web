import request from "@/utils/request";

export const getDict = async (type) => {
  let res = await request.get(`/dict/${type}`);
  return res.data;
}

export function getDictPage(params) {
  return request({
    url: "/dict/page",
    method: "get",
    params
  });
}

export function saveDict(data) {
  return request({
    url: "/dict",
    method: "post",
    data
  });
}

export function updateDict(data) {
  return request({
    url: "/dict",
    method: "put",
    data
  });
}

export function deleteDict(id) {
  return request({
    url: `/dict/${id}`,
    method: "delete"
  });
}