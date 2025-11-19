import { Pool } from 'pg'
import { Kysely, PostgresDialect, sql } from "kysely";

let db: Kysely<{}>

export function makeDb<T extends Record<string, Record<string, any>> = {}>() {
    if (!db) {
        try {
            console.info('> establishing db connection...')
            const pool = new Pool({
                database: 'test',
                host: 'localhost',
                user: 'postgres',
                port: 5432,
                max: 10,
            })
            console.info('> db connection successful')
    
            const dialect = new PostgresDialect({ pool })
            db = new Kysely<{}>({ dialect })
        } catch (err) {
            console.error('> database connection failed')
            throw err
        }
    }

    return db.withTables<T>()
}

export async function pingDb() {
    try {
        await sql`SELECT 1`.execute(makeDb())
        return true
    } catch(err) {
        console.error('> DB ping failed', err)
        return false
    }
}