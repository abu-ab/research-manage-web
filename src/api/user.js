import request from '@/utils/request';

export const loginApi = (data) => request.post('/user/login', data);
export const changePasswordApi = (data) => request.post('/user/change-password', data);


export function getUserPage(params) {
  return request({
    url: "/user/page",
    method: "get",
    params
  });
}

export const updateUserRole = (data) => {
  return request({
    url: "/user/role",
    method: "post",
    data
  });
};