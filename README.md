# Salon Fénix - Moderní webový projekt

Moderní webová aplikace salon-fenix.cz postavená na **Next.js 16**, **React 19**, **TypeScript** a **i18n**.

## 🚀 Technologie

- **Next.js 16** - React framework s App Router
- **React 19.2.0** - Moderní React s React Compiler
- **TypeScript 5.9** - Typová bezpečnost s strict mode
- **Tailwind CSS 4.1** - Moderní CSS framework
- **FormatJS Intl** - Vícejazyčná podpora (čeština, angličtina, němčina)
- **MailerSend** - Email služba pro kontaktní formulář
- **Google ReCAPTCHA** - Ochrana proti spamu

## 📁 Struktura projektu

```text
Fenix/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Lokalizované stránky
│   │   │   ├── page.tsx       # Hlavní stránka
│   │   │   ├── layout.tsx     # Layout pro lokalizované stránky
│   │   │   ├── sluzby/        # Stránka služeb
│   │   │   ├── cenik/         # Ceník
│   │   │   ├── fotogalerie/   # Fotogalerie
│   │   │   ├── kontakt/       # Kontaktní stránka
│   │   │   └── portfolio/     # Portfolio
│   │   ├── api/               # API routes
│   │   │   ├── contact/       # Kontaktní formulář endpoint
│   │   │   └── env/           # Environment proměnné API
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Globální styly
│   ├── common/                 # Sdílené komponenty
│   │   ├── Contact/           # Kontaktní komponenty
│   │   ├── Footer/            # Footer komponenta
│   │   ├── Gallery/           # Galerie komponenta
│   │   ├── Header/            # Header komponenta
│   │   ├── Hero/              # Hero sekce
│   │   ├── PortfolioCard/    # Portfolio karta
│   │   ├── ServiceCard/       # Service karta
│   │   └── ui/               # UI komponenty
│   ├── data/                  # Data v JSON
│   │   ├── services.json      # Seznam služeb
│   │   └── pricing.json       # Ceník
│   ├── lib/                   # Utility funkce
│   │   ├── contact-action.ts  # Server action pro kontaktní formulář
│   │   ├── intl.ts            # Intl helper funkce
│   │   ├── IntlProvider.tsx   # Intl provider
│   │   └── GoogleReCaptchaProvider.tsx
│   └── proxy.ts               # Middleware pro internacionalizaci
├── lang/                       # Překlady
│   ├── cs.json                # Čeština
│   ├── en.json                # Angličtina
│   └── de.json                # Němčina
├── public/                     # Veřejné soubory
│   └── static/                # Statické obrázky
├── i18n-config.ts            # i18n konfigurace
├── next.config.ts             # Next.js konfigurace
├── package.json               # Závislosti
├── tsconfig.json              # TypeScript konfigurace
└── eslint.config.mjs          # ESLint konfigurace
```

## 🛠️ Instalace a spuštění

### Požadavky

- **Node.js** >= 22.14.0
- **pnpm** (doporučeno) nebo npm/yarn

### 1. Instalace závislostí

```bash
# Klonování projektu
git clone <repository-url>
cd Fenix

# Instalace závislostí pomocí pnpm
pnpm install
```

### 2. Environment proměnné

Vytvořte soubor `.env.local` v kořenovém adresáři:

```env
# MailerSend API klíč
MAILERSEND_API_KEY=your_mailersend_api_key

# Google ReCAPTCHA
RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```

### 3. Vývojový server

```bash
# Spuštění vývojového serveru
pnpm dev

# Otevřete http://localhost:3000
```

### 4. Produkční build

```bash
# Build projektu
pnpm build

# Spuštění produkční verze
pnpm start

# Náhled produkční verze na portu 4000
pnpm preview
```

## 🌐 Vícejazyčnost

Projekt podporuje tři jazyky:

- **Čeština**: `/` (výchozí jazyk)
- **Angličtina**: `/en`
- **Němčina**: `/de`

### Přidání nového jazyka

1. Vytvořte nový soubor v `lang/` (např. `fr.json`)

2. Upravte `i18n-config.ts` a přidejte nový jazyk do pole `locales`:

   ```typescript
   export const i18n = {
     locales: ["cs", "en", "de", "fr"],
     defaultLocale: "cs",
   };
   ```

3. Přidejte překlady do nového JSON souboru

## 📊 Data management

### Služby a ceny

Data jsou uložena v JSON souborech:

- `src/data/services.json` - Seznam všech služeb s kategoriemi
- `src/data/pricing.json` - Ceník služeb

### Použití dat v komponentách

```typescript
import services from '@/data/services.json';

const featuredServices = services.services.filter((service) => service.featured);
```

## 🎨 Styling

Projekt používá **Tailwind CSS 4.1** s vlastní konfigurací. Styly jsou v `src/app/globals.css`.

### Responzivní design

Všechny komponenty jsou plně responzivní:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Vývojové příkazy

```bash
# Vývojový server
pnpm dev

# Produkční build
pnpm build

# Spuštění produkční verze
pnpm start

# Linting
pnpm lint

# Automatická oprava lint chyb
pnpm lint:fix

# Formátování kódu
pnpm format

# Kontrola formátování
pnpm prettier:show

# Vyčištění projektu
pnpm clean
```

## 📝 Code Style

Projekt používá:

- **Arrow functions** místo function declarations
- **Type aliases** místo interfaces
- **Strict TypeScript** konfiguraci
- **ESLint** s TypeScript pluginem
- **Prettier** pro formátování

## 🔐 Bezpečnost

- **Security headers** v Next.js konfiguraci
- **Google ReCAPTCHA** pro ochranu kontaktního formuláře
- **Server Actions** pro bezpečné zpracování formulářů
- **Environment variables** pro citlivé údaje

## 🚀 Deployment

### Vercel (doporučeno)

Projekt je připraven pro deployment na Vercel:

```bash
# Instalace Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["pnpm", "start"]
```

## 📦 Závislosti

### Hlavní závislosti

- `next@16.0.1` - Next.js framework
- `react@19.2.0` - React knihovna
- `react-dom@19.2.0` - React DOM
- `@formatjs/intl@3.1.8` - Internacionalizace
- `mailersend@^2.6.0` - Email služba
- `tailwindcss@4.1.16` - CSS framework

Viz `package.json` pro kompletní seznam.

## 🤝 Contributing

1. Forkněte projekt
2. Vytvořte feature branch (`git checkout -b feature/AmazingFeature`)
3. Commitněte změny (`git commit -m 'Add some AmazingFeature'`)
4. Pushněte do branch (`git push origin feature/AmazingFeature`)
5. Otevřete Pull Request

## 📝 Licence

Projekt je vytvořen pro Salon Fénix.

## 🤞 Podpora

Pro jakékoliv dotazy kontaktujte vývojový tým.

---

**Salon Fénix** - Moderní péče o vaši krásu a relaxaci.
