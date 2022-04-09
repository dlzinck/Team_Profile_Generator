const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const util = require('util');
const fs = require('fs');
const color = require('./color');
const writeFileAsync = util.promisify(fs.writeFile);
const newHTML = path.resolve(__dirname, 'New_HTML');
const htmlPath = path.join(newHTML, 'team.html');
const render = require('./lib/htmlRenderer');
const log = new color();

// Empty array for the constructor classes
const teamMembersArray = [];

// Introduction Question to open the applicaiton
const introQuestion = {
  type: 'list',
  message:
  `Welcome to the Team Profile Generator Application.
  This program will allow the you to create an HTML based team profile display that will outline the team members as well as some brief information on each team member. 
  You will be prompted to submit information on the team manager as well as select how many team members other than the manager are in the team. 
  You will then submit information for each team member, choosing if they are an engineer or intern and submit additional information based on the team member role selection. 
  Do you wish to continue with this application?`,
  choices: ['Yes', 'No'],
  name: 'introQ',
};

// Questions for the manager profile
const managerQuestions = [
  {
    type: 'input',
    message: "What is the Manager's name?",
    name: 'managerName',
  },
  {
    type: 'input',
    message: "What is the Manager's ID number?",
    name: 'managerId',
    validate: function (num) {
      numbers = /^[0-9]+$/.test(num);
      if (numbers){
        log.green(`----------ID Number Accepted----------`);
        return true;
      } else{
        log.red(`----------Please enter a valid ID Number that only includes numbers----------`
        );
        return false;
      }
    },
  },
  {
    type: 'input',
    message: "What is the Manager's email?",
    name: 'manageEmail',
    validate: function (emailInput) {
      emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        emailInput
      );

      if (emailFormat) {
        log.green(`----------Email Accepted----------`);
        return true;
      } else {
        log.red(`----------Please enter a valid email----------`);
        return false;
      }
    },
  },
  {
    type: 'input',
    message: "What is the Manager's office number?",
    name: 'managerOfficeNumber',
  },
];

// Question that prompts the user if they want to add another team member
const endManagerQuestions = {
  type: 'list',
  message:
    'Would you like to add another team member to this team? Select Yes to add an Engineer or Intern team member or select No if no additional team members need to be added.',
  choices: ['Yes', 'No'],
  name: 'teamSize',
};

// Question to ask which role the new team member is
const teamMemberRolePick = {
  type: 'list',
  message: 'Is this team member an Engineer or an Intern?',
  choices: ['Engineer', 'Intern'],
  name: 'teamMemberRoleType',
};

// Questions for the engineer profile
const engineerQuestions = [
  {
    type: 'input',
    message: "What is this Engineer's name?",
    name: 'enginnerName',
  },
  {
    type: 'input',
    message: "What is this Engineer's ID number?",
    name: 'engineerId',
    validate: function (num) {
      numbers = /^[0-9]+$/.test(num);

      if (numbers) {
        log.green(`----------ID Number Accepted----------`);
        return true;
      } else {
        log.red(`----------Please enter a valid ID Number that only includes numbers----------`
        );
        return false;
      }
    },
  },
  {
    type: 'input',
    message: "What is this Engineer's email?",
    name: 'engineerEmail',
    validate: function (emailInput) {
      emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        emailInput
      );
      if (emailFormat) {
        log.green(`----------Email Formatting Accepted----------`);
        return true;
      } else {
        log.red(`----------Please enter a valid email----------`);
        return false;
      }
    },
  },
  {
    type: 'input',
    message: "What is this Engineer's GitHub Profile Name?",
    name: 'engineerGithub',
  },
];

// Questions for the intern profile
const internQuestions = [
  {
    type: 'input',
    message: "What is this Intern's name?",
    name: 'internName',
  },
  {
    type: 'input',
    message: "What is this Intern's ID number?",
    name: 'internId',
    validate: function (num) {
      numbers = /^[0-9]+$/.test(num);
      if (numbers) {
        log.green(`----------ID Number Accepted----------`);
        return true;
      } else {
        log.red(`----------Please enter a valid ID Number that only includes numbers----------`
        );
        return false;
      }
    },
  },
  {
    type: 'input',
    message: "What is this Intern's email?",
    name: 'internEmail',
    validate: function (emailInput) {
      emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        emailInput
      );

      if (emailFormat) {
        log.green(`----------Email Accepted----------`);
        return true;
      } else {
        log.red(`----------Please enter a valid email----------`);
        return false;
      }
    },
  },
  {
    type: 'input',
    message: "What is this Intern's School?",
    name: 'internSchool',
  },
];