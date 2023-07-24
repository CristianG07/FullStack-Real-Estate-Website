import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// funtion to create new user
export const register = asyncHandler(async (req, res) => {
  console.log("creating user");
  let { email } = req.body;

  const newUser = await prisma.user.findUnique({ where: { email } });

  if (!newUser) {
    const user = await prisma.user.create({ data: req.body });
    res.send({ message: "User registered successfully", user: user });
  } else {
    res.status(201).send({ message: "User already registered" });
  }
});

// funtion to book a visic to residency
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "this residency is already booked by you" });
    } else {
      await prisma.user.update({
        where: { email },
        data: { bookedVisits: { push: { id, date } } },
      });
      res.status(200).send("your visit is booked successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// funtion to get all booking
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const booking = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    res.status(200).send(booking);
  } catch (err) {
    throw new Error(err.message);
  }
});

// funtion to cancel booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      res.status(404).json({ message: "booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);

      await prisma.user.update({
        where: { email },
        data: { bookedVisits: user.bookedVisits },
      });
      res.status(200).send("booking cancelled successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// funtion to add resd in favorite list of a user
export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user.favResidenciesID.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),
          },
        },
      });

      res
        .status(200)
        .send({ message: "removed from favorites", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: { favResidenciesID: { push: rid } },
      });

      res.status(200).send({ message: "updated favorites", user: updateUser });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const favResd = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });
    res.status(200).send(favResd);
  } catch (err) {
    throw new Error(err.message);
  }
});
