import mongoose from 'mongoose';

const MAX_ATTACHMENTS_TOTAL_SIZE = 1024 * 1024 * 10; // 10MB
const MAX_ATTACHMENT_SIZE = 1024 * 300; // 300kb
const MAX_ATTACHMENTS_COUNT = 5;

export const generateRandomSuiNs = async (): Promise<string> => {
  const timestamp = Date.now().toString(36);
  const randomValue = Math.random().toString(36).substring(2, 7);
  const randomString = `${timestamp}${randomValue}`.substring(0, 5);

  const existingUser = await mongoose.model('User').findOne({
    suimailNs: `${randomString}@suimail`,
  });
  if (existingUser) {
    return generateRandomSuiNs();
  }

  return `${randomString}@suimail`;
};

export const validateAttachmentCount = (files: Express.Multer.File[]): boolean => {
  return files.length <= MAX_ATTACHMENTS_COUNT;
};

export const validateAttachmentSize = (files: Express.Multer.File[]): boolean => {
  return files.every(file => file.size < MAX_ATTACHMENT_SIZE);
};

export const validateTotalAttachmentSize = (files: Express.Multer.File[]): boolean => {
  const totalSize = files.reduce((acc, file) => acc + file.size, 0);
  return totalSize <= MAX_ATTACHMENTS_TOTAL_SIZE;
};

/**
 * Validates if a string is a valid Suimail address
 * @param email The email address to validate
 * @returns boolean indicating if the email is valid
 */
export const isValidSuimailNs = (suimailNs: string): boolean => {
  if (!suimailNs) return false;

  return !!(
    suimailNs.match(/.*@suimailapp$/) &&
    suimailNs.split('@')[0].match(/^[a-zA-Z0-9][a-zA-Z0-9.]*[a-zA-Z0-9]$/) &&
    suimailNs.split('@')[0].length >= 3 &&
    suimailNs.split('@')[0].length <= 20 &&
    (suimailNs.match(/@/g) || []).length === 1
  );
};
