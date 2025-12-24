import request from "@/utils/request";


export const getProjectMembers = async (projectId) => {
  const res = await request.get(`/project/${projectId}/members`);
  return res.data; // 返回成员数组 [{id, name, code, ...}]
};

export const addProjectMembers = async ({ projectId, researcherIds }) => {
  const res = await request.post("/project/members", {
    projectId,
    researcherIds,
  });
  return res.data;
};


export const removeProjectMember = async (projectId, researcherId) => {
  const res = await request.post("/project/members/remove", {
    projectId,
    researcherId,
  });
  return res.data;
};
