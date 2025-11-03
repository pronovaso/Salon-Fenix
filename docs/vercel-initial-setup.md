# První nastavení projektu v Vercelu

Tento dokument popisuje, jak naimportovat projekt do Vercelu a získat potřebné credentials pro GitHub Actions.

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
8. Klikněte na **Deploy**

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

## Krok 2: Získání credentials pro GitHub Actions

Po úspěšném importu projektu potřebujete získat tři hodnoty:

### 1. VERCEL_TOKEN

1. V Vercel Dashboard přejděte na **Settings** → **Tokens**
2. Klikněte na **Create Token**
3. Zadejte název tokenu (např. "GitHub Actions")
4. Vyberte scope (neomezený nebo pouze pro konkrétní projekt)
5. Klikněte na **Create**
6. **Zkopírujte token** (zobrazí se pouze jednou!)

### 2. VERCEL_ORG_ID

1. V Vercel Dashboard přejděte na **Settings** → **General**
2. V sekci **Organization ID** najdete vaše **Organization ID**
3. Zkopírujte ID

### 3. VERCEL_PROJECT_ID

1. V Vercel Dashboard přejděte do vašeho projektu
2. Přejděte na **Settings** → **General**
3. V sekci **Project ID** najdete vaše **Project ID**
4. Zkopírujte ID

**Alternativně můžete získat ID z `.vercel/project.json` po prvním deploymentu:**

```bash
# Po prvním deploymentu přes CLI
cat .vercel/project.json
```

Výstup bude vypadat takto:
```json
{
  "projectId": "prj_xxxxxxxxxxxxx",
  "orgId": "team_xxxxxxxxxxxxx"
}
```

## Krok 3: Nastavení GitHub Secrets

1. V GitHub repository přejděte na **Settings** → **Secrets and variables** → **Actions**
2. Klikněte na **New repository secret**
3. Přidejte každý secret:

   **Secret 1: VERCEL_TOKEN**
   - Name: `VERCEL_TOKEN`
   - Value: (token z kroku 2.1)

   **Secret 2: VERCEL_ORG_ID**
   - Name: `VERCEL_ORG_ID`
   - Value: (Organization ID z kroku 2.2)

   **Secret 3: VERCEL_PROJECT_ID**
   - Name: `VERCEL_PROJECT_ID`
   - Value: (Project ID z kroku 2.3)

## Krok 4: Nastavení Environment Variables

Nastavte environment variables v Vercelu (viz [vercel-env-setup.md](./vercel-env-setup.md)):
- `MAILERSEND_API_KEY`
- `RECAPTCHA_SECRET_KEY`
- `RECAPTCHA_SITE_KEY`

## Ověření nastavení

Po dokončení všech kroků můžete ověřit, že vše funguje:

1. Pushněte změny do `dev` větve
2. GitHub Actions workflow by se měl automaticky spustit
3. V GitHub repository → **Actions** uvidíte běžící workflow
4. Po úspěšném deploymentu uvidíte URL v GitHub Actions výstupu

## Troubleshooting

### Projekt není viditelný v seznamu
- Ujistěte se, že je Vercel připojený k vašemu GitHub účtu
- V GitHub repository → **Settings** → **Integrations** → **Vercel** zkontrolujte, že je integrace aktivní

### Chyba při deploymentu
- Zkontrolujte, že jsou všechny tři secrets správně nastavené v GitHub
- Ověřte, že environment variables jsou nastavené v Vercelu pro **Preview** environment
- Zkontrolujte logy v GitHub Actions pro detailnější chybové hlášky

### Jak získat Project ID a Org ID rychle přes CLI

```bash
# Po vercel login
vercel projects ls
vercel project ls
```

Nebo zkontrolujte `.vercel/project.json` po prvním deploymentu.

