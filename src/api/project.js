import request from "@/utils/request";

export const getProjectList = async () => {
  const res = await request.get("/project/list");
  return res.data;
};

export const getProjectPage = (data) => {
  return request({
    url: "/project/page",
    method: "post",
    data
  });
};


export const saveProject = (data) => {
  return request({
    url: "/project",
    method: "post",
    data
  });
};


export const updateProject = (data) => {
  return request({
    url: `/project`,
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
