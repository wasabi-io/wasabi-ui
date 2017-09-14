import Resource, {ResourceProps, ResourceResponse} from "./Resource";
import {default as Objects, Props} from "wasabi-common/lib/types/Objects";

export interface CrudResourceProps extends ResourceProps {
    idKey?: string
}

export default class CrudResource<E extends Props, I = any> extends Resource {
    private static defaultProps: CrudResourceProps = {
        idKey: "oid"
    };

    public constructor(props: CrudResourceProps) {
        super(props);
    }

    public static setup(props: CrudResourceProps) {
        let {
            idKey,
            ...resourceProps
        } = props;
        CrudResource.defaultProps = Objects.mergeDefaults(CrudResource.defaultProps, {
            idKey
        });
        Resource.setup(resourceProps);
    }

    public findById(oid: I): Promise<E> {
        return super
            .get(oid + "")
            .then((response: ResourceResponse<E>) => response.data);
    }

    public findAll(): Promise<Array<E>> {
        return super
            .get()
            .then((response: ResourceResponse<Array<E>>) => response.data);
    }

    public create(entity: E): Promise<E> {
        return super
            .post(entity)
            .then((response: ResourceResponse<E>) => response.data);
    }

    public update(entity: E): Promise<E> {
        return super
            .put(entity)
            .then((response: ResourceResponse<E>) => response.data);
    }

    public remove(entity: E): Promise<E> {
        return this.removeById(entity[CrudResource.defaultProps.idKey]);
    }

    public removeById(oid: I): Promise<E> {
        return super
            .delete(oid + "")
            .then((response: ResourceResponse<E>) => response.data);
    }
}
