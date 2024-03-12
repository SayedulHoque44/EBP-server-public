import { Router } from "express";
import { BlogRoutes } from "../modules/Blogs/Blogs.routes";
import { QNAPdfRoutes } from "../modules/QNAPdf/QNAPdf.routes";
import { userRoutes } from "../modules/User/user.routes";
import { courseTimeRoutes } from "../modules/courseTime/courseTime.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/courseTimes",
    route: courseTimeRoutes,
  },
  {
    path: "/QNAPdf",
    route: QNAPdfRoutes,
  },
  {
    path: "/blogs",
    route: BlogRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
