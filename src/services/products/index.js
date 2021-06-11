import express from "express"
import models from "../../db/index.js"

const Product = models.Product

const router = express.Router()

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const data = await Product.findAll()
            res.send(data)
        } catch (error) {
            next(error.message)
        }
    })

    .post(async (req, res, next) => {
        try {
            const data = await Product.create(req.body)
            res.send(data)
        } catch (error) {
            next(error.message)
        }
    })

router
    .route("/:id")
    .get(async (req, res, next) => {
        try {
            const data = await Product.findByPk(req.params.id)
            res.send(data)
        } catch (error) {
            next(error.message)
        }
    })

    .put(async (req, res, next) => {
        try {
            const data = await Product.update(req.body, {
                where: { id: req.params.id },
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
            const row = await Product.destroy({ where: { id: req.params.id } })
            if (row > 0) res.send("Deleted")
            else res.status(404).send("ID not found")
        } catch (error) {
            next(error.message)
        }
    })

router.route("/:id/reviews").get(async (req, res, next) => {
    try {
        const data = await Product.findByPk(req.params.id)
        res.send(data)
    } catch (error) {
        next(error.message)
    }
})

export default router
