import { AfterInsert, AfterRemove, AfterUpdate, BeforeRemove, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @BeforeRemove()
  logBeforeRemove(){
    console.log(`User will removed with id: ${this.id}`);
    
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User done!');
  }
} 