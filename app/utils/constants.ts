export const DB_URL = `mongodb+srv://${
    process.env.DATABASE_USER
        ? `${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@`
        : ''
}${process.env.DATABASE_HOST}/?retryWrites=true&w=majority`;

export const DATABASE_NAME = process.env.DATABASE_NAME;

export const REGION = process.env.AWS_REGION;

export const SQS_QUEUE_URL = `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.SQS_ACCOUNT}/${process.env.SQS_NAME}`;
