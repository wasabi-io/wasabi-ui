import * as React from "react";
import {SFC} from "react";
import {Types} from "wasabi-common";
import Binder from "wasabi-common/lib/lang/Binder";
import Generator from "wasabi-common/lib/util/Generator";

/**
 * Base Stateless Component which wraps render function in a try catch structure
 * Any child components who extends from this component will get protection when
 * Exception thrown, so protect component life cycle.
 */

export interface StatelessFC<P = {}, FP = {}> extends SFC<P> {
    render?(fp?: FP): string | JSX.Element | JSX.Element[];
}

abstract class Stateless<P extends Readonly<P>> extends React.Component<P, {}> {
    /**
     *
     */
    public refs: {
        [key: string]: any;
    };
    /* tslint:disable */
    protected _id: string = Generator.guid();

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
     * @param { any } nextState
     * @returns {boolean} "true" component shoud update ,"false" otherwise.
     */
    public shouldComponentUpdate(nextProps?: P, nextState?: any): boolean {
        return !Types.equals(nextProps, this.props);
    }

    public get id(): string {
        return this._id;
    }
}

export default Stateless;
