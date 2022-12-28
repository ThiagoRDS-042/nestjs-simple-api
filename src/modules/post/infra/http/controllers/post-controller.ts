import { Response } from 'express';
import { randomUUID } from 'node:crypto';

import { JwtBearerGuard } from '@modules/auth/infra/guards/jwt-bearer-guard';
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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ListPostsQuery } from '../dtos/list-posts-query';
import { PostResponse, PostsResponse } from '../dtos/post-response';
import { PublishNewPostBody } from '../dtos/publish-new-post-body';
import { UpdatePostBody } from '../dtos/update-post-body';
import { PostViewModel } from '../view-models/post-view-model';

@ApiTags('Posts')
@ApiBearerAuth()
@UseGuards(JwtBearerGuard)
@Controller('/posts')
export class PostController {
  constructor(
    private publishNewPost: PublishNewPost,
    private updatePost: UpdatePost,
    private getPost: GetPost,
    private listPosts: ListPosts,
    private deletePost: DeletePost,
  ) {}

  @ApiCreatedResponse({
    description: 'The post has been successfully published.',
    type: PostResponse,
  })
  @ApiConflictResponse({
    description: 'The post title has already been used',
    content: {
      'application/json': {
        example: {
          message: ['Title already used'],
          code: 'TITLE_ALREADY_USED',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'The post author has not been found',
    content: {
      'application/json': {
        example: {
          message: ['Author does not exist'],
          code: 'AUTHOR_NOT_FOUND',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'The problems of the token',
    content: {
      'application/json': {
        examples: {
          TOKEN_NOT_FOUND: {
            value: {
              message: ['Token must be not found'],
              code: 'TOKEN_NOT_FOUND',
            },
          },
          EXPIRED_TOKEN: {
            value: {
              message: ['Expired token'],
              code: 'EXPIRED_TOKEN',
            },
          },
          INVALID_TOKEN: {
            value: {
              message: ['Invalid token'],
              code: 'INVALID_TOKEN',
            },
          },
          UNAUTHORIZED: {
            value: {
              message: ['Unauthorized'],
              code: 'UNAUTHORIZED',
            },
          },
        },
      },
    },
  })
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

  @ApiOkResponse({
    description: 'The post has been successfully updated.',
    type: PostResponse,
  })
  @ApiConflictResponse({
    description: 'The post title has already been used',
    content: {
      'application/json': {
        example: {
          message: ['Title already used'],
          code: 'TITLE_ALREADY_USED',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'The post has not been found',
    content: {
      'application/json': {
        example: {
          message: ['Post does not exist'],
          code: 'POST_NOT_FOUND',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'The problems of the token',
    content: {
      'application/json': {
        examples: {
          TOKEN_NOT_FOUND: {
            value: {
              message: ['Token must be not found'],
              code: 'TOKEN_NOT_FOUND',
            },
          },
          EXPIRED_TOKEN: {
            value: {
              message: ['Expired token'],
              code: 'EXPIRED_TOKEN',
            },
          },
          INVALID_TOKEN: {
            value: {
              message: ['Invalid token'],
              code: 'INVALID_TOKEN',
            },
          },
          UNAUTHORIZED: {
            value: {
              message: ['Unauthorized'],
              code: 'UNAUTHORIZED',
            },
          },
        },
      },
    },
  })
  @ApiParam({
    name: 'postId',
    type: String,
    format: 'uuid',
    example: randomUUID(),
  })
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

  @ApiOkResponse({
    description: 'The post has been successfully founded.',
    type: PostResponse,
  })
  @ApiNotFoundResponse({
    description: 'The post has not been found',
    content: {
      'application/json': {
        example: {
          message: ['Post does not exist'],
          code: 'POST_NOT_FOUND',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'The problems of the token',
    content: {
      'application/json': {
        examples: {
          TOKEN_NOT_FOUND: {
            value: {
              message: ['Token must be not found'],
              code: 'TOKEN_NOT_FOUND',
            },
          },
          EXPIRED_TOKEN: {
            value: {
              message: ['Expired token'],
              code: 'EXPIRED_TOKEN',
            },
          },
          INVALID_TOKEN: {
            value: {
              message: ['Invalid token'],
              code: 'INVALID_TOKEN',
            },
          },
          UNAUTHORIZED: {
            value: {
              message: ['Unauthorized'],
              code: 'UNAUTHORIZED',
            },
          },
        },
      },
    },
  })
  @ApiParam({
    name: 'postId',
    type: String,
    format: 'uuid',
    example: randomUUID(),
  })
  @Get('/:postId')
  async get(@Param('postId') postId: string, @Res() response: Response) {
    const post = await this.getPost.execute({
      postId,
    });

    return response.status(200).json({ post: PostViewModel.toHTTP(post) });
  }

  @ApiOkResponse({
    description: 'The post has been successfully listed.',
    type: PostsResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'The problems of the token',
    content: {
      'application/json': {
        examples: {
          TOKEN_NOT_FOUND: {
            value: {
              message: ['Token must be not found'],
              code: 'TOKEN_NOT_FOUND',
            },
          },
          EXPIRED_TOKEN: {
            value: {
              message: ['Expired token'],
              code: 'EXPIRED_TOKEN',
            },
          },
          INVALID_TOKEN: {
            value: {
              message: ['Invalid token'],
              code: 'INVALID_TOKEN',
            },
          },
          UNAUTHORIZED: {
            value: {
              message: ['Unauthorized'],
              code: 'UNAUTHORIZED',
            },
          },
        },
      },
    },
  })
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

  @ApiNoContentResponse({
    description: 'The post has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'The post has not been found',
    content: {
      'application/json': {
        example: {
          message: ['Post does not exist'],
          code: 'POST_NOT_FOUND',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'The problems of the token',
    content: {
      'application/json': {
        examples: {
          TOKEN_NOT_FOUND: {
            value: {
              message: ['Token must be not found'],
              code: 'TOKEN_NOT_FOUND',
            },
          },
          EXPIRED_TOKEN: {
            value: {
              message: ['Expired token'],
              code: 'EXPIRED_TOKEN',
            },
          },
          INVALID_TOKEN: {
            value: {
              message: ['Invalid token'],
              code: 'INVALID_TOKEN',
            },
          },
          UNAUTHORIZED: {
            value: {
              message: ['Unauthorized'],
              code: 'UNAUTHORIZED',
            },
          },
        },
      },
    },
  })
  @ApiParam({
    name: 'postId',
    type: String,
    format: 'uuid',
    example: randomUUID(),
  })
  @Delete('/:postId')
  async delete(@Param('postId') postId: string, @Res() response: Response) {
    await this.deletePost.execute({ postId });

    return response.status(204).json();
  }
}
