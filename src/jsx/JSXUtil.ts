import * as ClassNames from "classnames";
import {ValidationMap} from "prop-types";
import * as React from "react";
import Arrays from "wasabi-common/lib/types/Arrays";

export interface DynamicCompProps<P> {
    tag: string;
    displayName?: string;
    className?: (p: P) => string[];
    propTypes?: ValidationMap<P>;
    defaultProps?: Partial<P>;
}

export default class JSXUtil {
    public static isJsx(obj: any) {
        if (obj == null) { return null; }
        return React.Component.prototype.isPrototypeOf((obj.type).prototype);
    }

    public static combineClasses(clazzNames: string[], className: string): string {
        if (Arrays.has(clazzNames)) {
            clazzNames.push(className);
            return ClassNames(clazzNames);
        }
        return className;
    }

    public static createComponent<P extends  React.HTMLAttributes<HTMLElement>>(dynProps: DynamicCompProps<P>) {
        const CompClass: React.SFC<P> = (props: P) => {
            const {className, ...inputProps} = props as any;
            const classNames = dynProps.className ? dynProps.className(props) : undefined;
            return React.createElement(
                dynProps.tag,
                {
                    ...inputProps,
                    className: JSXUtil.combineClasses(classNames, className)
                },
                props.children
            );
        };

        CompClass.displayName = dynProps.displayName;
        CompClass.propTypes = dynProps.propTypes;
        CompClass.defaultProps = dynProps.defaultProps;
    }
}
