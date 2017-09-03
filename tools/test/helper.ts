import Resolver from "wasabi-common/lib/resolver";

Resolver
    .electron()
    .root("src")
    .alias("wasabi-ui/lib/*", "./")
    .apply();

import * as chai from "chai";
import * as chaiEnzyme from "chai-enzyme";
chai.use(chaiEnzyme()); // Note the invocation at the end

import { expect } from 'chai';
import { spy } from 'sinon';
import { mount, render, shallow } from 'enzyme';

(global as any).expect = expect;
(global as any).spy = spy;

(global as any).mount = mount;
(global as any).render = render;
(global as any).shallow = shallow;
