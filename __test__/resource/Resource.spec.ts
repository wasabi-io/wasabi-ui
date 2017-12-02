import Resource from "wasabi-ui/lib/resource/Resource";

describe("resource/Resource", () => {
    it("constructor", () => {
        let resource = new Resource({
            path: "users"
        });
    });

    it("get", () => {
        let resource = new Resource({
            path: "users"
        });
        resource.get()
    });

    it("post", () => {
        let resource = new Resource({
            path: "users"
        });
        // resource.post()
    });

    it("put", () => {
        let resource = new Resource({
            path: "users"
        });
        // resource.put()
    });

    it("delete", () => {
        let resource = new Resource({
            path: "users"
        });
        // resource.delete()
    });
});
