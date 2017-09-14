import Map from "wasabi-common/lib/collection/Map";
import {Props} from "wasabi-common/lib/types/Objects";

export class Theme extends Map<string, Props | Theme> {
    /**
     *
     * @param {K} keys
     * @returns {V}
     */
    public get<S extends Props | Theme>(...keys: string[]): S {
        let parent: any = this;
        do {
            let key = keys.shift();
            parent = super.get(key);
        } while (parent instanceof Theme);
        return parent;
    }

    /**
     *
     * @param {K} key
     * @param {V} def
     * @returns {V}
     */
    public getOrDefault<S extends Props | Theme>(key: string, def: S): S {
        return super.getOrDefault(key, def) as S;
    }
}

const theme = new Theme();

