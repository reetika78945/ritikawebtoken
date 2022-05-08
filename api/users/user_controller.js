const { create, getUsers, updateUser, getUserByUserId,deleteUser, getUserByUserEmail } = require('./user_service');
const {genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(201).json({
                success: 1,
                data: results
            })
        })
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })

    },
    getUserByUserId: (req, res) => {
        let id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(201).json({
                success: 1,
                data: results
            })
        })
    },
    deleteUser: (req, res) => {
        const data = req.params.id;
        deleteUser(data, (err, results) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(201).json({
                success: 1,
                message: 'Deleted Successfully'
            })
        })
    },
    login: (req, res) => {
        const data = req.body;
        getUserByUserEmail(data.email, (err, results) => {
            if(err){
            console.log(err)
            return err;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Invalid Inputs"
                })
            }
            console.log(data.password, results[0].password)
            const result = compareSync(data.password, results[0].password)
            if(result){
                results.password = undefined;
                const jsontoken = sign({ result: results}, 'Ritz1997', {
                    expiresIn: '1hr'
                })
                return res.json({
                    success :1,
                    message : 'login succesfully',
                    data : jsontoken 
                })
            }
            else{
                return res.json({
                    success: 0,
                    message: "Invalid Email or password"
                })
            }          
        })

    }
}