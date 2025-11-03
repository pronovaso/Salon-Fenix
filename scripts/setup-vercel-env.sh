#!/bin/bash

# Skript pro nastavení environment variables v Vercelu
# Používá hodnoty z .env.local souboru

set -e

# Barvy pro výstup
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Nastavování environment variables v Vercelu${NC}\n"

# Kontrola, zda existuje .env.local
if [ ! -f .env.local ]; then
    echo -e "${RED}❌ Soubor .env.local nebyl nalezen!${NC}"
    echo "Prosím vytvořte .env.local soubor s vašimi environment variables."
    exit 1
fi

# Kontrola, zda je nainstalován Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI není nainstalován!${NC}"
    echo "Instalujte pomocí: npm install -g vercel"
    exit 1
fi

# Načtení hodnot z .env.local
source .env.local

# Seznam proměnných, které chceme nastavit
ENV_VARS=(
    "MAILERSEND_API_KEY"
    "RECAPTCHA_SECRET_KEY"
    "RECAPTCHA_SITE_KEY"
)

# Funkce pro nastavení proměnné
set_env_var() {
    local var_name=$1
    local var_value=$2
    
    if [ -z "$var_value" ]; then
        echo -e "${YELLOW}⚠️  Proměnná $var_name není nastavena v .env.local, přeskočeno${NC}"
        return
    fi
    
    echo -e "${GREEN}📝 Nastavuji $var_name...${NC}"
    
    # Nastavení pro Preview environment (používá se pro DEV deployments)
    echo "$var_value" | vercel env add "$var_name" preview
    
    # Nastavení pro Production (volitelné - můžete smazat, pokud nechcete)
    read -p "Chcete nastavit $var_name také pro Production? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "$var_value" | vercel env add "$var_name" production
    fi
}

# Nastavení všech proměnných
for var in "${ENV_VARS[@]}"; do
    # Dynamické získání hodnoty proměnné
    var_value=$(eval echo \$$var)
    set_env_var "$var" "$var_value"
done

echo -e "\n${GREEN}✅ Dokončeno!${NC}"
echo -e "${YELLOW}💡 Tip: Můžete ověřit nastavení pomocí: vercel env ls${NC}"

