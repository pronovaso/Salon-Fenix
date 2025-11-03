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

Pro projekt Salon Fénix používáme **GitHub Actions** pro automatické nasazování z `dev` větve jako preview deployments. To znamená:

- **Production**: `main` větev (pokud je nastavena v Vercelu)
- **Preview/Dev**: `dev` větev (nasazována přes GitHub Actions)

## Jak to funguje

1. **Při pushu do `main` větve:**
   - Vercel automaticky nasadí jako production deployment
   - Pokud je GitHub Actions workflow aktivní, může také spustit deployment

2. **Při pushu do `dev` větve:**
   - GitHub Actions workflow spustí preview deployment
   - Vercel také může automaticky vytvořit preview deployment (pokud je aktivní auto-deploy pro všechny větve)

## Deaktivace automatického nasazování z Vercelu

Pokud chcete používat pouze GitHub Actions pro nasazování:

1. V Vercel Dashboard → **Settings** → **Git**
2. V sekci **Deploy Hooks** můžete deaktivovat automatické nasazování
3. Nebo jednoduše nepoužívejte push do větví, které chcete nasazovat pouze přes GitHub Actions

## Doporučené nastavení

Pro tento projekt:
- ✅ **Production Branch**: `main` (výchozí)
- ✅ **GitHub Actions**: Nasazuje `dev` jako preview
- ✅ **Vercel Auto-deploy**: Aktivní pro `main` (produkce)
- ✅ **Preview Deployments**: Automaticky z GitHub Actions pro `dev`

## Troubleshooting

### Vercel nasazuje špatnou větev

1. Zkontrolujte **Settings** → **Git** → **Production Branch**
2. Ujistěte se, že máte správnou větev v GitHub repository
3. Zkontrolujte GitHub Actions workflow, že nasazuje správnou větev

### Duplicitní deployments

Pokud vidíte, že se projekt nasazuje dvakrát (jednou z Vercelu, jednou z GitHub Actions):

1. V Vercel Dashboard → **Settings** → **Git**
2. Zkontrolujte **Deploy Hooks** nebo **Ignored Build Step**
3. Můžete nastavit podmínku, aby Vercel nenasazoval, pokud je to GitHub Actions deployment

### Jak poznat, který deployment je který

- **Vercel Auto-deploy**: V komentáři deploymentu uvidíte "Deployed via Vercel Git integration"
- **GitHub Actions**: V komentáři deploymentu uvidíte "Deployed via GitHub Actions" nebo podobný text

