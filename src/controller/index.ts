import { Readable } from 'stream'
import { Controller, Get, Provide, Inject } from '@midwayjs/decorator'
import { Context } from 'egg'
import { render } from 'ssr-core-vue'
import { IApiService, IApiDetailService } from '../interface'

interface IEggContext extends Context {
  apiService: IApiService
  apiDeatilservice: IApiDetailService
}

@Provide()
@Controller('/')
export class Index {
  @Inject()
  ctx: IEggContext

  @Inject('ApiService')
  apiService: IApiService

  @Inject('ApiDetailService')
  apiDeatilservice: IApiDetailService

  @Get('/')
  @Get('/detail/:id')
  async handler (): Promise<void> {
    try {
      this.ctx.apiService = this.apiService
      this.ctx.apiDeatilservice = this.apiDeatilservice

      console.log('app.config.keys', this.ctx.app.config.keys)
      console.log('app.config.test', this.ctx.app.config.test)
      console.log('app.config.testA', this.ctx.app.config.testA)


      const stream = await render<Readable>(this.ctx, {
        stream: true
      })
      this.ctx.body = stream
    } catch (error) {
      console.log(error)
      this.ctx.body = error
    }
  }
}
