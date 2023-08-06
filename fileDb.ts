import {promises as fs} from "fs";
import {IMessage, IMessageGet} from "./type";

const pathName = './messages';

const fileDb = {
    async get() {
        try {
            const files = await fs.readdir(pathName);
            const getFirstFiveFiles = files.slice(0, 5);
            let getFileInfo: IMessageGet[] = [];

            for (const file of getFirstFiveFiles) {
                const fileContent = await fs.readFile(pathName + '/' + file, "utf-8");
                getFileInfo.push(JSON.parse(fileContent.toString()));
            }
            return getFileInfo;
        } catch (e) {
            console.error(e);
            return [];
        }
    },
    async add(item: IMessage) {
        try {
            const message: IMessageGet = {
                ...item,
                date: new Date(),
            }
            await fs.writeFile(pathName + `/${message.date}`, JSON.stringify(message));
        } catch (e) {
            console.error(e);
        }
    },
};

export default fileDb;