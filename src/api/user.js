import request from '@/utils/request';

export const loginApi = (data) => request.post('/user/login', data);
export const changePasswordApi = (data) => request.post('/user/change-password', data);
