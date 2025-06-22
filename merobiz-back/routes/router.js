import { Router } from "express";
import authRoute from "./auth.route.js"
import pricingRouter from './pricing.route.js'
import fetchProducts from "./fetch.route.js"
import AIAssistant from "./assistantRoutes.js"
const router = Router()

router.use("/auth", authRoute)

router.use("/api/pricing", pricingRouter)

router.use("/api/assistant", AIAssistant)

router.use("/products", fetchProducts)
// router.use(authentication)

// router.use("/posts", postRouter)

export default router