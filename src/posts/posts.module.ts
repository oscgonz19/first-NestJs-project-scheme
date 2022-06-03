import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { postsProviders } from './posts.providers';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...postsProviders,
    PostsService,
  ],
  controllers: [PostsController],
})
export class PostsModule {}
