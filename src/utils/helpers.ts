export function formatMoneyVND(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function generateString(
    prefix: string,
    minLength: number,
    maxLength: number,
    charset: "number" | "letter" | "both" = "both"
): string {
    const numbers = "0123456789";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let chars = "";
    if (charset === "number") chars = numbers;
    if (charset === "letter") chars = letters;
    if (charset === "both") chars = numbers + letters;

    const suffixLength = Math.floor(
        Math.random() * (maxLength - minLength + 1)
    ) + minLength;

    let suffix = "";
    for (let i = 0; i < suffixLength; i++) {
        suffix += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return prefix + suffix;
}