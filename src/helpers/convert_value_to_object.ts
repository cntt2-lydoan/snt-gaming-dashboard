export function convertValueStringFromArrObjectByKey<H, T extends {[key: string]: H}>(array: T[],
    getKey: string, callback: (a: T) => boolean) {
    if (!array?.length) {

        return
    }

    const result: H[] = []

    array.forEach((item: T) => {
        const isValid = callback(item)
        if (!item[getKey] || typeof item[getKey] !== 'string' || !isValid) {

            return
        }
        result.push(item[getKey])
    })

    return result;
}
