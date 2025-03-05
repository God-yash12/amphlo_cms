import { existsSync, mkdirSync } from 'fs';

export const createDirectory = (directory: string) => {
  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }
};
