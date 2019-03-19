import { JsonController, Get, Param, Put, Body, Post, HttpCode, NotFoundError } from 'routing-controllers'
import { Fluffball } from './entity'

@JsonController()
export default class FluffballController {

  @Get('/fluffballs/:id')
  getPage(
    @Param('id') id: number
  ) {
    return Fluffball.findOne(id)
  }

  @Get('/fluffballs')
  async allPages() {
    const pages: Fluffball[] = await Fluffball.find()
    return { pages }
  }

  @Put('/fluffballs/:id')
  async updatePage(
    @Param('id') id: number,
    @Body() update: Partial<Fluffball>
  ) {
    const updatePage = await Fluffball.findOne(id)
    if (!updatePage) throw new NotFoundError('Cannot find fluffball')
    return Fluffball.merge(updatePage, update).save()
  }

  @Post('/fluffballs')
  @HttpCode(201)
  createPage(
    @Body() newPage: Fluffball
  ) {
    return newPage.save()
  }
}