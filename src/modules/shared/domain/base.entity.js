
export default class BaseEntity {

    getProperties() {
        return Object.entries(Object.getOwnPropertyDescriptors(Reflect.getPrototypeOf(this)))
            .filter(e => typeof e[1].get === 'function' && e[0] !== '__proto__')
            .map(e => e[0])
            .reduce((result, key) => {
                result[key] = this[key];
                return result;
            }, {})
    }

}