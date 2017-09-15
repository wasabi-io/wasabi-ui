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

    public static new(code: number, message: string): Exception {
        return new Exception(code, message);
    }

    public static error(code: number, error: Error): Exception {
        let ex = new Exception(code, error.message);
        ex.stack = error.stack;
        ex.name = error.name;
        return ex;
    }
}