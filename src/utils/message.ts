import {ValidationError} from 'class-validator';

class Result {
    private data?: any;

    constructor(statusCode: number, data?: any) {
        this.data = data;
    }

    /**
     * Serverless: According to the API Gateway specs, the body content must be stringified
     */
    bodyToString() {
        return this.data
        // {
        // statusCode: this.statusCode,
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': '*',
        //     'Access-Control-Allow-Credentials': true
        // },
        // body: JSON.stringify({
        //   data: this.data,
        // }),
        // data: this.data

        // };
    }
}

export class MessageUtil {
    static success(data: any): any { // ResponseVO
        const result = new Result(
            // eslint-disable-next-line no-self-assign
            (data.response === 'SUCCESS') ? data.statusCode = 200 : data.statusCode = data.statusCode,
            data
        );

        return result.bodyToString();
    }

    static error(code: any, message: string) {
        const result = new Result(code, message);

        console.log(result.bodyToString());
        return result.bodyToString();
    }
}

export const parseValidationErrors = (errors: ValidationError[]): string => {
    const errorMessages = errors.reduce((acc, element) => {
        console.log('errors; ',errors)
        const property = Object.values(element.constraints).reduce(
            (_, valueproperty) => {
                return valueproperty;
            },
            ''
        );
        console.log('acc, ', acc,' property: ', property)
        return `${acc} ${acc ? '-- ' : ''}${property}`;
    }, '');
    return `${errorMessages}`;
};
