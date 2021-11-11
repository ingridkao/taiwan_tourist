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
