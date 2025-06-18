import {
    Controller,
    Get,
    Query,
    Res,
    BadRequestException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { ScreenshotService } from './screenshot.service';
  import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
  
  @ApiTags('screenshot')
  @Controller('screenshot')
  export class ScreenshotController {
    constructor(private readonly screenshotService: ScreenshotService) {}
  
    @Get()
    @ApiQuery({ name: 'url', type: String, description: 'URL da página para capturar' })
    @ApiQuery({ name: 'refresh', type: Boolean, required: false, description: 'Força a atualização da imagem ignorando o cache' })
    @ApiResponse({ status: 200, description: 'Imagem capturada com sucesso', content: { 'image/jpeg': {} } })
    @ApiResponse({ status: 400, description: 'Parâmetro ausente ou inválido' })
    @ApiResponse({ status: 500, description: 'Erro ao gerar screenshot' })
    async getScreenshot(
      @Query('url') url: string,
      @Query('refresh') refresh: string,
      @Res() res: Response
    ) {
      if (!url) {
        throw new BadRequestException('O parâmetro "url" é obrigatório.');
      }
    
      const forceRefresh = refresh === 'true';
    
      try {
        const buffer = await this.screenshotService.generateScreenshot(url, forceRefresh);
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.send(buffer);
      } catch (error) {
        console.error('[ScreenshotController] Erro ao gerar screenshot:', error);
        throw new InternalServerErrorException('Erro ao gerar screenshot');
      }
    }
  }
  