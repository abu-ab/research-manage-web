export const PROJECT_STATUS = {
  DRAFT: 0,
  RUNNING: 1,
  FINISHED: 2,
  ARCHIVED: 3,
};

export const PROJECT_STATUS_OPTIONS = [
  { label: "草稿", value: 0 },
  { label: "进行中", value: 1 },
  { label: "已结项", value: 2 },
  { label: "已归档", value: 3 },
];

export const PROJECT_STATUS_MAP = {
  0: "草稿",
  1: "进行中",
  2: "已结项",
  3: "已归档",
};
