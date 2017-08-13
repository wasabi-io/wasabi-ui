import * as React from "react";
import Component, {State} from "./Component";

/**
 * Base Stateless Component which wraps render function in a try catch structure
 * Any child components who extends from this component will get protection when
 * Exception thrown, so protect component life cycle.
 */

abstract class Stateless<P extends Readonly<P>> extends Component<P, State> {

}

export default Stateless;

