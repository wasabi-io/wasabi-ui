import PropTypes from "prop-types";
import Input, {InputProps, InputState} from "./Input";
import Stateful from "../Stateful";
import {Props} from "wasabi-common/lib/types/Objects";

abstract class StatefulInput<I, S, V = any, P = I & InputProps<V>> extends Stateful <P, S> {
    public static propTypes = Input.propTypes;
    public static defaultProps = Input.defaultProps;

    private input: Input<I, V, P>;
    private viewProps: I;

    public constructor(props: P) {
        super(props);
        this.input = new Input(props, (this.constructor as any).defaultProps);
        this.viewProps = this.input.getViewProps();
    }

    public componentWillReceiveProps(nextProps: P) {
        this.input.componentWillReceiveProps(nextProps);
        this.viewProps = this.input.getViewProps();
    }

    public isValid(reValidate?: boolean, data?: Props) {
        return this.input.isValid(reValidate, data);
    }

    public onChange(value: V) {
        return this.input.onChange(value);
    }
}

export default StatefulInput;
