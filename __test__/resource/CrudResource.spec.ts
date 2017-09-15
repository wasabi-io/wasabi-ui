import CrudResource from "wasabi-ui/lib/resource/CrudResource";

describe("resource/CrudResource", () => {
    it("constructor", () => {
        let resource = new CrudResource({
            path: "users"
        });

    });

    it("findAll", () => {
        let resource = new CrudResource({
            path: "users"
        });
        // resource.post()
    });

    it("findById", () => {
        let resource = new CrudResource({
            path: "users"
        });
        // resource.post()
    });

    it("create", () => {
        let resource = new CrudResource({
            path: "users"
        });
        // resource.post()
    });

    it("update", () => {
        let resource = new CrudResource({
            path: "users"
        });
        // resource.post()
    });

    it("remove", () => {
        let resource = new CrudResource({
            path: "users"
        });
        // resource.post()
    });

    it("removeById", () => {
        let resource = new CrudResource({
            path: "users"
        });
        // resource.post()
    });

    it("get", () => {
        let resource = new CrudResource({
            path: "users"
        });
        resource.get()
    });

    it("post", () => {
        let resource = new CrudResource({
            path: "users"
        });
        // resource.post()
    });

    it("put", () => {
        let resource = new CrudResource({
            path: "users"
        });
        // resource.put()
    });

    it("delete", () => {
        let resource = new CrudResource({
            path: "users"
        });
        // resource.delete()
    });
});