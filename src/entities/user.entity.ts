import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity("users")
export class UserEntity {

    @Column('id')
    @PrimaryColumn()
    @Generated('increment')
    id: number;

    @Column({ 
        name: "name", 
        type: 'varchar', 
        nullable: false 
    })
    name: string;

    @Column({ 
        name: "email", 
        type: 'varchar', 
        nullable: false 
    })
    email: string;

    @Column({ 
        name: "password", 
        type: 'varchar', 
        nullable: false 
    })
    password: string;

    @Column({ 
        name: "course",
        type: 'varchar', 
        nullable: false 
    })
    course: string;
}