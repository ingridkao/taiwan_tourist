export const GetAuthorizationHeader = () => {
    const AppID = 'fe8a15a3865248428e81f3357ca752f9'
    const AppKey = '-KKFfJvNKRJrNP85dJXH0IoadNg'

    const GMTString = new Date().toGMTString();
    const ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    const HMAC = ShaObj.getHMAC('B64');
    const Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

    return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/}; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}

export const GetTdxData = () => {
    const url = 'https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/Station?$top=10&$format=JSON' //欲呼叫之API網址(此範例為台鐵車站資料)
    fetch(url,{
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then((response) => {
        return response
    })
    .catch(error => {
        return error
    })
}

export const citiy = {
    Taipei: "臺北市",
    NewTaipei: "新北市",
    Taoyuan: "桃園市",
    Taichung: "臺中市",
    Tainan: "臺南市",
    Kaohsiung: "高雄市",
    Keelung: "基隆市",
    Hsinchu: "新竹市",
    HsinchuCounty: "新竹縣",
    MiaoliCounty: "苗栗縣",
    ChanghuaCounty: "彰化縣",
    NantouCounty: "南投縣",
    YunlinCounty: "雲林縣",
    ChiayiCounty: "嘉義縣",
    Chiayi: "嘉義市",
    PingtungCounty: "屏東縣",
    YilanCounty: "宜蘭縣",
    HualienCounty: "花蓮縣",
    TaitungCounty: "臺東縣",
    KinmenCounty: "金門縣",
    PenghuCounty: "澎湖縣",
    LienchiangCounty: "連江縣",
}
