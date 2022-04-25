
export $(cat .env | xargs) # export environment args
echo "********************************"
echo "*******  Running Server  *******"
echo "********************************"
node ./server/index.js &\
node ./client/index.js
