import { Authorized, JsonController, Get, Param, Put, Body, Post, HttpCode, NotFoundError } from 'routing-controllers'
import { Page } from './entity'

@JsonController()
export default class PageController {

  @Get('/pages/:id')
  getPage(
    @Param('id') id: number
  ) {
    return Page.findOne(id)
  }

  @Get('/pages')
  async allPages() {
    const pages: Page[] = await Page.find()
    return { pages }
  }

  @Put('/pages/:id')
  async updatePage(
    @Param('id') id: number,
    @Body() update: Partial<Page>
  ) {
    const updatePage = await Page.findOne(id)
    if (!updatePage) throw new NotFoundError('Cannot find page')
    return Page.merge(updatePage, update).save()
  }
  @Authorized()
  @Post('/pages')
  @HttpCode(201)
  createPage(
    @Body() newPage: Page
  ) {
    return newPage.save()
  }
}