import { classToPlain, Exclude } from 'class-transformer';
import { Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EntityType } from 'src/models/EntityType/EntityType.entity';
import { User } from 'src/models/User/User.entity';
import { DailyRegisterType } from 'src/models/DailyRegisterType/DailyRegisterType.entity';

@Entity({ name: "daily_registers" })
export class DailyRegister {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: 'date', type: 'date' })
    date: Date;

    @Column({ name: 'description', length: 70 })
    description: string;

    @Column({ name: "movement_type", type: "enum", enum: ['Entrada', 'Salida'] })
    movementType: string;

    @ManyToOne(() => DailyRegisterType, drt => drt)
    @JoinColumn({ name: "daily_register_type_id" })
    dailyRegisterType: DailyRegisterType;

    @Column({ name: "amount", type: "decimal", precision: 9, scale: 2 })
    amount: number;

    @Column({ name: "observations", length: 300, default: null })
    observations: string;

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