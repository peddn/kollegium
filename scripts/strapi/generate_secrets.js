// Synchronous
const { randomBytes } = require('node:crypto')

const ENV_VARS = [
  'HOST',
  'PORT',
  'APP_KEYS',
  'API_TOKEN_SALT',
  'ADMIN_JWT_SECRET',
  'JWT_SECRET',
]

let values = ['0.0.0.0', '1337']

for (let i = 0; i < 4; i++) {
  const buf = randomBytes(16)
  values.push(buf.toString('hex'))
}

for (let i = 0; i < ENV_VARS.length; i++) {
  console.log()
}
