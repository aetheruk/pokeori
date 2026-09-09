import 'server-only'

export function getPushConfig() {
  const publicKey = process.env.WEB_PUSH_PUBLIC_KEY
  const privateKey = process.env.WEB_PUSH_PRIVATE_KEY
  const subject = process.env.WEB_PUSH_SUBJECT
  return publicKey && privateKey && subject ? { publicKey, privateKey, subject } : null
}
