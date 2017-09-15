import {expect} from "chai";
import Errors from "wasabi-ui/lib/error/Errors";


describe("app/index", () => {
    it("new", () => {
        let result = Errors.new(401, "Test Error");
        expect(result.code).to.be.eq(401);
        expect(result.message).to.be.eq("Test Error");
    });

    it("throw", () => {

    });

    it("error", () => {

    })
});