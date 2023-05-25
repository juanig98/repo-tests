import { classToPlain, Exclude } from 'class-transformer';
import { Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EntityType } from 'src/models/EntityType/EntityType.entity';

@Entity({ name: "coins" })
export class Coin {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "name" })
    name: string;

    @Column({ name: "type", type: "enum", enum: ['Cryptomoneda', 'Accion', 'Dinero', 'Otro'] })
    type: string;

    @Column({ name: "status", type: "enum", enum: ['AC', 'BA'], default: "AC" })
    status: string;
}
