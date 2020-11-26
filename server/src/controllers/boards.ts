import { Request, Response } from "express";

// models
import Board, { IBoard } from "../models/Board";

export const getBoards = async (req: any, res: Response) => {
  try {
    const boards = await Board.find({ user_id: req.user.id }).sort({updated_at: -1});
    if (boards) {
      res.status(200).json({
        msg: "ok",
        body: boards,
      });
    } else {
      res.status(404).json({
        msg: "no boards exist",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: err.message,
    });
  }
}

export const getBoardById = async (req: any, res: Response) => {
  try {
    const board = await Board.findOne({
      $or: [
        { _id: req.params.id, user_id: req.user.id },
        { _id: req.params.id, is_public: true },
      ]
    });
    if (board) {
      res.status(200).json({
        msg: "ok",
        body: board,
      });
    } else {
      res.status(404).json({
        msg: "board does not exist",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: err.message,
    });
  }
}

export const createBoard = async (req: any, res: Response) => {
  const { title } = req.body;
  try {
    // new board
    const newBoard = await new Board({
      user_id   : req.user.id,
      title     : title,
    }).save();
    
    if (newBoard) {
      res.status(201).json({
        msg: "created board",
        body: newBoard,
      });
    } else {
      res.status(400).json({
        msg: "can not create board",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: err.message,
    });
  }
}

export const updateBoardById = async (req: any, res: Response) => {
  const { title, is_public } = req.body;
  try {
    const board = await Board.findByIdAndUpdate(req.params.id, {
      title,
      is_public,
    },
    {
      new: true,
    });
    return res.json({
      msg: "updated board",
      body: board,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: err.message,
    });
  }
}


export const deleteBoardById = async (req: any, res: Response) => {
  try {
    const board = await Board.findOneAndRemove({
      _id: req.params.id,
      user_id: req.user.id
    });
    return res.json({
      msg: "deleted board",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: err.message,
    });
  }
}