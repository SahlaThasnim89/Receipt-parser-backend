import Database from 'better-sqlite3';
import fs from 'fs'
import path from "path"

const dbPath=path.join(__dirname,"receipt.ts")

const db = new Database(dbPath);

const schemaPath=path.join(__dirname,"schema.sql")

if(fs.existsSync(schemaPath)){
    const schema=fs.readFileSync(schemaPath,"utf8")
    db.exec(schema)
}

export default db