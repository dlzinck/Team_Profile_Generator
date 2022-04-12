const Manager = require('./LIB/Manager');
const Engineer = require('./LIB/Engineer');
const Intern = require('./LIB/Intern');
const inquirer = require('inquirer');
const path = require('path');
const util = require('util');
const fs = require('fs');
const Color = require('./color');
const writeFileAsync = util.promisify(fs.writeFile);
const newHTML = path.resolve(__dirname, 'New_HTML');
const htmlPath = path.join(newHTML, 'team.html');
const render = require('./LIB/htmlRender');
const log = new Color();

// Empty array for the constructor classes
const teamMembersArray = [];

// Introduction question to open the applicaiton
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
    name: 'engineerName',
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

// Initial function that asks if the user wants to build the team and prints the introduction message
function intro() {
  inquirer.prompt(introQuestion).then((appStart) => {
    if (appStart.introQ === 'Yes') {
      log.green('Please Submit Manager Profile Information');
      managerInfo();
    } else {
      log.yellow(`
        ------------------------------------------------------------
        ---------------------Application Closed---------------------
        ------------------------------------------------------------
            `);
    }
  });
}

// Function to build the team manager
function managerInfo() {
  inquirer.prompt(managerQuestions).then((managerBuild) => {
    let manager = new Manager(
      managerBuild.managerName,
      managerBuild.managerId,
      managerBuild.manageEmail,
      managerBuild.managerOfficeNumber
    );
    teamMembersArray.push(manager);
    console.log(teamMembersArray);
    // The teamSizeInfo function is then called to start building the team
    teamSizeInfo();
  });
}

// Function to determine the size of the team with additional engineers or interns
function teamSizeInfo() {
  inquirer.prompt(endManagerQuestions).then((teamSize) => {
    console.log(teamSize);
    // Choosing yes you add another team member to the array.
    if (teamSize.teamSize === 'Yes') {
      teamMemberLoop();
    }
    if (teamSize.teamSize === 'No') {
      // Choosing no you don't add new members, then the application is ended and html is written
      renderHTML(teamMembersArray);
    }
  });
}

// Function to choose the engineer or intern and prompt questions to build additional class constructors
function teamMemberLoop() {
  inquirer.prompt(teamMemberRolePick).then((teamrole) => {
    if (teamrole.teamMemberRoleType === 'Engineer') {
      log.blue('Please Submit Engineer Profile Information');
      inquirer.prompt(engineerQuestions).then((engineerBuild) => {
        let engineer = new Engineer(
          engineerBuild.engineerName,
          engineerBuild.engineerId,
          engineerBuild.engineerEmail,
          engineerBuild.engineerGithub
        );
        teamMembersArray.push(engineer);
        teamSizeInfo();
      });
    } else if (teamrole.teamMemberRoleType === 'Intern') {
      log.magenta('Please Submit Intern Profile Information');
      inquirer.prompt(internQuestions).then((internBuild) => {
        let intern = new Intern(
          internBuild.internName,
          internBuild.internId,
          internBuild.internEmail,
          internBuild.internSchool
        );
        teamMembersArray.push(intern);
        teamSizeInfo();
      });
    }
  });
}

// Function to write array information to HTML templates when no more team members are added to the application
function renderHTML() {
  const htmlProfilePage = render(teamMembersArray);
  writeFileAsync(htmlPath, htmlProfilePage).then(function () {
    log.green(`-------Team Profile Completed-------`);
  });
}

// Calls intro function to start application.
intro();