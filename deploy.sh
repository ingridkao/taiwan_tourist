# ./deploy.sh
set -e # 當發生錯誤時終止腳本運行

rm -rf dist
npm run build # 建置

cd dist # 移動至到建置後的 dist 目錄 

git init
git add -A
git commit -m 'deploy'

# 部署到 github 分支為 gh-pages
git push -f https://github.com/ingridkao/taiwan_tourist.git master:gh-pages

cd -