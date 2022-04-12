const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(id, name, email, github){
        super(id, name, email);
        this.role = 'Engineer';
        this.github = github;
    }
    getGitHub(){
        return this.github;
    }
    getRole(){
        return 'Engineer';
    }
}
module.exports = Engineer;