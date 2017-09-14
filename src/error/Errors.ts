export class Exception extends Error {
    public code: number;

    public constructor(code: number, message: string) {
        super(`${message}`);
        this.code = code;
    }
}

export default class Errors {
    public static throw(code: number, message: string) {
        throw Errors.new(code, message);
    }

    public static new(code: number, message: string): Error {
        return new Exception(code, message);
    }
}