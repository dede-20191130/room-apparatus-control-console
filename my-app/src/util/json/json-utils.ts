export function parseSafely(
    text: string, reviver?: ((this: any, key: string, value: any) => any) | undefined
) {
    try {
        return JSON.parse(text, reviver);
    } catch (error) {
        if (error instanceof SyntaxError) {
            return null;
        } else {
            throw error;
        }
    }
}