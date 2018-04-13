const uuidv4 = require('uuid/v4');

export class Todo {

    constructor({id = uuidv4(), content = '', checked = false}) {
        this.id = id;
        this.content = content;
        this.checked = checked;
    }

}