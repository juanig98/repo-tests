import { Entity as _Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TransactionType } from 'src/models/TransactionType/TransactionType.entity';
import { User } from 'src/models/User/User.entity';
import { Entity } from 'src/models/Entity/Entity.entity';
import { Coin } from '../Currency/Currency.entity';
import { classToPlain, Exclude } from 'class-transformer';

@_Entity({ name: "transactions" })
export class Transaction {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: 'date', type: 'date' })
    date: Date;

    @Column({ name: 'description', length: 70 })
    description: string;

    @ManyToOne(() => Entity, e => e)
    @JoinColumn({ name: "origin_id" })
    origin: Entity;

    @ManyToOne(() => Entity, e => e)
    @JoinColumn({ name: "destiny_id" })
    destiny: Entity;

    @Column({ name: "amount", type: "decimal", precision: 9, scale: 8 })
    amount: number;

    @ManyToOne(() => Coin, c => c)
    @JoinColumn({ name: "amount_coin_id" })
    amountCoin: Coin;

    @Column({ name: "commission", type: "decimal", precision: 9, scale: 8, nullable: true })
    commission: number;

    @ManyToOne(() => Coin, c => c)
    @JoinColumn({ name: "commission_coin_id" })
    commissionCoin: Coin;

    @Column({ name: "quotation", type: "decimal", precision: 9, scale: 8 })
    quotation: number;

    @ManyToOne(() => Coin, c => c)
    @JoinColumn({ name: "quotation_coin_id" })
    quotationCoin: Coin;

    @ManyToOne(() => TransactionType, tt => tt)
    @JoinColumn({ name: "transaction_type_id" })
    transactionType: TransactionType;

    @Column({ name: "motive", length: 300, default: null })
    motive: string;

    @Column({ name: "observations", length: 300, default: null })
    observations: string;

    @ManyToOne(() => User, u => u, { nullable: true })
    @JoinColumn({ name: "user_id" })
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