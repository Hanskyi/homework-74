import express from "express";
import {IMessage} from "../type";
import fileDb from "../fileDb";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const messages = await fileDb.get();
    res.send(messages);
});

messagesRouter.post('/', async (req, res) => {
    const message: IMessage = {
        message: req.body.message,
    };
    const saveMessage = await fileDb.add(message);
    res.send(saveMessage);
});

export default messagesRouter;