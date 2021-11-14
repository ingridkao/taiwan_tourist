# taiwan_tourist

- The F2E 3rd 前端修練精神時光屋 - 台灣旅遊景點導覽
- 使用TDX交通API來串接全台觀光景點、觀光餐飲、旅宿、交通動態
- 使用 Vite


### User story
* 篩選縣市地區，瀏覽該市區的景點
* 用圖文列表模式來瀏覽
* 透過 PC 網站瀏覽，也能透過 Mobile 來瀏覽介面


### 頁面介紹
依據設計稿並加入自己定義的使用情境需求，加以更改頁面：
1. Landing page: 以目的地開始搜尋
3. City Guide: 列出目的地觀光景點、觀光餐飲、旅宿、活動
4. More Touism: 四個類型擇一的更多景點列表頁面，在其中使用分頁
5. Information：除了景點資訊，使用nearby參數來取得附近相關類型景點

6. Aside menu:依據螢幕寬度有不同呈現方式，搜尋功能可以連動到該頁面之卡片列表
7. Footer:開賽前測試一下svg互動，把台灣地圖加進去，可以依據選取縣市來進入Page2
8. 使用vue router來暫存重要參數

### Demo
- https://ingridkao.github.io/taiwan_tourist/

#### 設計
- 很喜歡jhen的插圖風格
- 設計提供者：jhen 
- 設計稿[Figma](https://www.figma.com/file/fnHynjl6HHHCcqay2C4KVn)


### 心得
- Ｖite真的很快
- 這次分頁嘗試另一種寫法
- 預計一月把ToDo list裡面的功能補完
- 不知道是不是API有請求限制，頁面經常會回覆空陣列


### Memo
- Vite Scss config >> [參考1](https://vitejs.dev/guide/features.html#css-pre-processors),[參考2](
https://stackoverflow.com/questions/68131954/how-to-use-sass-using-in-vuejs3-vite)

- 安裝vuex的時候發生錯誤，does not provide an export named 'createRouter' 
`npm uninstall vuex`
`npm i --save vuex@next`


### ToDo list
- API error
- NoData的狀態
- 將card內容加入行程
- 將行程表中的地點呈現在地圖
- 可以匯出csv讓使用者匯入到google map