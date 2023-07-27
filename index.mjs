// Modulos externos
import inquirer from 'inquirer';
import chalk from 'chalk';

// Modulos internos
import fs from 'fs';

operation();

function operation(){


        inquirer.prompt([{
            type: 'list',
            name: 'action',
            message: 'O que deseja fazer?',
            choices: [
                    'Criar Conta',
                    'Consultar Saldo',
                    'Depositar',
                    'Sacar',
                    'Sair' 
                    ]
    }]) 
    .then((answer) => {
        const action = answer['action'];

        if (action ==='Criar Conta') {
            createAccount();
        }
    })
    .catch((err) => console.log(err))
}

function createAccount() {
    console.log(chalk.bgBlue.black('Bem vindo ao nosso banco'));
    console.log(chalk.green('Defina sua conta:'));
    buildAccount();  
}

function buildAccount() {

        inquirer.prompt([
            { 
            name: 'AccountName',
            message: 'Digite um nome para sua conta.'
            },
        ])
        .then((answer) => {
            console.log(answer);
        })
        .catch((err) => console.log(err));
    }
    