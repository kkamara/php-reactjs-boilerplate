
mysql -h 0.0.0.0 \
  -u root \
  --password=secret \
  boilerplate < backups/mysqldump.sql
