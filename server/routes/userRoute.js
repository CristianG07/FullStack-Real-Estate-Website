import { Router } from "express";

// import controllers
import {
  bookVisit,
  cancelBooking,
  getAllBookings,
  getAllFavorites,
  register,
  toFav,
} from "../controllers/userController.js";

const router = Router();

// routes of model user
router.post("/register", register);
router.post("/bookVisit/:id", bookVisit);
router.post("/allBookings", getAllBookings);
router.post("/removeBooking/:id", cancelBooking);
router.post("/toFav/:rid", toFav);
router.post("/allFav", getAllFavorites);

export { router as userRoute };
