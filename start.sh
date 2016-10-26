if [ "$NPM_INSTALL" = "YES" ]
then
  npm install
fi

npm run build
npm run node
