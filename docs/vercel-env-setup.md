# Nastavení Environment Variables v Vercelu

Tento dokument popisuje, jak nastavit environment variables v Vercelu pro projekt Salon Fénix.

> **Poznámka:** Pokud ještě nemáte projekt naimportovaný do Vercelu, nejprve postupujte podle [vercel-initial-setup.md](./vercel-initial-setup.md).

## Požadované Environment Variables

Projekt potřebuje následující environment variables:

- `MAILERSEND_API_KEY` - API klíč pro MailerSend službu
- `RECAPTCHA_SECRET_KEY` - Secret key pro Google ReCAPTCHA
- `RECAPTCHA_SITE_KEY` - Site key pro Google ReCAPTCHA (používá se na klientovi)

## Nastavení přes Vercel Dashboard

1. Přejděte do Vercel Dashboard: <https://vercel.com>
2. Vyberte váš projekt
3. Přejděte na **Settings** → **Environment Variables**
4. Přidejte každou proměnnou:
   - Klikněte na **Add New**
   - Zadejte **Name** (např. `MAILERSEND_API_KEY`)
   - Zadejte **Value** (hodnotu z vašeho `.env.local`)
   - Vyberte **Environments**:
     - ✅ **Production**
     - ✅ **Preview** (pro DEV deployments)
     - ✅ **Development** (volitelné, pro lokální vývoj přes Vercel CLI)
   - Klikněte na **Save**

## Nastavení přes Vercel CLI

Můžete také nastavit environment variables pomocí Vercel CLI:

```bash
# Nastavení všech proměnných najednou
vercel env add MAILERSEND_API_KEY
vercel env add RECAPTCHA_SECRET_KEY
vercel env add RECAPTCHA_SITE_KEY
```

Při každém příkazu budete vyzváni k zadání hodnoty a výběru environments.

## Automatické nastavení pomocí skriptu

V kořenovém adresáři projektu je skript `scripts/setup-vercel-env.sh`, který vám pomůže nastavit všechny proměnné najednou.

```bash
chmod +x scripts/setup-vercel-env.sh
./scripts/setup-vercel-env.sh
```

Skript načte hodnoty z vašeho `.env.local` a nastaví je v Vercelu.

## Ověření nastavení

Po nastavení můžete ověřit, že proměnné jsou správně nastavené:

1. V Vercel Dashboard → Settings → Environment Variables
2. Nebo pomocí Vercel CLI:

   ```bash
   vercel env ls
   ```

## Bezpečnost

⚠️ **Důležité:**

- Environment variables jsou automaticky šifrovány v Vercelu
- Nikdy necommitujte `.env.local` do git repozitáře
- Každá environment (Production, Preview, Development) má vlastní hodnoty
- Pro DEV větev použijte Preview environment

## Aktualizace hodnot

Pokud potřebujete aktualizovat hodnotu environment variable:

1. Vercel Dashboard → Settings → Environment Variables
2. Klikněte na proměnnou, kterou chcete upravit
3. Klikněte na **Edit**
4. Aktualizujte hodnotu
5. Klikněte na **Save**

Po aktualizaci je potřeba znovu nasadit aplikaci, aby se změny projevily.
