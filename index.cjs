// Modulos externos
const inquirerPromise = import('inquirer');
const chalk = import('chalk');



// Modulos internos
const fs = require('fs');

operation();

function operation(){

    inquirerPromise.then((module) => {

        const inquirer = module.default;

        inquirer.prompt([{
            type: 'list',
            name: 'action',
            message: 'O que deseja fazer?',
            choices: ['Criar Conta',
                    'Consultar Saldo',
                    'Depositar',
                    'Sacar',
                    'Sair' ]
    }])
})
     
    .then()
    .catch((err) => console.log(err))

}

