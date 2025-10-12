# this sh file is need to 'chmod +x seal-secrets.sh'
# start sh is './seal-secrets.sh'

# ANSI color code
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Starting SealedSecret encryption process...${NC}"

# kubeseal command check
if ! command -v kubeseal &> /dev/null
then
    echo "Error: kubeseal command not found. Please install kubeseal first."
    exit 1
fi

# 'sealed-secret-private.yaml' file check
find . -type f -name "sealed-secret-private.yaml" | while read private_file; do
    # Extract directory path where the file is located
    dir_path=$(dirname "$private_file")

    # Set the path for the encrypted file
    sealed_file="$dir_path/sealed-secret.yaml"
    
    echo "Encrypting: $private_file -> $sealed_file"

    # Use kubeseal command to encrypt
    kubeseal --format=yaml < "$private_file" > "$sealed_file"
done

echo -e "${GREEN}✅ All found secrets have been sealed.${NC}"