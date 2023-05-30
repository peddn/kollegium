import os
import base64
import secrets
from pathlib import Path

ENV_VARS = [
  'HOST',
  'PORT',
  'APP_KEYS',
  'API_TOKEN_SALT',
  'ADMIN_JWT_SECRET',
  'JWT_SECRET',
]

values = [ '0.0.0.0', '1337' ]
for i in range(0,4):
    if i != 0:
      values.append(base64.b64encode(secrets.token_bytes(16)).decode('utf-8'))
    else:
       appkeys = "['" + base64.b64encode(secrets.token_bytes(16)).decode('utf-8') + "', '" + base64.b64encode(secrets.token_bytes(16)).decode('utf-8') + "']"
       values.append(appkeys)

# delete the old .env file if existent
backend_dir = Path('../../backend/')
envfile = backend_dir / '.env'
if os.path.exists(envfile):
  os.remove(envfile)
  print("Old .env file deleted!")
else:
  print("No .env file present.") 

with open(envfile, 'x') as file:
  for i in range(len(ENV_VARS)):
      file.write(ENV_VARS[i])
      file.write('=')
      file.write(values[i])
      file.write('\n')

print('Created new .env file.')