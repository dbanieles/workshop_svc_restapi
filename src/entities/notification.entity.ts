import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity('message_outbox')
export class NotificationEntity {

    @Column('id')
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ 
        name: "content", 
        type: 'varchar', 
        nullable: false 
    })
    content: string;

    @Column({ 
        name: "sender", 
        type: 'varchar', 
        nullable: false 
    })
    sender: string;

    @Column({ 
        name: "receivers", 
        type: 'varchar', 
        nullable: false 
    })
    receivers: string;

    @Column({ 
        name: "date", 
        type: 'varchar', 
        nullable: false 
    })
    date: Date;

    @Column({ 
        name: "template_id", 
        type: 'integer', 
        nullable: false 
    })
    templateId: number;
}