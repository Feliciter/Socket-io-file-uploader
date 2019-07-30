# Socket-io-file-uploader
Загрузщик   файлов на Socket-io с логированием информации из user-agent

###### Установка  
```npm -i```

###### шаблоны файлов для загрузки
    \files\src\test.json
    \files\src\1.txt
   
 

###### логфайл
 logs\log.log

запуск для dev nodemon node app.
для prod   node app- (рекомендуется использовать PM2)


Загрузка шаблонного файла из /files/src осуществляется с помощью экранной формы на стороне клиента


###### Образец лога на стороне сервера logs\log.log

 ```
 [30/Jul/2019:10:50:10 +0200] localhost:3000 Mozilla/5.0 (Windows NT 10.0; Win64; x64)  New “Test here!” 
 [30/Jul/2019:10:50:10 +0200] localhost:3000 Mozilla/5.0 (Windows NT 10.0; Win64; x64)  New connection   
 [30/Jul/2019:10:50:10 +0200] localhost:3000 Mozilla/5.0 (Windows NT 10.0; Win64; x64)  New JSON: {type: test,  query: query }
 ```  
