import { Column, Entity, Index } from 'typeorm';
import {AbstractEntity} from "@nest-upskilling/common";

@Entity('user')
export class UserEntity extends AbstractEntity {
  @Index({ unique: true })
  @Column('varchar', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column({ nullable: true })
  last_login?: Date;

  @Column('varchar', { nullable: true })
  hash_refresh_token: string;
}
