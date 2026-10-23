import { appendFile, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const filePath = resolve(process.cwd(), "blacklist.txt")

export async function saveOnBlacklist(token: string) {
    await appendFile(filePath, `${token}\n`, 'utf8')
}

export async function existsOnBlacklist(token: string) {
    try {
        const content = await readFile(filePath, "utf8")
        const savedTokens = content.split(/\r?\n/)

        return savedTokens.includes(token)
    } catch (error) {
        if (error instanceof Error && "code" in error && error.code === "ENOENT") {
            return false
        }
        throw error
    }
}