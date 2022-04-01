rm -rf .next
rm -rf out
yarn build
yarn export
rm -rf ../Export/out
cp -r out ../Export/
cd ../Export
firebase deploy
tar -czvf out.tar.gz out