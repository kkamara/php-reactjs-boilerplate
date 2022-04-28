sed -i \
  '1s/^/SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;\nSET FOREIGN_KEY_CHECKS = 0;\n/' \
  backups/mysqldump.sql

docker exec "laravel-react-boilerplate_mysql_1" \
  /usr/bin/mysqldump \
  -u root \
  --password=secret \
  boilerplate > backups/mysqldump.sql

echo 'SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;' >> backups/mysqldump.sql