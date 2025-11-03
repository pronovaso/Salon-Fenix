# První nastavení projektu v Vercelu

Tento dokument popisuje, jak naimportovat projekt do Vercelu a propojit ho s GitHub repository pro automatické nasazování.

## Krok 1: Import projektu do Vercelu

Máte dvě možnosti:

### Varianta A: Import přes Vercel Dashboard (doporučeno)

1. Přejděte do Vercel Dashboard: <https://vercel.com>
2. Přihlaste se nebo vytvořte účet
3. Klikněte na **Add New...** → **Project**
4. Vyberte vaše GitHub repository
5. Pokud projekt není v seznamu, klikněte na **Import Git Repository** a zadejte URL vašeho repozitáře
6. Vercel automaticky detekuje Next.js projekt
7. **Nastavení projektu:**
   - **Framework Preset**: Next.js (mělo by být automaticky detekováno)
   - **Root Directory**: `./` (nechte prázdné, pokud je projekt v rootu)
   - **Build Command**: `pnpm build` (nebo `npm run build`)
   - **Output Directory**: `.next` (nechte výchozí)
   - **Install Command**: `pnpm install` (nebo `npm install`)
8. **⚠️ DŮLEŽITÉ - Nastavení větví:**
   - **Production Branch**: Nechte `main` (nebo změňte podle potřeby)
   - Vercel automaticky nasazuje `main` jako production
   - Ostatní větve (např. `dev`) budou nasazovány jako preview deployments
9. Klikněte na **Deploy**

### Varianta B: Import přes Vercel CLI

```bash
# Instalace Vercel CLI (pokud ještě není nainstalováno)
npm install -g vercel

# V kořenovém adresáři projektu spusťte:
vercel

# Postupujte podle pokynů:
# - Přihlaste se do Vercelu
# - Vyberte scope (organizaci)
# - Název projektu (nebo použijte výchozí)
# - Root directory: ./ (nechte výchozí)
# - Override settings: N (nechte výchozí nastavení)
```

## Krok 2: Nastavení Production Branch (volitelné)

Pokud chcete, aby `dev` větev byla nasazována místo `main`:

1. V Vercel Dashboard přejděte do vašeho projektu
2. Přejděte na **Settings** → **Git**
3. V sekci **Production Branch** změňte branch z `main` na `dev` (nebo jinou větev)
4. Uložte změny

**Poznámka:** Vercel automaticky nasazuje všechny větve. `main` větev (nebo jiná nastavená production branch) se nasazuje jako production, ostatní větve jako preview deployments.

## Krok 3: Nastavení Environment Variables

Nastavte environment variables v Vercelu (viz [vercel-env-setup.md](./vercel-env-setup.md)):
- `MAILERSEND_API_KEY`
- `RECAPTCHA_SECRET_KEY`
- `RECAPTCHA_SITE_KEY`

## Ověření nastavení

Po dokončení všech kroků můžete ověřit, že vše funguje:

1. Pushněte změny do jakékoliv větve (např. `dev`)
2. Vercel automaticky detekuje push a spustí deployment
3. V Vercel Dashboard → **Deployments** uvidíte běžící deployment
4. Po úspěšném deploymentu obdržíte URL:
   - **Production**: Trvalá URL pro `main` větev
   - **Preview**: Dočasná URL pro ostatní větve

## Troubleshooting

### Projekt není viditelný v seznamu
- Ujistěte se, že je Vercel připojený k vašemu GitHub účtu
- V GitHub repository → **Settings** → **Integrations** → **Vercel** zkontrolujte, že je integrace aktivní

### Chyba při deploymentu
- Ověřte, že environment variables jsou nastavené v Vercelu pro správné environments (**Production** a **Preview**)
- Zkontrolujte build logy v Vercel Dashboard pro detailnější chybové hlášky
- Ujistěte se, že build command je správně nastavený (`pnpm build` nebo `npm run build`)

