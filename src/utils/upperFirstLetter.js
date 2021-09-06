export const upperFirstLetter = (str) => {
    let strArr = str.split("");
    return strArr[0].toLocaleUpperCase() + strArr.slice(1, strArr.length).join("");
}