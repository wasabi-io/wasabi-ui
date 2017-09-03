import Types from "wasabi-common/lib/util/Types";
import Objects from "wasabi-common/lib/types/Objects";
import {has} from "wasabi-common/lib/util/Functions";
import Strings from "wasabi-common/lib/types/Strings";
import Arrays from "wasabi-common/lib/types/Arrays";
import {CheckerParams} from "wasabi-ui/lib/validation/Checker";

export interface MinParams extends CheckerParams {
    min: number
}

export interface MaxParams extends CheckerParams {
    max: number
}

export interface PatternParams extends CheckerParams {
    pattern: RegExp
}


const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const checkers = {
    required: {
        message: "${name} is required",
        fn: (value: any , params: CheckerParams): boolean => {
            switch (Types.getRawName(value)) {
                case Types.ToString.Array:
                    return Arrays.has(value);
                case Types.ToString.String:
                    return Strings.has(value);
                case Types.ToString.Object:
                    return Objects.has(value);
                default:
                    has(value);
            }
            return true;
        }
    },
    minSize: {
        message: "${name} must be at least ${min} size",
        fn: (value: Array<any> | string, params: MinParams): boolean => {
            if (!has(value)) {
                return !(params.min > 0);
            }
            return value.length >= params.min;
        }
    },
    maxSize: {
        message: "${name} must be at greatest ${max} size",
        fn: (value: Array<any> | string, params: MaxParams): boolean => {
            if (!has(value)) {
                return true;
            }
            return value.length <= params.max;
        }
    },
    min: {
        message: "${name} must be at least ${min}",
        fn: (value: number, params: MinParams): boolean => {
            if (!has(value)) {
                return !(params.min > 0);
            }
            return value >= params.min;
        }
    },
    max: {
        message: "${name} must be at greatest ${max}",
        fn: (value: number, params: MaxParams): boolean => {
            if (!has(value)) {
                return true;
            }
            return value <= params.max;
        }
    },
    email: {
        message: "${name} is not valid email !",
        fn: (value: string, params: CheckerParams): boolean => emailRegex.test(value)
    },
    pattern: {
        message: "${name} is not valid format !",
        fn: (value: string, params: PatternParams): boolean => params.pattern.test(value)
    }
};

export default checkers;