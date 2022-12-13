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

    /**
     * @param {Object} props 
     * @param {string} [props.id]
     * @param {string} props.userId
     * @param {string} props.name
     * @param {string} [props.description]
     * @param {boolean} [props.checked]
     * @param {Date} [props.createdAt]
     * @param {Date} [props.updatedAt]
     */
    constructor(props) {
        super();
        
        this.#id = props.id || this.generateID();
        this.#userId = props.userId;
        this.#name = props.name;
        this.#description = props.description;
        this.#checked = props.checked || false;
        this.#createdAt = props.createdAt || new Date();
        this.#updatedAt = props.updatedAt || new Date();

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

    uncheck() {
        if (this.#checked === false) {
            throw 'Task already unchecked';
        }

        this.#checked = false;
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