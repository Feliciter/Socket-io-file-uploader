# Socket-io-file-uploader
Загрузщик   файлов на Socket-io с логированием

Установка npm -i

шаблоны файлов
/files/src

логи 
/logs

запуск для dev nodemon node app.
запуск для prod   node app- (реокмендуется использовать PM2)


Загрузка шаблонного файла из /files/src осуществляется с помощью экранной формы на стороне клиента


Образец лога
 < [30/Jul/2019:10:50:10 +0200] localhost:3000 Mozilla/5.0 (Windows NT 10.0; Win64; x64)  New “Test here!” >  
 < [30/Jul/2019:10:50:10 +0200] localhost:3000 Mozilla/5.0 (Windows NT 10.0; Win64; x64)  New connection >  
< [30/Jul/2019:10:50:10 +0200] localhost:3000 Mozilla/5.0 (Windows NT 10.0; Win64; x64)  New JSON: {type: test,  query: query } >  
