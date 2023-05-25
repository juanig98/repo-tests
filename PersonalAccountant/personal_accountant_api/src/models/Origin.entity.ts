import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User.entity"

@Entity({ name: 'origins' })
export class Origin {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column()
    description: string

    @Column({ name: 'code' })
    code: string

    @Column({ name: 'user_id' })
    userId: string

    @ManyToOne(() => User, u => u.id)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

}