import * as React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme'
import Stateless from "wasabi-ui/lib/Stateless";

describe("Stateless", () => {
    it("constructor", () => {
        expect(true).to.be.true;

        interface MyComponentProps {
            value: string
        }

        class MyComponent extends Stateless<MyComponentProps> {
            render() {
                return (
                    <div>${this.props.value}</div>
                );
            }
        }

        const wrapper = mount(<MyComponent value="Deneme"/>); // mount/render/shallow when applicable
        expect(wrapper).to.have.tagName('div');
        expect(wrapper.find('div')).to.text("$Deneme");
    });
    it("shouldComponentUpdate", () => {
        expect(true).to.be.true;

        interface MyComponentProps {
            value: string
        }

        class MyComponent extends Stateless<MyComponentProps> {
            render() {
                return (
                    <div>${this.props.value}</div>
                );
            }
        }

        const wrapper = mount(<MyComponent value="Deneme"/>); // mount/render/shallow when applicable
        expect(wrapper).to.have.tagName('div');
        expect(wrapper.find('div')).to.text("$Deneme");
    });
});