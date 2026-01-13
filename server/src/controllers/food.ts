// import { Request, Response } from "express";
// import Food from "../models/food";

// export const getFoods = async (req: Request, res: Response) => {
//   try {
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const filter: any = {};

//     if (req.query.type) {
//       filter.type = req.query.type;
//     }
//     if (req.query.isAvailable) {
//       filter.isAvailable = req.query.isAvailable === "true";
//     }
//     if (req.query.search) {
//       filter.name = {
//         $regex: req.query.search,
//         $options: "i",
//       };
//     }

//     let sort: any = {};
//     if (req.query.sortBy === "price") {
//       sort.price = req.query.order === "asc" ? 1 : -1;
//     }
//     if (req.query.sortBy === "rating") {
//       sort.rating = req.query.order === "asc" ? 1 : -1;
//     }

//     const foods = await Food.find(filter).sort(sort).skip(skip).limit(limit);

//     const total = await Food.countDocuments(filter);

//     res.json({
//       success: true,
//       page,
//       totalPages: Math.ceil(total / limit),
//       totalItems: total,
//       data: foods,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error });
//   }
// };

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
      filter.name = { $regex: req.query.search, $options: "i" };
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

    // ⚡ Make sure _id is sent explicitly
    const data = foods.map((f) => ({
      _id: f._id,
      name: f.name,
      price: f.price,
      image: f.image,
      weight: f.weight,
      description: f.description,
      rating: f.rating,
      type: f.type,
      isAvailable: f.isAvailable,
    }));

    res.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 🔐 ADMIN: ADD FOOD
export const addFood = async (req: Request, res: Response) => {
  try {
    const { name, price, type } = req.body;

    if (!name || !price || !type) {
      return res.status(400).json({
        message: "Name, price and type are required",
      });
    }

    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (error) {
    res.status(400).json({ message: "Failed to add food", error });
  }
};

// 🔐 ADMIN: UPDATE FOOD
export const updateFood = async (req: Request, res: Response) => {
  const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!food) {
    return res.status(404).json({ message: "Food not found" });
  }

  res.json(food);
};

// 🔐 ADMIN: DELETE FOOD
export const deleteFood = async (req: Request, res: Response) => {
  const food = await Food.findById(req.params.id);

  if (!food) {
    return res.status(404).json({ message: "Food not found" });
  }

  await food.deleteOne();
  res.json({ message: "Food deleted successfully" });
};
