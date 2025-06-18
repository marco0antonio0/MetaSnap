# 📸 MetaSnap

**MetaSnap** é uma API REST feita em **NestJS** com suporte ao **Swagger**, que permite gerar automaticamente capturas de tela (screenshots) de páginas da web a partir de uma URL fornecida. Ideal para usar como imagem dinâmica em `og:image`, `twitter:image` ou para gerar previews de sites.

---

## 🚀 Funcionalidades

- Geração de imagem `.jpeg` com resolução 1200x630.
- Endpoint GET para geração imediata via URL.
- Documentação via Swagger UI acessível em `/api`.
- Totalmente self-hosted, sem depender de serviços externos.

---

## 📦 Instalação

```bash
git clone git@github.com:marco0antonio0/MetaSnap.git
cd metasnap
npm install
```

---

## ▶️ Executando o projeto

```bash
npm run start:dev
```

A API estará disponível em:

```
http://localhost:3000/screenshot?url=https://vetemcasabelem.com
```

---

## 📘 Documentação (Swagger)

Acesse a documentação Swagger em:

Swagger online:
[https://metasnap.dirrocha.com/api](https://metasnap.dirrocha.com/api)


Localmente:
```
http://localhost:3000/api
```

Exemplo de requisição:

```
GET /screenshot?url=https://raquelevetlar.store
```

Retorna uma imagem `image/jpeg`.

---

## 🖼️ Exemplo de uso no metadata Open Graph

```ts
{imageBuffer}
```

---

## ☁️ Deploy recomendado

- Railway, Render, AWS EC2, GPC ou VPS (com suporte ao Puppeteer/Chromium)
- **⚠️ Vercel NÃO suporta Puppeteer por padrão** (usar `chrome-aws-lambda` se necessário)
- exemplo de docker e docker composer incluido no projeto

---

## 📁 Estrutura do projeto

```
src/
├── screenshot/
│   ├── screenshot.controller.ts
│   ├── screenshot.service.ts
│   └── screenshot.module.ts
├── app.module.ts
└── main.ts
```

---

## 📜 Licença

MIT © 2025