import request from "@/utils/request";

export const getProjectPage = (params) => {
  return request({
    url: "/project/page",
    method: "get",
    params
  });
};


export const saveProject = (data) => {
  return request({
    url: "/project",
    method: "post",
    data
  });
};


export const updateProject = (id, data) => {
  return request({
    url: `/project/${id}`,
    method: "put",
    data
  });
};


export const deleteProject = (id) => {
  return request({
    url: `/project/${id}`,
    method: "delete"
  });
};
