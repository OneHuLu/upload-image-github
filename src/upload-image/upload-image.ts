import { Octokit } from "@octokit/core";
import { UploadAccess } from "@/type/upload-image-type";
import { readFileAsBase64 } from "@/file-to-base64/file-to-base64";
/**
 * 上传文件到github远程仓库
 * @param file
 * @param path 建议唯一的路径
 * @returns
 */
const handleUpload = async (
  file: Blob,
  path: string,
  AccessInfo: UploadAccess
): Promise<string> => {
  const { auth, owner, repo, branch } = AccessInfo || {};

  if (!auth || !owner || !repo) {
    throw new Error("auth、owner、repo must not be an empty string");
  }

  if (!file) {
    throw new Error("check your File");
  }

  try {
    const octokit = new Octokit({
      auth,
    });
    // 读取文件内容
    const content = await readFileAsBase64(file);
    // 使用 Octokit 上传文件
    const response = await octokit.request(
      `PUT /repos/${owner}/${repo}/contents/${path}`,
      {
        message: "Add user photo",
        content,
        branch,
      }
    );
    return response?.data?.content?.download_url;
  } catch (error) {
    throw new Error(`Error uploading file:${error}`);
  }
};

export { handleUpload };
