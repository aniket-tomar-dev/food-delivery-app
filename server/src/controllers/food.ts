import { Request, Response } from "express";
import Food from "../models/food";

export const getFoods = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (req.query.type) {
      filter.type = req.query.type;
    }
    if (req.query.isAvailable) {
      filter.isAvailable = req.query.isAvailable === "true";
    }
    if (req.query.search) {
      filter.name = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    let sort: any = {};
    if (req.query.sortBy === "price") {
      sort.price = req.query.order === "asc" ? 1 : -1;
    }
    if (req.query.sortBy === "rating") {
      sort.rating = req.query.order === "asc" ? 1 : -1;
    }

    const foods = await Food.find(filter).sort(sort).skip(skip).limit(limit);

    const total = await Food.countDocuments(filter);

    res.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data: foods,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
