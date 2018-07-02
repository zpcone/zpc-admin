function dateToGMT(strDate){
    var dateStr=strDate.split(" ");  
    var strGMT = dateStr[0]+" "+dateStr[1]+" "+dateStr[2]+" "+dateStr[5]+" "+dateStr[3]+" GMT+0800";  
    var date = new Date(Date.parse(strGMT));
    return date;
}

