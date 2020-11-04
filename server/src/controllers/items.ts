import { Request, Response } from "express";

// models
import Item, { IItem } from "../models/Item";

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find({ board_id: req.params.id });
    if (items) {
      res.status(200).json({
        msg: "ok",
        body: items,
      });
    } else {
      res.status(404).json({
        msg: "no items exist",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: err.message,
    });
  }
}

export const createItem = async (req: any, res: Response) => {
  const { des, group_by } = req.body;
  try {
    // new board
    const newItem = await new Item({
      board_id  : req.params.id,
      des       : des,
      group_by  : group_by,
    }).save();
    
    if (newItem) {
      res.status(201).json({
        msg: "created item",
        body: newItem,
      });
    } else {
      res.status(400).json({
        msg: "can not create item",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: err.message,
    });
  }
}