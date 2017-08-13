import Component from "../Component";
import PropTypes from "prop-types";
import validateJs from "validate.js";
import Objects from "wasabi-common/lib/types/Objects";

export interface InputCallback {
    (name: string, value: any): any
}

export interface AbstractInputItemProps {
    name: string,
    type?: string,
    value?: any,
    autoValidate?: boolean,
    validations?: any[],
    onChange?: InputCallback,
    [key: string]: any
}


abstract class AbstractInputItem<P extends AbstractInputItemProps, S> extends Component<P, S> {
    public static propTypes = {
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        value: PropTypes.any,
        autoValidate: PropTypes.bool,
        validations: PropTypes.object,
        onChange: PropTypes.func
    };
    public static defaultProps = {
        autoValidate: true
    };
    protected errorMessage: string[];
    protected viewProps: any;

    public constructor(props: P) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.componentWillReceiveProps(props);
        this.errorMessage = this.props.autoValidate ? this.validate(this.viewProps.value) : undefined;
    }

    public componentWillReceiveProps(nextProps: P) {
        let {
            name,
            type,
            onChange,
            autoValidate,
            validations,
            ...props
        } = nextProps as AbstractInputItemProps;
        this.viewProps = props;
    }

    public validate(value: any): string[] {
        if (!this.props.validations) {
            return;
        }
        let constraints: any = {};
        constraints[this.props.name] = this.props.validations;
        let attributes: any = {};
        attributes[this.props.name] = value ? value : "";
        console.log(attributes);
        return validateJs(attributes, constraints, {format: "flat"});
    }

    public isValid(): boolean {
        if (!this.props.autoValidate) {
            this.errorMessage = this.validate(this.props.value)
        }
        return this.errorMessage !== undefined
    }

    protected onChange(value: any) {
        this.errorMessage = this.validate(value);
        if (this.props.onChange) {
            return this.props.onChange(this.props.name, value);
        }
        return true;
    }
}

const mergeDefaults = (defaults: any): any => {
    return Objects.mergeDefaults(
        AbstractInputItem.defaultProps, defaults
    )
};
export {
    mergeDefaults
};

export default AbstractInputItem;
