const pool = require('../../../JWT-Token/confiq/database');

module.exports = {
    create: (data, callback) => {
        pool.query(
            `Insert into registration(firstName, lastName, gender, email, password, number)
            value(?,?,?,?,?,?)`,
            [data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number
            ],
            (error, results, fields) => {
                if(error)
                return callback(error)
                return callback(null, results)
            }
        )
    },
    getUsers: callback => {
        pool.query(
            `SELECT * FROM registration`,
            [],
            (error, results, fields) => {
                if(error)
                return callback(error)
                return callback(null, results[0]);
            }
        )
    },
    getUserByUserId: (id, callback) =>{
        pool.query(
            `SELECT * FROM registration WHERE id= ?`,
            [id],
            (error, results, fields) => {
                if(error)
                return callback(error)
                return callback(null, results);
            }
        )
    },
    updateUser: (data, callback) => {
        pool.query(
            `UPDATE registration set firstName = ?, lastName = ?, gender = ?, email = ?, password = ?, number = ? WHERE id = ?`,
            [data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id
            ],
            (error, results, fields) => {
                if(error)
                return callback(error)
                return callback(null, results)
            }
        )
    },
    deleteUser: (data, callback) => {
        pool.query(
            `DELETE from registration WHERE id = ?`,
            [data.id],
            (error, results, fields) => {
                if(error)
                return callback(error)
                return callback(null, results[0])
            }
        )
    },
    getUserByUserEmail: (email, callback) => {
        pool.query(
            `SELECT * from registration WHERE email = ?`,
            [email],
            (error, results, fields) => {
                if(error)
                return callback(error)
                return callback(null, results)
            }
        )
    }
}