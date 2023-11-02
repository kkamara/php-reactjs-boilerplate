# Ready for amazon ec2 servers

echo 'setting env vars'
echo 'creating database'
echo 'generating application key'
cp .env.example .env &&
  touch database/database.sqlite && 
  php artisan key:generate

echo 'updating env vars for prod'
sed -i "s/4000/9515/g" .env
sed -i "s/\/wd\/hub//g" .env
sed -i "s/APP_ENV=local/APP_ENV=production/g"

echo 'installing google chrome driver'
mkdir
cd/tmp/
wget https://chromedriver.storage.googleapis.com/2.37/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
sudo mv chromedriver /usr/bin/chromedriver
chromedriver --version

echo 'install google chrome'
curl https://intoli.com/install-google-chrome.sh | bash
sudo mv /usr/bin/google-chrome-stable /usr/bin/google-chrome
google-chrome --version && which google-chrome
