const express = require('express')

const pool = require('../db/db')
const result = require('../utils/result')

const router = express.Router()

router.get('/', (req, res) => {
    const sql = `SELECT * FROM reviews`
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.post('/createReview', (req, res) => {
    // const body = req.body
    // console.log(body)

    //Object Destructuring
    const { movie_id,review,rating,user_id,modified } = req.body  // i am posting user means i want to update that on db so request ki body mein users table ke saare attributes honge

    const sql = `INSERT INTO reviews( movie_id,review,rating,user_id,modified ) 
    VALUES('${movie_id}','${review}','${rating}','${user_id}','${modified}')`

    //console.log(sql)
    // res.send()

    pool.query(sql, (error, data) => {
        if (data)
            res.send(data)
        else
            res.send(error)
    })
})

router.put('/updateReview', (req, res) => {
    const {review_id,movie_id,review,rating,user_id,modified} = req.body
    const sql = `UPDATE reviews SET movie_id='${movie_id}',review='${review}', rating='${rating}', user_id = '${user_id}' , modified='${modified}' WHERE review_id = ${review_id}`
    console.log(sql)
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})


router.delete('/:id', (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM reviews WHERE review_id = ${id}`
    // console.log(sql)
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = router