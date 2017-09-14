import {expect} from "chai";
import language from "wasabi-ui/lib/i18n/Language";

describe("collection/Tree", () => {
    it("constructor", () => {
        expect(language.get()).to.be.deep.eq({});
        expect(language.get()).to.be.deep.eq({});
        let obj = {
            key1: {
                childOfKey1: ""
            },
            key2: ""
        };
        language.putAll(obj);
        expect(language.get()).to.be.deep.eq(obj);
        language.clear();
    });

    it("tree", () => {
        let template = "${name} not found";
        language.putAll({
            "errors": {
                401: {
                    "not": template
                }
            }
        });
        let result = language.tree("errors").find("401.not");
        expect(result.toString()).to.be.eq(template);
        expect(result.toString({
            name: "Gol D. Roger"
        })).to.be.eq("Gol D. Roger not found")
        language.clear();
    });

    it("find", () => {
        let template = "${name} not found";
        language.putAll({
            "errors": {
                401: {
                    "not": template
                }
            }
        });
        let result = language.find("errors", "401", "not");
        expect(result.toString()).to.be.eq(template);
        result = language.tree("errors").find("401", "not");
        expect(result.toString()).to.be.eq(template);
        expect(result.toString({
            name: "Gol D. Roger"
        })).to.be.eq("Gol D. Roger not found");
        language.clear();
    })
});
