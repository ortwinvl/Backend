import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_DIR, ORIGIN, BASEPATH, VERIFIED_SENDER, SENDGRID_API_KEY, BLOB_STORAGE,
    SQL_USER, SQL_PWD, SQL_SERVER, SQL_PORT, SQL_DATABASE, CM_API_KEY, BASEORGANISATION } = process.env;