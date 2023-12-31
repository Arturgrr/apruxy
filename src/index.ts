import { ApruxyClient } from './client'
import { env } from './env'

new ApruxyClient().login(env.BOT_TOKEN)
