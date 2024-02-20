/**
 * 将文件内容转换为 base64 编码
 * @param file
 * @returns
 */
const readFileAsBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      // 读取成功，将结果传递给 resolve
      const result = (event.target as FileReader)?.result as string;
      if (result) {
        resolve(result.split(",")[1]);
      } else {
        reject(new Error("Unable to read file content"));
      }
      resolve(result);
    };

    reader.onerror = (error: any) => {
      // 读取失败，将错误传递给 reject
      reject(new Error(`Error reading file: ${error}`));
    };

    // 开始读取文件
    reader.readAsDataURL(file);
  });
};

export { readFileAsBase64 };
