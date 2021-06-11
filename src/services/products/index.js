import express from "express"
import models from "../../db/index.js"
import createError from "http-errors"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

const { Product, Category, ProductCategory, Review } = models
const router = express.Router()

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const data = await Product.findAll({
                include: req.query.category
                    ? {
                          model: Category,
                          through: { attributes: [] },
                          where: { _id: req.query.category }
                      }
                    : null,
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
            const data = await Product.findByPk(req.params.id, {
                include: {
                    model: Category,
                    through: { attributes: [] },
                    attributes: {
                        exclude: ["productId"]
                    }
                }
            })
            if (data) res.send(data)
            else next(createError(404, "ID not found"))
        } catch (error) {
            next(error.message)
        }
    })

    .put(async (req, res, next) => {
        try {
            const data = await Product.update(req.body, {
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
            const row = await Product.destroy({ where: { _id: req.params.id } })
            if (row > 0) res.send("Deleted")
            else res.status(404).send("ID not found")
        } catch (error) {
            next(error.message)
        }
    })

router.route("/:productId/addCategory/:categoryId").post(async (req, res, next) => {
    try {
        const data = await ProductCategory.create({
            productId: req.params.productId,
            categoryId: req.params.categoryId
        })
        res.send(data)
    } catch (error) {
        next(error.message)
    }
})

router.route("/:id/reviews").get(async (req, res, next) => {
    try {
        const data = await Product.findByPk(req.params.id, {
            include: { model: Review, attributes: { exclude: ["productId"] } },
            attributes: ["_id", "name", "brand"]
        })
        res.send(data)
    } catch (error) {
        next(error.message)
    }
})

router.route("/:id/reviews").post(async (req, res, next) => {
    try {
        const data = await Review.create({ ...req.body, productId: req.params.id })
        res.send(data)
    } catch (error) {
        next(error)
    }
})

const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params: { folder: "m6d10" }
})

const upload = multer({
    storage: cloudinaryStorage
}).single("image")

router.post("/:id/upload", upload, async (req, res, next) => {
    try {
        const data = await Product.update(
            { imageUrl: req.file.path },
            {
                where: { _id: req.params.id },
                returning: true
            }
        )

        if (data[0] === 1) res.send(data[1][0])
        else res.status(404).send("ID not found")
    } catch (error) {
        next(error.message)
    }
})

export default router
