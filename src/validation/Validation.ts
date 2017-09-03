import Map from "wasabi-common/lib/collection/Map";
import {Props} from "wasabi-common/lib/types/Objects";
import {has} from "wasabi-common";
import Strings from "wasabi-common/lib/types/Strings";
import {Checker, CheckerAsBoolean, CheckerAsString, CheckerValue} from "./Checker";
import checkers from "./checkers";

export class Validation extends Map<string, Checker> {
    /**
     *
     * @param {string} key
     * @param {string} message
     */
    public setMessage(key: string, message: string) {
        let checker = this.get(key);
        if (checker) {
            checker.message = message;
        }
    }

    /**
     *
     * @param {Props<string>} messages
     */
    public setMessages(messages: Props<string>) {
        if (!messages) {
            return;
        }
        for (let key in messages) {
            if (messages.hasOwnProperty(key)) {
                this.setMessage(key, messages[key]);
            }
        }
    }

    /**
     *
     * @param {string} key
     * @param {Checker} checker
     * @returns {CheckerValue}
     */
    public put(key: string, checker: Checker): CheckerValue {
        if (typeof checker === "function") {
            checker = {
                message: null,
                fn: checker
            }
        }
        super.put(key, checker);
        return checker;
    }

    public check(checker: string | Checker, value: any, params?: Props, data?: Props, message?: string): string {
        if (typeof  checker === "string") {
            return this.checkByName(checker, value, params, data, message);
        }
        return this.checkByChecker(checker, value, params, data, message);
    }

    public checkByName(key: string, value: any, params?: Props, data?: Props, message?: string): string {
        let checker = this.get(key) as CheckerValue;
        return this.checkByFn(checker.fn, value, params, data, message || checker.message);
    }

    public get(key: string): CheckerValue {
        return super.get(key) as CheckerValue;
    }

    public checkByChecker(checker: Checker, value: any, params?: Props, data?: Props, message?: string): string {
        if (typeof checker === "function") {
            return this.checkByFn(checker, value, params, data, message);
        } else {
            return this.checkByFn(checker.fn, value, params, data, message || checker.message);
        }
    }

    public checkByFn(checker: CheckerAsBoolean | CheckerAsString, value: any, params?: Props, data?: Props, message?: string): string {
        let result = checker(value, data);

        if (!has(result)) {
            return;
        }
        if (result === true) {
            return;
        }

        let resultMessage = Validation.getMessage(result, message);
        if (resultMessage != null) {
            return Strings.template(resultMessage, Validation.getParams(params, value));
        }
        return result.toString();
    }


    private static getParams(params: Props, value: any) {
        if (!params) params = {};
        if (!params.value) {
            params.value = value;
        }
        return params;
    }

    private static getMessage(result: any, message: string): string {
        if (typeof result === "boolean") {
            return message || "";
        } else if (typeof result === "string") {
            return result || message;
        } else {
            return message || result.toString();
        }
    }

}

const checker = new Validation();
checker.putAll(checkers);
export default checker;
