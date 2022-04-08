
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TemplateType } from "../models/template.model";

@Entity('message_template')
export class TemplateEntity {

    @Column('id')
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ 
        name: "name", 
        type: 'varchar', 
        nullable: false 
    })
    name: string;

    @Column({ 
        name: "description", 
        type: 'varchar', 
        nullable: false 
    })
    description: string;

    @Column({ 
        name: "template", 
        type: 'varchar', 
        nullable: false 
    })
    template: string;

    @Column({ 
        name: "type", 
        type: 'varchar', 
        nullable: false 
    })
    type: TemplateType;
}
