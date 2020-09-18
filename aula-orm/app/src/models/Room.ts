import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// Entidade representa uma tables no DB
@Entity("rooms")
export default class Room {
    // chave primaria auto incremental
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    typeRoom: string;

    constructor(nome: string, typeRoom: string) {
        this.nome = nome;
        this.typeRoom = typeRoom;
    }
}