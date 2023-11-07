export function formatInput(value: string) {
    const val = value.trimStart();
    const formattedValue = []
    for (let i = 0; i < val.length; i++) {
        if (i === 0) {
            formattedValue.push(val[i].toUpperCase());
            i++;
        }
        formattedValue.push(val[i].toLowerCase())
    }
    return formattedValue.join("").trim();
}