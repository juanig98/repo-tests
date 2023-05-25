import { classToPlain, Exclude } from 'class-transformer';
import { Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "transaction_types" })
export class TransactionType {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: 'description', length: 70 })
    description: string;

    @Column({ name: "movement_type", type: "enum", enum: ['Entrada', 'Salida', 'Ninguno'] })
    movementType: string;

    @Column({ name: "status", type: "enum", enum: ['AC', 'BA'], default: "AC" })
    status: string;

    @UpdateDateColumn({ name: "updated_at" })
    @Exclude({ toPlainOnly: true })
    updatedAt: Date;

    @CreateDateColumn({ name: "created_at" })
    @Exclude({ toPlainOnly: true })
    createdAt: Date;

    toJSON(): Record<string, unknown> {
        return classToPlain(this);
    }
}