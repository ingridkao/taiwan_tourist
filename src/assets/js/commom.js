import axios from 'axios'
import jsSHA from 'jssha'

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

export const GetTdxData = (inputUrl, params={}) => {
    const init = 'https://ptx.transportdata.tw/MOTC'
    const paramsObj = {
        '$top': 10, 
        format: 'JSON',
        ...params
    }
    const searchParams = new URLSearchParams(paramsObj)
    const fetchurl = `${init}${inputUrl? inputUrl: '/v2/Rail/TRA/Station'}${searchParams.toString() === ''? '': '?' + searchParams.toString()}`
    return axios.get(fetchurl,{
        headers: GetAuthorizationHeader()
    })
    .then((response) => {
        return response.data
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

export const apiType = [
    {
        index: 'ScenicSpot',
        title: '熱門景點',
        name: '景點',
        url: '/v2/Tourism/ScenicSpot'
    },
    {
        index: 'Activity',
        title: '觀光活動',
        name: '活動',
        url: '/v2/Tourism/Activity'
    },
    {
        index: 'Restaurant',
        title: '美食品嚐',
        name: '餐飲',
        url: '/v2/Tourism/Restaurant'
    },
    {
        index: 'Hotel',
        title: '住宿推薦',
        name: '住宿',
        url: '/v2/Tourism/Hotel'
    }
]