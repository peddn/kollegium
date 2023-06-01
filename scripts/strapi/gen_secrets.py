import base64
import secrets
from pathlib import Path

# Function to generate a secret key encoded in base64
def generate_secret():
    """Generates a random base64-encoded secret key."""
    return base64.b64encode(secrets.token_bytes(16)).decode('utf-8')

# Initial setup of environment variables with hardcoded values
env_vars_dict = {
  'HOST': '0.0.0.0',
  'PORT': '1337',
  'CREATE_DEMO_TICKETS': 'true',
  'DEMO_TICKETS_COUNT': 10
}

# Generate random keys and add them to the environment variables
appkeys = [generate_secret() for _ in range(2)]
env_vars_dict['APP_KEYS'] = str(appkeys)

for var_name in ['API_TOKEN_SALT', 'ADMIN_JWT_SECRET', 'JWT_SECRET', 'TRANSFER_TOKEN_SALT']:
    env_vars_dict[var_name] = generate_secret()

# Prepare the backend directory and .env file path
backend_dir = Path('../backend/')
envfile = backend_dir / '.env'

# Confirm with the user before making any changes
user_confirmation = input("Are you sure you want to regenerate the .env file? (yes/no): ")
if user_confirmation.lower() != 'yes':
    print("No changes were made.")
    exit(0)

# Check if an old .env file exists and remove it
if envfile.is_file():
  envfile.unlink()
  print("Successfully deleted the existing .env file.")
else:
  print("No existing .env file found.") 

# Create a new .env file and populate it with the environment variables
with envfile.open('x') as file:
  for key, value in env_vars_dict.items():
      file.write(f"{key}={value}\n")

print('Successfully created a new standard .env file with new secrets.')
print('You can customize this file according to your needs.')

