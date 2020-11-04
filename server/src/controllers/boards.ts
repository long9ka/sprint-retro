import { Request, Response } from "express";

// models
import Board, { IBoard } from "../models/Board";

export const getBoards = async (req: Request, res: Response) => {
  try {
    const boards = await Board.find();
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

export const getBoardById = async (req: Request, res: Response) => {
  try {
    const board = await Board.findById(req.params.id);
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
      user_id   : "5fa2872ed24c686e50096b56",
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