import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import { createConnection, Repository } from "typeorm";
import Room from "./models/Room";

const app: Application = express();

// carrega o json enviado no corpo(body)
app.use(express.json());

app.get("/rooms", async (req: Request, res: Response): Promise<Response> => {
    const connection = await createConnection();

    const roomRepository: Repository<Room> = connection.getRepository(Room);

    const rooms: Room[] = await roomRepository.find();
    
    connection.close();

    return res.json({
        rooms
    });
});

app.post("/rooms", async (req: Request, res: Response): Promise<Response> => {
    const connection = await createConnection();

    const roomRepository: Repository<Room> = connection.getRepository(Room);

    const room: Room = new Room(req.body.nome, req.body.typeRoom);

    await roomRepository.save(room); 

    connection.close();

    return res.json({
        id: room.id
    });
});

app.put("/rooms", async (req: Request, res: Response): Promise<Response> => {
    const connection = await createConnection();

    const roomRepository: Repository<Room> = connection.getRepository(Room);

    const room: Room | undefined = await roomRepository.findOne(req.body.id);

    if (room !== undefined) {
        room.nome = req.body.nome;
        room.typeRoom = req.body.typeRoom;

        await roomRepository.save(room);

        connection.close();
        
        return res.json({
            room
        });
    }

    connection.close();

    return res.status(404).send();
});


const port: any = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor up na porta ${port}`);
});