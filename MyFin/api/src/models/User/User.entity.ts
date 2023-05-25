import { Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number

    @Column({ name: "username", length: 100, unique: true })
    username: string;

    @Column({ name: "password", length: 250 })
    password: string;

    @Column({ name: "status", type: "enum", enum: ['AC', 'BA'], default: "AC" })
    status: string;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
}
