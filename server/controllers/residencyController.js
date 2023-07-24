import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// funtion to create new recidency
export const CreateResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    city,
    country,
    image,
    facilities,
    userEmail,
  } = req.body.data;

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        facilities,
        owner: { connect: { email: userEmail } },
      },
    });

    res
      .status(201)
      .send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A residency with address already there");
    }
    throw new Error(err.message);
  }
});

// funtion to get all residencies in the document
export const getAllResidencies = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.send(residencies);
  } catch (err) {
    throw new Error(err.message);
  }
});

// funtion to get a specific residency in the document
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const residency = await prisma.residency.findUnique({ where: { id } });
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});
