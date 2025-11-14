const express = require('express')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const pool = require('../db/db')
const result = require('../utils/result')

const router = express.Router()

router.get('/', (req, res) => {
    const sql = `SELECT * FROM users`
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.post('/register', async (req, res) => {
    const { first_name, last_name,email ,password, mobile, birth } = req.body
    const sql = `INSERT INTO users(first_name, last_name,email ,password, mobile, birth) VALUES(?,?,?,?,?,?)`
    try {
        const hashpassword = await bcrypt.hash(password, config.saltRounds)
        pool.query(sql, [first_name,last_name, email, hashpassword, mobile, birth], (error, data) => {
            res.send(result.createResult(error, data))
        })
    }
    catch (error) {
        res.send(result.createResult(error))
    }
})

router.put('/profile', (req, res) => {
    const {id, first_name,last_name, email, mobile, birth} = req.body
    const sql = `UPDATE users SET first_name='${first_name}',last_name='${last_name}', email='${email}', mobile = '${mobile}' , birth='${birth}' WHERE id = ${id}`
    console.log(sql)
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.put('/profile/changePass', (req, res) => {
    const {id,password} = req.body
    const sql = `UPDATE users SET password='${password}' WHERE id = ${id}`
    console.log(sql)
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM users WHERE id = ${id}`
    // console.log(sql)
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = router