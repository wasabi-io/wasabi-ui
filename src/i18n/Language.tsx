import Tree from "wasabi-common/lib/collection/Tree";
import {Props} from "wasabi-common/lib/types/Objects";
import Strings from "wasabi-common/lib/types/Strings";
import {has} from "wasabi-common";

export class TemplateString {
    private value: string;

    public constructor(value: string) {
        this.value = value;
    }

    public toString(props?: Props) {

        if (!props) {
            return this.value.toString()
        }
        return Strings.template(this.value, props)
    }
}

export class Language extends Tree<string> {

    public tree(...keys: string[]): Language {
        return new Language(this.get.apply(this, keys));
    }

    public find(...keys: string[]): TemplateString {
        let value = this.value.apply(this, keys);
        if (!has(value)) {
            return new TemplateString("");
        }
        return new TemplateString(String(value))
    }
}

const language = new Language();

export default language;

