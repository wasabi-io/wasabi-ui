import React from "react";
import PropTypes from "prop-types";
import FormManager from "./FormManager";
import Stateful from "../Stateful";
import InputElement, { FormItem, FormItemCallback, FormItemProps } from "./AbstractFormElement";
import Objects from "wasabi-common/lib/types/Objects";

export interface FormCallback {
    <T>(name: string, newValue: T, oldValue: T, item: {
        [key: string]: any
    }): boolean
}

export interface FormProps {
    fields: FormItemProps[],
    propsOfFields?: {
        [key: string]: {
            [key: string]: any
        }
    },
    onChange?: FormCallback
    autoValidate?: boolean
}

export interface FormState {
    [key: string]: any
}

export interface FormInputProps {
    fields: {
        [key: string]: FormItemProps
    }
}

class AbstractForm extends Stateful<FormProps, FormState>{
    private inputProps: FormInputProps;
    public static propTypes = {
        fields: PropTypes.arrayOf(PropTypes.object),
        propsOfFields: PropTypes.object,
        onChange: PropTypes.func,
        autoValidate: PropTypes.bool
    };
    public static defaultProps = {
        fields: [] as any[],
        propsOfFields: {},
        autoValidate: false
    };
    public constructor(props: FormProps) {
        super(props);
        this.inputProps = {
            fields: {}
        };
        this.state = AbstractForm.initFieldProps(this.inputProps, props, this.onChange);
    }
    public componentWillReceiveProps(nextProps: FormProps) {
        this.state = AbstractForm.initFieldProps(this.inputProps, nextProps, this.onChange);
    }
    /**
     * Configures all input elements and add them to the JSX.Element array.
     * @returns {JSX.Element[]}
     */
    protected renderItems(): JSX.Element[] {
        let elements: JSX.Element[] = [];
        for (let i = 0; i < this.props.fields.length; i++) {
            let field = this.props.fields[i];
            let inputElement: FormItemProps = this.inputProps.fields[field.name];
            let Component = inputElement.component;
            inputElement.props.value = this.state[field.name];
            elements.push(<Component ref={field.name} key={field.name} autoValidate={this.props.autoValidate} {...inputElement.props} />);
        }
        return elements;
    }

    /**
     * Triggered if any element change.
     * @param name
     * @param value
     */
    private onChange = (name: string, value: any) => {
        let changeState = true;
        let item: any = Objects.clone(this.state);
        item[name] = value;
        if (this.props.onChange) {
            changeState = this.props.onChange(name, value, this.state[name], item);
        }
        let newItem: any = {};
        newItem[name] = value;
        if (changeState) {
            this.setState(newItem);
        }
    };

    public getValues() {
        return this.state
    }

    public isValid(): boolean {
        return Objects.forEach(this.refs, (ref: FormItem<FormItemProps, any>) => {
            return ref.isValid();
        })
    }

    public static initFieldProps(innerPropsRef: FormInputProps, componentProps: FormProps, onChangeCallbackForm: FormItemCallback): any {
        let state: any = {};
        for (let i = 0; i < componentProps.fields.length; i++) {
            let field: FormItemProps = componentProps.fields[i];
            let additionalFieldProps = componentProps.propsOfFields && componentProps.propsOfFields[field.name];
            let fieldElementProp = AbstractForm.initFieldProp(field, additionalFieldProps, onChangeCallbackForm);
            innerPropsRef.fields[field.name] = fieldElementProp;
            state[field.name] = fieldElementProp.props.value;
        }
        return state;
    }

    public static initFieldProp(field: FormItemProps, additionalFieldProps: { [key: string]: any }, onChangeCallbackForm: FormItemCallback): FormItemProps {

        let fieldElement: InputElement = FormManager.get(field.type);
        let { onChange, type, name, ...props } = field;
        let fieldElementProp: FormItemProps = {
            name,
            component: fieldElement.component,
            type: type,
            onChange: onChange,
            props: {
                name,
                ...props,
                onChange: onChangeCallbackForm
            }
        };
        if (additionalFieldProps) {
            fieldElementProp.props = Objects.mergeDefaults(fieldElementProp.props, additionalFieldProps);
        }

        if (fieldElement.defaultProps) {
            fieldElementProp.props = Objects.mergeDefaults(fieldElement.defaultProps, fieldElementProp.props);
        }
        return fieldElementProp;
    }
}

export default AbstractForm;
