import request from "@/utils/request";


export const getBookList = async () => {
  const res = await request.get("/book/list");
  return res.data;
};

export const getBookPage = (params) => {
  return request({
    url: "/book/page",
    method: "get",
    params
  });
};

export const saveBook = (data) => {
  return request({
    url: "/book",
    method: "post",
    data
  });
};

export const updateBook = (data) => {
  return request({
    url: `/book`,
    method: "put",
    data
  });
};

export const deleteBook = (id) => {
  return request({
    url: `/book/${id}`,
    method: "delete"
  });
};
