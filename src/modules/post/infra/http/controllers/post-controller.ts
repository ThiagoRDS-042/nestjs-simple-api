import { Response } from 'express';

import { DeletePost } from '@modules/post/use-cases/delete-post';
import { GetPost } from '@modules/post/use-cases/get-post';
import { ListPosts } from '@modules/post/use-cases/list-posts';
import { PublishNewPost } from '@modules/post/use-cases/publish-new-post';
import { UpdatePost } from '@modules/post/use-cases/update-post';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ListPostsQuery } from '../dtos/list-posts-query';
import { PublishNewPostBody } from '../dtos/publish-new-post-body';
import { UpdatePostBody } from '../dtos/update-post-body';
import { PostViewModel } from '../view-models/post-view-model';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller('/posts')
export class PostController {
  constructor(
    private publishNewPost: PublishNewPost,
    private updatePost: UpdatePost,
    private getPost: GetPost,
    private listPosts: ListPosts,
    private deletePost: DeletePost,
  ) {}

  @Post('/')
  async publish(@Body() body: PublishNewPostBody, @Res() response: Response) {
    const { authorId, category, content, title } = body;

    const post = await this.publishNewPost.execute({
      authorId,
      category,
      content,
      title,
    });

    return response.status(201).json({ post: PostViewModel.toHTTP(post) });
  }

  @Put('/:postId')
  async save(
    @Param('postId') postId: string,
    @Body() body: UpdatePostBody,
    @Res() response: Response,
  ) {
    const { category, content, title } = body;

    const post = await this.updatePost.execute({
      category,
      content,
      postId,
      title,
    });

    return response.status(200).json({ post: PostViewModel.toHTTP(post) });
  }

  @Get('/:postId')
  async get(@Param('postId') postId: string, @Res() response: Response) {
    const post = await this.getPost.execute({
      postId,
    });

    return response.status(200).json({ post: PostViewModel.toHTTP(post) });
  }

  @Get('/')
  async list(@Query() query: ListPostsQuery, @Res() response: Response) {
    const { authorIdEquals, categoryEquals, titleContains } = query;

    const posts = await this.listPosts.execute({
      authorIdEquals,
      categoryEquals,
      titleContains,
    });

    return response
      .status(200)
      .json({ posts: posts.map(PostViewModel.toHTTP) });
  }

  @Delete('/:postId')
  async delete(@Param('postId') postId: string, @Res() response: Response) {
    await this.deletePost.execute({ postId });

    return response.status(204).json();
  }
}
