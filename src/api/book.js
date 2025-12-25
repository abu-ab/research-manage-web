import request from "@/utils/request";


export const getBookList = async () => {
  const res = await request.get("/book/list");
  return res.data;
};

export const getBookPage = (data) => {
  return request({
    url: "/book/page",
    method: "post",
    data
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
