/**
 * 上传Access
 * auth: GitHub 个人访问令牌
 * owner: 目标仓库的所有者（用户或组织名）
 * repo: 仓库的默认分支
 * branch: 仓库的分支
 */
export type UploadAccess = {
  auth: string;
  owner: string;
  repo: string;
  branch: string | "master";
};
