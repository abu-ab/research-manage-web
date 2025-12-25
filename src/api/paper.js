import request from "@/utils/request";

export const getPaperList = async () => {
  const res = await request.get("/paper/list");
  return res.data;
};

export const getPaperPage = (data) => {
  return request({
    url: "/paper/page",
    method: "post",
    data
  });
};

export const savePaper = (data) => {
  return request({
    url: "/paper",
    method: "post",
    data
  });
};

export const updatePaper = (data) => {
  return request({
    url: `/paper`,
    method: "put",
    data
  });
};

export const deletePaper = (id) => {
  return request({
    url: `/paper/${id}`,
    method: "delete"
  });
};
