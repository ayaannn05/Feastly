import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  addItem,
  deleteItem,
  editItem,
  getItemByCity,
  getItemById,
  getItemByCategory,
  getItemBySearch,
  
} from "../controllers/itemController.js";
import { upload } from "../middleware/multer.js";

const itemRouter = express.Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), addItem);
itemRouter.post("/edit-item/:itemId", isAuth, upload.single("image"), editItem);
itemRouter.get("/get-by-id/:itemId", isAuth, getItemById);
itemRouter.get("/delete/:itemId", isAuth, deleteItem);
itemRouter.get("/get-by-city/:city", isAuth, getItemByCity);
itemRouter.get("/get-by-category/:category", isAuth, getItemByCategory);
itemRouter.get("/search-items", isAuth, getItemBySearch);


export default itemRouter;
