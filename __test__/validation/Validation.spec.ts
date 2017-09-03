import {expect} from "chai";
import validation from "wasabi-ui/lib/validation/Validation";
import {Props} from "wasabi-common/lib/types/Objects";
import {has} from "wasabi-common";

describe("validation/Checker", () => {

    it("put", () => {
        const errorMessage = "${value} is not valid email!";
        const expectedMessage = "test is not valid email!";
        const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        // put CheckerWithMessage
        validation.put("email", {
            message: errorMessage,
            fn: (value: string) => {
                return emailRegex.test(value);
            }
        });

        let result = validation.check("email", "test");
        expect(result).to.be.eq(expectedMessage);
        result = validation.check("email", "test@test.com");
        expect(result).to.be.undefined;

        // put CheckerAsString
        validation.put("email", (value: string): string => {
            return emailRegex.test(value) ? undefined : errorMessage;
        });
        result = validation.check("email", "test");
        expect(result).to.be.eq(expectedMessage);
        result = validation.check("email", "test@test.com");
        expect(result).to.be.undefined;

    });

    it("get", () => {
        let exampleChecker = validation.get("exampleChecker");
        expect(exampleChecker).to.be.undefined;
        let requiredChecker = validation.get("required");
        expect(requiredChecker).to.be.exist;
        expect(requiredChecker.message).to.be.exist;
        expect(requiredChecker.fn).to.be.exist;
    });

    it("check", () => {
        let result = validation.check("required", "");
        expect(typeof result).to.be.eq("string");

        let expectedMessage = "Its not valid !";
        result = validation.check((value: string) => {
            return expectedMessage;
        }, "");
        expect(result).to.be.eq(expectedMessage);

        let messageTemplate = "${name} is not valid";
        expectedMessage = "Email is not valid";
        result = validation.check((value: string) => {
            return messageTemplate;
        }, "", {
            name: "Email"
        });
        expect(result).to.be.eq(expectedMessage);

        validation.check({
            message: messageTemplate,
            fn: (value: string) => {
                return false;
            }
        }, "", {
            name: "Email"
        });
        expect(result).to.be.eq(expectedMessage);


        validation.check({
            message: "${name} is global message",
            fn: (value: string) => {
                return false;
            }
        }, "", {
            name: "Email"
        }, undefined, messageTemplate);
        expect(result).to.be.eq(expectedMessage);


        validation.check({
            message: "${name} is global message",
            fn: (value: string, data: Props) => {
                return value == data.f;
            }
        }, "value", {
            name: "Email"
        }, {
            f: "anotherValue"
        }, messageTemplate);
        expect(result).to.be.eq(expectedMessage);

    });

    it("setMessage", () => {
        // old required message = ${name} is required;
        validation.put("myFunc", {
            message: "${name} is required",
            fn: (value: any) => {
                return has(value);
            }
        });

        let result = validation.check("myFunc", "this is email");
        expect(result).to.be.undefined;

        result = validation.check("myFunc", undefined, {name: "Email"});
        let expectedMessage = "Email is required";
        expect(result).to.be.eq(expectedMessage);

        validation.setMessage("myFunc", "${name} is required field !");

        result = validation.check("myFunc", undefined, {name: "Email"});
        expectedMessage = "Email is required field !";
        expect(result).to.be.eq(expectedMessage);
    });

    it("setMessages", () => {
        // old required message = ${name} is required;
        validation.put("myFunc", {
            message: "${name} is required",
            fn: (value: any) => {
                return has(value);
            }
        });

        let result = validation.check("myFunc", "this is email");
        expect(result).to.be.undefined;

        result = validation.check("myFunc", undefined, {name: "Email"});
        let expectedMessage = "Email is required";
        expect(result).to.be.eq(expectedMessage);

        validation.setMessages({
            myFunc: "${name} is required field !"
        });

        result = validation.check("myFunc", undefined, {name: "Email"});
        expectedMessage = "Email is required field !";
        expect(result).to.be.eq(expectedMessage);
    })
});