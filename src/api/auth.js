import request from "@/utils/request";

export const login = (data) => {
  return request.post("/user/login", data);
};

export const register = (data) => {
  return request.post("/user/register", data);
};

export function changePassword(data) {
  return request({
    url: "/user/change-password",
    method: "POST",
    data
  });
}