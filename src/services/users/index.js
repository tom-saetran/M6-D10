import express from "express"
import models from "../../db/index.js"

const User = models.User

const router = express.Router()

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const data = await User.findAll({
                offset: req.query.offset,
                limit: req.query.limit
            })
            res.send(data)
        } catch (error) {
            next(error.message)
        }
    })

    .post(async (req, res, next) => {
        try {
            const data = await User.create(req.body)
            res.send(data)
        } catch (error) {
            next(error)
        }
    })

router
    .route("/:id")
    .get(async (req, res, next) => {
        try {
            const data = await User.findByPk(req.params.id)
            res.send(data)
        } catch (error) {
            next(error.message)
        }
    })

    .put(async (req, res, next) => {
        try {
            const data = await User.update(req.body, {
                where: { _id: req.params.id },
                returning: true
            })
            if (data[0] === 1) res.send(data[1][0])
            else res.status(404).send("ID not found")
        } catch (error) {
            next(error.message)
        }
    })

    .delete(async (req, res, next) => {
        try {
            const row = await User.destroy({ where: { _id: req.params.id } })
            if (row > 0) res.send("Deleted")
            else res.status(404).send("ID not found")
        } catch (error) {
            next(error.message)
        }
    })

export default router
