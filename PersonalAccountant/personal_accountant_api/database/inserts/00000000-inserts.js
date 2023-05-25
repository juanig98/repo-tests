const mysql = require('mysql');
const bcrypt = require("bcrypt")
const fs = require('fs');
require('dotenv').config({ path: '../../.env' })

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

function insertUsers(connection) {
    const rawdata = fs.readFileSync('data/users.json');
    const data = JSON.parse(rawdata);

    data.map(d => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(d.password, salt);

        connection.query(`INSERT INTO personal_accountant.users (id, email, username, password) 
                    VALUES (${d.id},'${d.email}','${d.username}','${hash}');`, (err, res) => {
            if (err) throw err;
            console.log("User inserted!");
        })
    });
}

function insertTransactionTypes(connection) {
    const rawdata = fs.readFileSync('data/transactions_types.json');
    const data = JSON.parse(rawdata);

    data.map(d => {
        connection.query(`INSERT INTO personal_accountant.transactions_types (id, description, translate, is_expense, is_income, is_transfer) 
                    VALUES (${d.id},'${d.description}','${d.translate}',${d.is_expense},${d.is_income},${d.is_transfer});`, (err, res) => {
            if (err) throw err;
            console.log("Transaction Type inserted!");
        })
    });
}

function insertOrigins(connection) {
    const rawdata = fs.readFileSync('data/origins.json');
    const data = JSON.parse(rawdata);

    data.map(d => {
        connection.query(`INSERT INTO personal_accountant.origins (id, description, code, user_id) 
                    VALUES (${d.id},'${d.description}','${d.code}',${d.user_id});`, (err, res) => {
            if (err) throw err;
            console.log("Origin inserted!");
        })
    });
}

function insertTransaction(connection) {
    const rawdata = fs.readFileSync('data/transactions.json');
    const data = JSON.parse(rawdata);

    let counter = 0;
    data.map(d => {
        let INSERT_STATEMENT = ""

        if (d.transaction_type_id === 5) {
            INSERT_STATEMENT =
                `INSERT INTO personal_accountant.transactions (date, description, origin_id, destiny_id, amount, transaction_type_id, user_id)
                        VALUES ('${d.date}','Transferencia',${d.origin_id},${d.destiny_id},'${d.amount}',${d.transaction_type_id}, ${d.user_id});`
        } else {
            INSERT_STATEMENT =
                `INSERT INTO personal_accountant.transactions (date, description, origin_id,  amount, transaction_type_id, user_id)
                    VALUES ('${d.date}','${d.description}',${d.origin_id},'${d.amount}',${d.transaction_type_id}, ${d.user_id});`
        }

        if (INSERT_STATEMENT.length > 10)
            connection.query(INSERT_STATEMENT, (err, res) => {
                if (err) throw err;
                console.log("Transaction inserted!");
                counter += 1;
            })
    });
    console.log(`${counter} transactions inserted!`);
}

connection.connect();
// insertUsers(connection);
// insertTransactionTypes(connection);
// insertOrigins(connection);
insertTransaction(connection);

connection.end();

