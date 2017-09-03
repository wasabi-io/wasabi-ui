import PropTypes from "prop-types";
import {validation, CheckerValue, CheckerAsString} from "../validation";
import Objects, {Props} from "wasabi-common/lib/types/Objects";
import Arrays from "wasabi-common/lib/types/Arrays";
import {has} from "wasabi-common";
import Strings from "wasabi-common/lib/types/Strings";

export interface InputState<V> {

}

export interface InputProps<V> {
    name: string,
    type?: string,
    value?: any,
    autoValidate?: boolean,
    // validations?: ValidationItem[],
    validation?: {
        params?: Props<string | number>
        checkers: Array<CheckerValue | CheckerAsString | string>
    },
    onChange?: (name: string, value: V) => boolean,

    [key: string]: any
}

export default class Input<I, V = any, P = I & InputProps<V>> {
    private props: InputProps<V>;
    private value: V;
    private _errorMessages: string[];

    public static propTypes = {
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        value: PropTypes.any,
        autoValidate: PropTypes.bool,
        validations: PropTypes.object,
        onChange: PropTypes.func
    };

    public static defaultProps = {
        autoValidate: true,
        validation: {
            checkers: ([] as any[])
        }
    };

    private viewProps: I;
    private defaultProps: any;

    public constructor(props: P, defaultProps: any) {
        if (!defaultProps) {
            defaultProps = Input.defaultProps;
        }
        this.defaultProps = defaultProps;
        this.props = Objects.mergeDefaults(this.defaultProps, props);
        this.excludeProps(this.props);
    }

    public excludeProps(props: any) {
        let {
            name,
            type,
            value,
            autoValidate,
            validation,
            onChange,
            ...viewProps
        } = props;
        this.viewProps = viewProps;
    }

    public componentWillReceiveProps(nextProps: P) {
        this.props = Objects.mergeDefaults(this.defaultProps, nextProps);
        this.excludeProps(nextProps)
    }

    public getViewProps(): I {
        return this.viewProps;
    }

    public validate(data?: Props) {
        if (!has(this.props.validation)) {
            return true;
        }

        if (!Arrays.has(this.props.validation.checkers)) {
            return true;
        }

        let params = this.props.validation.params;
        let checkers = this.props.validation.checkers;

        this._errorMessages = [];
        for (let i = 0; i < checkers.length; i++) {
            let errorMessage = validation.check(checkers[i], this.value, params, data);
            if (Strings.has(errorMessage)) {
                this._errorMessages[this.errorMessages.length] = errorMessage;
            }
        }
        return this._errorMessages.length === 0;
    }

    public isValid(reValidate?: boolean, data?: Props): boolean {
        if (reValidate) {
            return this.validate();
        }
        return this._errorMessages.length === 0;
    }

    public onChange(value: V) {
        if (this.props.onChange) {
            return this.props.onChange(this.props.name, value);
        }
        return true;
    }

    public get errorMessages(): string[] {
        return this._errorMessages;
    }
}

