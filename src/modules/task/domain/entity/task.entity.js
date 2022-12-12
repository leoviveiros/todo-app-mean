const BaseEntity = require('../../../shared/domain/base.entity.js');
const TaskValidator = require('../validator/task.validator.js');

class Task extends BaseEntity {
    #id;
    #userId;
    #name;
    #description;
    #checked;
    #createdAt;
    #updatedAt;

    constructor(id, userId, name, description, checked, createdAt, updatedAt) {
        super();
        
        this.#id = id || this.generateID();
        this.#userId = userId;
        this.#name = name;
        this.#description = description;
        this.#checked = checked || false;
        this.#createdAt = createdAt || new Date();
        this.#updatedAt = updatedAt || new Date();

        this.#validate();
    }

    #validate() {        
        TaskValidator.validate(this.getProperties());
    }

    check() {
        if (this.#checked === true) {
            throw 'Task already checked';
        }
        
        this.#checked = true;
        this.#updatedAt = new Date();
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

    set name(value) {
        this.#name = value;

        this.#validate();
    }

    get description() {
        return this.#description
    }

    set description(value) {
        this.#description = value;
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

module.exports = Task;