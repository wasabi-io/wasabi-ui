import { Objects } from "wasabi-common";
import FormElement, { FormElements } from "./AbstractFormElement";

export default class FormManager {
    /**
     * Holds the given elements
     * @type {{}}
     */
    private static ELEMENT_MAP: {
        [key: string]: FormElement
    } = {};

    /**
     * Gets an element by the given key
     * @param key
     * @returns {Element}
     */
    public static get(key: string): FormElement {
        return FormManager.ELEMENT_MAP[key];
    }

    /**
     * Adds an element to the elements map by the given key
     * @param key
     * @param element
     */
    public static add(key: string, element: FormElement) {
        FormManager.ELEMENT_MAP[key] = element;
    }

    /**
     * Adds the given elements to the elements map.
     * @param elements
     */
    public static addAll(elements: FormElements) {
        Objects.forEach(elements, (item: FormElement, key: string) => {
            FormManager.add(key, item);
        });
    }
}

