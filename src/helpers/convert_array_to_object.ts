export function convertArrayObjectToObject<H, T extends { [key: string] : H}>(array: T[], key: string) {
  if (!array?.length) {
    return {}
  }

  return array.reduce((obj, item) => {
    const itemN = item[key];
    if (typeof itemN === 'string'){
       return {
      ...obj,
      [itemN]:  item,
      }
    }

    return {}

  }, {})
}
