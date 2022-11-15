import TodoValidator from '../validator/todo.validator.js';

export default class Todo {
    #id;
    #userId;
    #name;
    #description;
    #checked;
    #createdAt;
    #updatedAt;

    constructor(id, userId, name, description, checked, createdAt, updatedAt) {
        this.#id = id;
        this.#userId = userId;
        this.#name = name;
        this.#description = description;
        this.#checked = checked || false;
        this.#createdAt = createdAt || new Date();
        this.#updatedAt = updatedAt || new Date();

        this.validate();
    }

    validate() {        
        // TODO extrair propriedades de this
        TodoValidator.validate(this);
    }

    get id() {
        return this.#id;
    }

    get userId() {
        return this.#userId;
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