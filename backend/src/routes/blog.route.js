import { Router } from "express";
import { createBlog,getBlog } from "../controllers/blog.controller.js";
import authentication from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authentication);
router.route("/create").post(createBlog)
router.route("/get-blog").get(getBlog)

export default router;