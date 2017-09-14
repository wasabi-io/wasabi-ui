import Stateful from "../Stateful";

export interface FormItemCallback {
    (name: string, value: any): any
}

export interface FormItemProps {
    name: string,
    type?: string,
    value?: any,
    onChange?: FormItemCallback,

    [key: string]: any
}

export interface FormElements {
    [key: string]: FormElement
}

export interface FormItem<P extends FormItemProps, S extends {}>extends Stateful<P, S> {
    isValid(): boolean
}

export interface FormElement {
    /**
     * Refers classes of input components.
     */
    component: React.ComponentClass<FormItemProps>,
    /**
     * Refers default props of the given component class.
     */
    defaultProps?: {
        [key: string]: any
    }
}

export default FormElement;
