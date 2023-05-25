import { User } from 'src/models/User/User.entity';
import { classToPlain, Exclude } from 'class-transformer';
import { Entity as _Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EntityType } from 'src/models/EntityType/EntityType.entity';

@_Entity({ name: "entities" })
export class Entity {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "name" })
    name: string;

    @Column({ name: "description" })
    description: string;

    @Column({ name: "url" })
    url: string;

    @ManyToOne(() => EntityType, tt => tt)
    @JoinColumn({ name: "transaction_type_id" })
    transactionType: EntityType;

    @ManyToOne(() => User, u => u)
    @JoinColumn({ name: "user" })
    user: User; 

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
