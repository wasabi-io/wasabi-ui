import PropTypes from "prop-types";
import Input, {InputProps, InputState} from "./Input";
import Stateless from "../Stateless";
import {Props} from "wasabi-common/lib/types/Objects";

abstract class StatelessInput<I, V = any, P = I & InputProps<V>> extends Stateless<P> {
    public static propTypes = Input.propTypes;
    public static defaultProps = Input.defaultProps;

    protected input: Input<I, V, P>;
    protected viewProps: I;

    public constructor(props: P) {
        super(props);
        this.input = new Input(props, (this.constructor as any).defaultProps);
        this.viewProps = this.input.getViewProps();
    }


    public componentWillReceiveProps(nextProps: P) {
        this.input.componentWillReceiveProps(nextProps);
        this.viewProps = this.input.getViewProps() as any;
    }

    public isValid(reValidate?: boolean, data?: Props) {
        return this.input.isValid(reValidate, data);
    }

    public onChange(value: V) {
        return this.input.onChange(value);
    }
}

export default StatelessInput;
