import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: `/users`,
    route: UserRoutes,
  },
  // {
  //     path: `/students`,
  //     route: StudentRoutes,
  // },
  // {
  //     path: `/academic-semesters`,
  //     route: AcademicSemesterRoutes,
  // },
  // {
  //     path: `/academic-faculty`,
  //     route: AcademicFacultyRoutes,
  // },
  // {
  //     path: `/academic-department`,
  //     route: AcademicDepartmentRoutes,
  // }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
