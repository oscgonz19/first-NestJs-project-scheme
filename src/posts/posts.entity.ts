import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Posts' })
export class Posts {
  @PrimaryColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column()
  post_content: string;

  @Column('int')
  user_id: number;

  @Column()
  created_date: Date

  @Column()
  updated_date: Date
}