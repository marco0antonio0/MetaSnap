import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScreenshotService {
  async generateScreenshot(url: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    const buffer = Buffer.from(
        await page.screenshot({ type: 'jpeg', quality: 80 })
      );
    await browser.close();
    return buffer;
  }
}
