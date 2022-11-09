# fcc-url-shorten
## Free code camp
### Course: Backend development and API
- Project: Url Shorten
- Tech: nodejs, express, nanoid, dotenv, sqlite3, validator
1. create new shorturl 
- [POST] "/api/" 
- body:{
    "url":"https://www.google.com/"
}
- return: {
  "ID": "IKuC247AlD",
  "ORIGINAL_URL": "https://www.google.com/",
  "SHORTEN_URL": "http://localhost:3500/api/IKuC247AlD",
  "CLICK": 0,
  "DATE_CREATED": "2022-11-09"
}
2. open link with shorturl
- [GET] "/api/id"
- success: redirect to original url
- fail => return {"msg":"Not found!!!"}
