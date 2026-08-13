# 24 роки Сіми

Преміальний інтерактивний birthday experience українською мовою. Побудовано на React, Vite, TypeScript, Tailwind CSS і Framer Motion.

## Запуск

```bash
npm install
npm run dev
```

## Персоналізація

Увесь особистий контент зібрано в одному файлі: `src/data/sima.ts`.

- `birthday` — точна дата дня народження.
- `photos` — основні фотографії, підписи, дати й категорії.
- `audi` — дані Audi A3.
- `landscaping` — фото до/після.
- `insideJokes` — приховані жарти.
- `songs` — локальні аудіофайли.
- `leadership`, `mentor`, `impact`, `faith`, `finale` — особисті повідомлення.

Фото зручно покласти в `public/photos`, музику — у `public/audio`, а в конфігурації пропускати відносні шляхи на кшталт `photos/sima-hero.webp` або `audio/track.mp3` через helper `assetUrl`. Так медіа працюють і локально, і на GitHub Pages у підшляху `/sima/`.

Музика не запускається автоматично. Плеєр відтворює лише локальні файли, додані власником сайту.

Поточна збірка вже містить 19 оптимізованих WebP-фото Сіми та локальний трек `Dai Dai`. Оригінальні HEIC/JPG/PNG-файли не змінювалися.

## GitHub Pages

Push у `main` автоматично збирає Vite-проєкт і публікує папку `dist` через workflow `.github/workflows/deploy-pages.yml`.

Адреса сайту: `https://markdevelopertest.github.io/sima/`.
