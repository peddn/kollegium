# deployment

command to generate secrets

python -c "import base64, secrets; print(base64.b64encode(secrets.token_bytes(16)).decode('utf-8'))"
