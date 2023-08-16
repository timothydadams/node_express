import path from 'path';
import { fileURLToPath } from 'url';

export const getFileName = (metaUrl) => {
  const __filename = fileURLToPath(metaUrl);
  return __filename;
}

export const getDirName = (metaUrl) => {
  const __dirname = path.dirname(getFileName(metaUrl));
  return __dirname;
}

export const paginate = ({ page, pageSize }) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  return {
    offset,
    limit,
  };
};