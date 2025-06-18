import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as crypto from 'crypto';

interface CacheEntry {
  buffer: Buffer;
  hash: string;
  timestamp: number;
}

@Injectable()
export class ScreenshotService {
  private cache = new Map<string, CacheEntry>();
  private readonly ttlMs = 24 * 60 * 60 * 1000; // 24 horas

  async generateScreenshot(url: string, forceRefresh = false): Promise<Buffer> {
    // console.log('[ScreenshotService] Iniciando geração de screenshot...');
    // console.log(`[ScreenshotService] URL alvo: ${url}`);
    // console.log(`[ScreenshotService] Forçar atualização? ${forceRefresh}`);
  
    const now = Date.now();
    const cached = this.cache.get(url);
    const isExpired = cached && now - cached.timestamp > this.ttlMs;
  
    // se houver cache, o conteúdo for igual, e não estiver expirado e não for refresh forçado
    if (cached && !isExpired && !forceRefresh) {
    //   console.log('[ScreenshotService] Cache válido encontrado.');
      return cached.buffer;
    }
  
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
  
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    //   console.log('[ScreenshotService] Página carregada com sucesso');
    } catch (error) {
      console.error('[ScreenshotService] Erro ao carregar a página:', error);
      await browser.close();
      throw new Error('Falha ao carregar a URL fornecida');
    }
  
    const html = await page.content();
    const newHash = crypto.createHash('sha256').update(html).digest('hex');
  
    try {
      const screenshot = await page.screenshot({ type: 'jpeg', quality: 80 });
      const buffer = Buffer.from(screenshot);
  
      this.cache.set(url, {
        buffer,
        hash: newHash,
        timestamp: now,
      });
  
    //   console.log('[ScreenshotService] Screenshot atualizada e cache renovado.');
      await browser.close();
      return buffer;
    } catch (error) {
      console.error('[ScreenshotService] Erro ao capturar screenshot:', error);
      await browser.close();
      throw new Error('Falha ao capturar a screenshot');
    }
  }
  
}
