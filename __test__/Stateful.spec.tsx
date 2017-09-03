import * as React from 'react';
import {expect} from 'chai';
import {mount, render, shallow} from 'enzyme'
import Stateful from 'wasabi-ui/lib/Stateful';

describe("Stateful", () => {
    it("constructor", () => {
        expect(true).to.be.true;

        interface MyComponentProps {
            value: string
        }

        interface MyComponentState {

        }

        class MyComponent extends Stateful<MyComponentProps, MyComponentState> {
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
            items: string[]
        }
        interface WrapperState {

        }

        class MyComponent extends Stateful<MyComponentProps, WrapperState> {
            render() {
                return (
                    <div>
                        <div id="value">${this.props.value}</div>
                        <div id="items">
                            { this.props.items.map((item) => {
                                return (
                                    <div>item</div>
                                );
                            })}
                        </div>
                    </div>
                );
            }
        }

        interface WrapperState {
            value: string,
            items: string[]
        }

        class Wrapper extends Stateful<{}, WrapperState> {
            public constructor(props: {}) {
                super(props);
                this.state = {
                    value: "Step 1",
                    items: []
                }
            }
            render(): JSX.Element {
                return (
                    <MyComponent value={this.state.value} items={this.state.items} />
                )
            }
        }

        const wrapper = mount(<Wrapper />); // mount/render/shallow when applicable
        let componentWrapper = wrapper.find(MyComponent);
        expect(componentWrapper).to.have.tagName("div");
        expect(componentWrapper.find("#value")).to.text("$Step 1");
        expect(componentWrapper.find("#items").children()).to.have.length(0);

        wrapper.setState({ value: 'Step 2', items: ["Test"] });
        componentWrapper = wrapper.find(MyComponent);
        expect(componentWrapper).to.have.tagName("div");
        expect(componentWrapper.find("#value")).to.text("$Step 2");
        expect(componentWrapper.find("#items").children()).to.have.length(1);
    });
});