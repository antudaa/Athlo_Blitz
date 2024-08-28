import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { FacilityRoutes } from "../modules/facilities/facilities.route";
import { TimeSoltRoutes } from "../modules/AvailableTimeSlot/timeSlot.route";
import { BookingRoutes } from "../modules/bookings/booking.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { ClientRoutes } from "../modules/Client/client.route";

const router = Router();

const moduleRoutes = [
  {
    path: `/auth`,
    route: AuthRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/client',
    route: ClientRoutes,
  },
  {
    path: `/users`,
    route: UserRoutes,
  },
  {
    path: `/facility`,
    route: FacilityRoutes,
  },
  {
    path: `/check-availability`,
    route: TimeSoltRoutes,
  },
  {
    path: `/bookings`,
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
