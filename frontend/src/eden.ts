import { treaty, type Treaty} from '@elysiajs/eden'
import type { App } from "@backend/server";

// Create the client

const url = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'

export const client: Treaty.Create<App> = treaty<App>(url)