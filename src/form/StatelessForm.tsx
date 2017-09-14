import React from "react";
import Stateless from "../Stateless";
import {AbstractFormProps} from "./AbstractForm";


abstract class StatelessForm<P extends AbstractFormProps> extends Stateless<P> {

    public constructor(props: P, context?: any) {
        super(props, context);
        this.componentWillReceiveProps(props);
    }

    public componentWillReceiveProps(nextProps: P) {

    }
}