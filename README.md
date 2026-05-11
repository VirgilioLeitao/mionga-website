# Mionga Website

Website one-page premium para a Mionga, uma agencia digital focada em websites, redes sociais e automacoes para pequenos negocios em Portugal.

O objetivo principal do site e gerar contactos qualificados pelo WhatsApp.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Lucide React

## Requisitos

- Node.js 20 ou superior
- npm

## Instalar

```bash
npm install
```

## Variaveis de ambiente

Cria um ficheiro `.env` com base no `.env.example`.

```bash
VITE_WHATSAPP_NUMBER=351920807520
VITE_INSTAGRAM_URL=https://www.instagram.com/mionga__
VITE_LINKEDIN_URL=
```

O numero de WhatsApp deve estar em formato internacional, sem espacos nem simbolos.

## Desenvolvimento

```bash
npm run dev
```

O site abre normalmente em:

```bash
http://localhost:5173/
```

## Build de producao

```bash
npm run build
```

Para testar o build localmente:

```bash
npm run preview
```

## Deploy na Vercel

1. Envia este projeto para um repositorio GitHub.
2. Na Vercel, escolhe `Add New Project`.
3. Importa o repositorio do GitHub.
4. Usa estas configuracoes:

```bash
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

5. Adiciona as variaveis de ambiente na Vercel:

```bash
VITE_WHATSAPP_NUMBER=351920807520
VITE_INSTAGRAM_URL=https://www.instagram.com/mionga__
VITE_LINKEDIN_URL=
```

6. Depois do deploy, adiciona o dominio `www.mionga.com` nas definicoes do projeto na Vercel e configura o DNS no Hostinger conforme os registos indicados pela Vercel.

## Logo

O logo principal esta em:

```bash
assets/logo.svg
```

Tambem existe uma copia publica em:

```bash
public/assets/logo.svg
```

A versao em `assets/logo.svg` e usada pela aplicacao React. A versao em `public/assets/logo.svg` fica disponivel para metadados, previews e assets publicos.

## Estrutura principal

```bash
src/
  components/
  data/
  lib/
  styles/
```

O conteudo editavel do site esta concentrado em:

```bash
src/data/siteContent.ts
```
