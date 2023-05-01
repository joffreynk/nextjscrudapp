import mysql from 'mysql2';

export const connection = mysql.createPool({
    host:'localhost',
    user: 'root',
    connectionLimit: 10,
    database: 'practice',
});