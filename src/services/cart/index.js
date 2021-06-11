import express from "express"
import models from "../../db/index.js"
import createError from "http-errors"

const Cart = models.Cart

const router = express.Router()

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const data = await Cart.findAll({
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
            if (!req.body.userId) next(createError(400, "User ID must be present."))
            else if (!req.body.productId) next(createError(400, "Product ID must be present."))
            else {
                const data = await Cart.create(req.body)
                res.send(data)
            }
        } catch (error) {
            next(error.message)
        }
    })

router
    .route("/:id")
    .get(async (req, res, next) => {
        try {
            const data = await Cart.findByPk(req.params.id)
            if (data) res.send(data)
            else next(createError(404, "ID not found"))
        } catch (error) {
            next(error.message)
        }
    })

    .put(async (req, res, next) => {
        try {
            const data = await Cart.update(req.body, {
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
            const row = await Cart.destroy({ where: { _id: req.params.id } })
            if (row > 0) res.send("Deleted")
            else res.status(404).send("ID not found")
        } catch (error) {
            next(error.message)
        }
    })

export default router
