import Arrays from "wasabi-common/lib/types/Arrays";
import Objects from "wasabi-common/lib/types/Objects";

export interface ThemeCreator {
    (style: any): any
}
export default class Theme {
    private static StyleMap: any = {};
    public static set(style: any, ...keys: string[]) {
        let parent = Theme.StyleMap;
        let lastKey = "";
        Arrays.forEach(keys, (key: string) => {
            parent = parent[key];
            if(!parent) {
                parent = {};
                parent[key] = parent;
            }
            lastKey = key;
        });
        parent[lastKey] = Objects.merge(style, parent);
    }

    public static get(...keys: string[]): ThemeCreator {
        let parent = Theme.StyleMap;
        let lastKey = "";
        Arrays.forEach(keys, (key: string) => {
            parent = parent[key];
            if(!parent) {
                parent = {};
                parent[key] = parent;
            }
            lastKey = key;
        });
        return function (newStyle) {
            return Objects.merge(newStyle, parent[lastKey]);
        };
    }

    public static getGlobal(): any {
        return null
    }
}


