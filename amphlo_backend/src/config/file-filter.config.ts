import { Request } from 'express';

type MulterCallback = (error: Error | null, acceptFile: boolean) => void;

export const fileFilterConfig = (
  req: Request,
  file: Express.Multer.File,
  callback: MulterCallback,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};
