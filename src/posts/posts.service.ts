import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Posts } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POSTS_REPOSITORY')
    private postsRepository: Repository<Posts>,
  ) {}

  async findAll(): Promise<Posts[]> {
    return this.postsRepository.find();
  }
}
