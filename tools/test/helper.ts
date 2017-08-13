import { resolve } from "path";
import { addBaseUrl, addModule } from "wasabi-common/lib/util/Resolver";
addBaseUrl(resolve("../../"));
addModule("src");
import * as chai from "chai";
import * as chaiEnzyme from "chai-enzyme";
chai.use(chaiEnzyme()); // Note the invocation at the end


