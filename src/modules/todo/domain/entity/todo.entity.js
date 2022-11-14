export class Todo {
    #id;
    #name;
    #description;
    #checked;
    #createdAt;
    #updatedAt;

    constructor(id, name, description, checked, createdAt, updatedAt) {
        this.#id = id;
        this.#name = name;
        this.#description = description;
        this.#checked = checked || false;
        this.#createdAt = createdAt || new Date();
        this.#updatedAt = updatedAt || new Date();

        this.validate();
    }

    validate() {

    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get description() {
        return this.#description
    }

    get checked() {
        return this.#checked;
    }

    get createdAt() {
        return this.#createdAt;
    }

    get updatedAt() {
        return this.#updatedAt;
    }

}