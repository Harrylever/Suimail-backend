import joi from 'joi';
import { Types } from 'mongoose';
import { Attachment, IMail } from '../../../models/mail.model';

export interface CreateMailSchema {
  blobId: string;
  subject: string;
  senderId: string;
  recipientId: string;
  body: string;
  digest?: string;
  parentMailId?: Types.ObjectId;
  attachments: Attachment[];
  metadata: IMail['metadata'];
}

export interface SendMailSchema {
  senderId: string;
  recipient: string;
  subject: string;
  body: string;
  files: Express.Multer.File[];
  parentMailId?: Types.ObjectId;
  digest?: string;
}

export const sendMailSchema = joi.object({
  recipient: joi.string().required().messages({
    'any.required': 'Recipient is required',
  }),
  subject: joi.string().required().messages({
    'any.required': 'Subject is required',
  }),
  body: joi.string().required().messages({
    'any.required': 'Body is required',
  }),
  parentMailId: joi.string().optional().messages({
    'any.required': 'Parent mail ID is optional',
  }),
  digest: joi.string().optional().messages({
    'any.required': 'Digest is optional',
  }),
});
