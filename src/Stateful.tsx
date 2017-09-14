import * as React from "react";
import {Types} from "wasabi-common";
import {Props} from "wasabi-common/lib/types/Objects";
import Binder from "wasabi-common/lib/lang/Binder";

/**
 * Base component which wraps render function in a try catch structure
 * Any child components who extends from this component will get protection when
 * Exception thrown, so protect component life cycle.
 */

abstract class Stateful<P extends Readonly<P>, S extends Props> extends React.Component<P, {}> {
    state: S;
    /**
     *
     */
    public refs: {
        [string: string]: any
    };

    /**
     * Creates an instance of BaseComponent.
     * @param {Object} props
     * @param {any} context
     */
    public constructor(props: P, context?: any) {
        super(props, context);
        Binder.bindAll(this);
    }

    /**
     * Decides ant update is necessary for re-rendering.
     * Compares old props and state objects with the newer ones without going deep.
     * @param {Object} nextProps
     * @param {Object} nextState
     * @returns {boolean} "true" component shoud update ,"false" otherwise.
     */
    public shouldComponentUpdate(nextProps: any, nextState: any): boolean {
        return !Types.equals(nextProps, this.props) || !Types.equals(nextState, this.state)
    }
}

export default Stateful;