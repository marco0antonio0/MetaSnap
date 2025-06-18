# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Instala bibliotecas do sistema necessárias para Chromium (Puppeteer)
RUN apt-get update && apt-get install -y \
  wget \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libxshmfence1 \
  libgbm1 \
  xdg-utils \
  --no-install-recommends && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências da aplicação
RUN npm install --force

# Copia o restante da aplicação
COPY . .

# Compila o projeto (gera a pasta dist)
RUN npm run build

# Comando para iniciar o servidor em modo de desenvolvimento
CMD ["npm", "run", "start"]
