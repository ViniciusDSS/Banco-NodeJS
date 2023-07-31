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
        } else if (action ==='Consultar Saldo'){
            getAccountBalance();

        } else if (action === 'Depositar'){
            deposit();
 
        } else if (action === 'Sacar'){
            withdraw();

        } else if (action === 'Sair'){
            console.log(chalk.bgBlue.black('Obrigado por usar nosso Banco!'))
            process.exit()
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
            name: 'accountName',
            message: 'Digite um nome para sua conta.'
            },
        ])
        .then((answer) => {
            const accountName = answer['accountName'];
            console.info(accountName);
            
            if (!fs.existsSync('accounts')){
                fs.mkdirSync('accounts'); 
            }

            if (fs.existsSync(`accounts/${accountName}.json`)) {
                console.log(chalk.bgRed('Esta conta já existe!')
                )

           buildAccount()
           return    
        }

        fs.writeFileSync(`accounts/${accountName}.json`,'{"balance": 0}',
        function(err){
            console.log(err);
        },
      )

      console.log(chalk.blue('Conta criada com sucesso!'))
     
    })
        .catch((err) => console.log(err));
    }
    

    function deposit(){

        inquirer.prompt([
            {   
            name: 'accountName',
            message: 'Qual nome da sua conta?'
            }
        ])
        .then((answer) => {

            const accountName = answer['accountName'];
            
            if(!checkAccount(accountName)){
                return deposit();
            }

            inquirer.prompt([
                {
                    name: "amount",
                    message: 'Valor',
                },
            ])
            .then((answer) => {

                const amount = answer['amount'];

                addAmount(accountName, amount);
                operation();
            })
            .catch(err => console.log(err));

        })
        .catch(err => console.log(err))

    }

    function checkAccount(accountName) {
        
        if(!fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Esta conta não existe. Tente novamente.'))
            return false;
        }
        
        return true;
    }

    function addAmount(accountName, amount){

        const accountData = getAccount(accountName);

        if (!amount) {
            console.log(chalk.bgRed.white("Ocorreu um erro, tente novamente."));
            return deposit();
        }

       // accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);
        accountData.balance = parseFloat(amount) + parseFloat(accountData.balance || 0);


            fs.writeFileSync(`accounts/${accountName}.json`,
            JSON.stringify(accountData),
            function(err){ console.log(err)},)

        console.log(chalk.bgGreen.black(`Foi depositado ${amount}$ Em sua conta.`),)
        
        
    }

    function getAccount(accountName){

        const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,{
            encoding: "utf-8",
            flag: "r"

        })
          
        return JSON.parse(accountJSON);
    }



    function getAccountBalance() {
        inquirer.prompt([ 
            {
                name:'accountName',
                message:'Qual o nome da sua conta?'
            }   
         ]).then((answer) =>{
                
            const accountName = answer['accountName'];

                if (!checkAccount(accountName)) {
                    return getAccountBalance();   

                }

            const accountData = getAccount(accountName);
            
            console.log(chalk.bgBlue.black(`Seu saldo R$:${accountData.balance}`));

            operation();

         }).catch(err => console.log(err));
        
    }



    function withdraw(){

        inquirer.prompt([
            {
              name:'accountName',
              message:'Qual o nome da sua conta?'  
            }
        ]).then((answer) => {

            const accountName = answer['accountName'];

            if (!checkAccount(accountName)) {

                return withdraw();
                
            }

            inquirer.prompt([
                {
                    name: 'amount',
                    message:'Valor do saque:'
                }
            ]).then((answer) => {

                const amount = answer['amount'];

                removeAmount(accountName, amount);

            }).catch(err => console.log(err))

        }).catch(err => console.log(err))

    }



    function removeAmount(accountName, amount) {

        const accountData = getAccount(accountName);
        
        if(!amount){
            console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente."));

            return withdraw();
            
        }

        if(accountData.balance < amount){
            console.log(chalk.bgRed.black('Valor indisponivel!'))
            
            return withdraw();
        }

        accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

            fs.writeFileSync(`accounts/${accountName}.json`,
            JSON.stringify(accountData),
            function(err){ console.log(err)})

            console.log(chalk.bgBlue.white(`O saque de $${amount} foi realizado com sucesso!`))
    
            operation();

        }