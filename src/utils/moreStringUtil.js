 export const maxString = (str, length, suffix) => {
    let rs = "";
    let index = 0;
    if(str.length>length) {
    rs = str.substring(0,length)
    index = rs.lastIndexOf(" ");
    
    rs = rs.substring(0,index);
    rs += " ... " + suffix;
    return rs;
    } else {
        return str;
    }
}