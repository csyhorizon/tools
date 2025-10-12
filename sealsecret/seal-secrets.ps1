# ANSI color code
$YELLOW = "`e[1;33m"
$GREEN = "`e[0;32m"
$NC = "`e[0m"

Write-Host "${YELLOW}Starting SealedSecret encryption process...${NC}"

# kubeseal command check
if (-not (Get-Command kubeseal -ErrorAction SilentlyContinue)) {
    Write-Host "Error: kubeseal command not found. Please install kubeseal first."
    exit 1
}

# 'sealed-secret-private.yaml' file check and process
Get-ChildItem -Path . -Filter "sealed-secret-private.yaml" -Recurse -File | ForEach-Object {
    $privateFile = $_
    $dirPath = $privateFile.DirectoryName
    $sealedFile = Join-Path -Path $dirPath -ChildPath "sealed-secret.yaml"

    Write-Host "Encrypting: $($privateFile.FullName) -> $sealedFile"

    Get-Content $privateFile.FullName | kubeseal --format=yaml | Set-Content $sealedFile
}

Write-Host "${GREEN}✅ All found secrets have been sealed.${NC}"