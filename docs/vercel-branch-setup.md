# Nastavení větví v Vercelu

Tento dokument popisuje, jak správně nastavit větve pro automatické nasazování v Vercelu.

## Výchozí chování Vercelu

Když propojíte Git repository s Vercel:
- **Production Branch**: Automaticky se nastaví na `main` (nebo `master`)
- **Ostatní větve**: Nasazují se jako **Preview Deployments** s dočasnými URL

## Nastavení Production Branch

Pokud chcete změnit, která větev se nasazuje do produkce:

1. V Vercel Dashboard přejděte do vašeho projektu
2. Přejděte na **Settings** → **Git**
3. V sekci **Production Branch** vyberte požadovanou větev
4. Klikněte na **Save**

## Pro DEV větev

Pro projekt Salon Fénix používáme **Vercel Git integration** pro automatické nasazování. To znamená:

- **Production**: `main` větev (nasazována automaticky jako production deployment)
- **Preview/Dev**: `dev` větev (nasazována automaticky jako preview deployment)

## Jak to funguje

1. **Při pushu do `main` větve:**
   - Vercel automaticky nasadí jako production deployment

2. **Při pushu do `dev` větve (nebo jakékoliv jiné větve):**
   - Vercel automaticky vytvoří preview deployment s dočasnou URL

## Doporučené nastavení

Pro tento projekt:
- ✅ **Production Branch**: `main` (výchozí, nastaveno v Vercel Dashboard)
- ✅ **Vercel Auto-deploy**: Aktivní pro všechny větve
- ✅ **Preview Deployments**: Automaticky pro všechny větve kromě production branch

## Troubleshooting

### Vercel nasazuje špatnou větev

1. Zkontrolujte **Settings** → **Git** → **Production Branch**
2. Ujistěte se, že máte správnou větev v GitHub repository

### Jak poznat, který deployment je který

- **Production Deployment**: Nasazováno z `main` větve (nebo jiné nastavené production branch)
- **Preview Deployment**: Nasazováno z jakékoliv jiné větve (např. `dev`)
- V komentáři deploymentu uvidíte "Deployed via Vercel Git integration"

