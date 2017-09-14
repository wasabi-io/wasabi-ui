import Resolver from "wasabi-common/lib/resolver";
import * as chai from "chai";
import {expect} from "chai";
import * as chaiEnzyme from "chai-enzyme";
import {spy} from 'sinon';
import {mount, render, shallow} from 'enzyme';

Resolver
    .electron()
    .root("src")
    .alias("wasabi-ui/lib/*", "./")
    .apply();

chai.use(chaiEnzyme()); // Note the invocation at the end

(global as any).expect = expect;
(global as any).spy = spy;

(global as any).mount = mount;
(global as any).render = render;
(global as any).shallow = shallow;
