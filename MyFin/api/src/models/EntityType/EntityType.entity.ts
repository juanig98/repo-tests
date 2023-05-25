import { classToPlain, Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: "entity_types" })
export class EntityType {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "description" })
    description: string;

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
