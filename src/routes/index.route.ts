import { Router } from "express";
import routeAuth from "./auth.route";
import routePost from "./post.route";
import routeUsers from "./user.route";

const router = Router({mergeParams: true})

router.use('/', routeAuth)
router.use('/posts', routePost)
router.use('/users', routeUsers)

export default router
