import { diskStorage } from 'multer';
import { join } from 'path';
import { createDirectory } from 'src/utils/file-path-creator';

export const storageConfig = diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = join(__dirname, '..', '..', 'uploads');
    createDirectory(uploadPath);
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    callback(null, fileName);
  },
});
