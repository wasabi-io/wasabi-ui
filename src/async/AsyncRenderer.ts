import * as React from "react";
import {asEs6Module} from "wasabi-common";
import {Props} from "wasabi-common/lib/types/Objects";
import Stateless from "../Stateless";

export interface AsyncLoaderProps {
    loading: JSX.Element;
    moduleName?: string;
    renderer: Promise<React.ComponentClass<any>>;
    componentProps: Props;
}

export default class AsyncRenderer extends Stateless<AsyncLoaderProps> {
    private Component: React.ComponentClass;
    private renderer: Promise<React.ComponentClass<any>>;

    public constructor(props: AsyncLoaderProps) {
        super(props);
    }

    public render(): JSX.Element {
        if (!this.Component) {
            return (
                this.props.loading
            );
        }
        return React.createElement(this.Component, this.props.componentProps);
    }

    public componentDidMount() {
        this.loadComponent();
    }

    public componentDidUpdate() {
        if (this.renderer !== this.props.renderer) {
            this.loadComponent();
        }
    }

    private loadComponent() {
        this
            .props
            .renderer
            .then((module) => {
                this.Component = asEs6Module(module, this.props.moduleName);
                this.renderer = this.props.renderer;
                this.forceUpdate();
            });
    }
}
