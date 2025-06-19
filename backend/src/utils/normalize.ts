export function normalizeString(str: string): string {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')    // remove acentos
        .replace(/\s+/g, ' ')               // remove espaços duplicados
        .trim()
        .toLowerCase();
}