var axios = require('axios');
const cheerio = require('cheerio');
var config = {
  method: 'get',
  url: 'https://tuoitre.vn/dich-covid-19-e576.htm',
  headers: { 
    'Cookie': 'ApplicationGatewayAffinityCORS=3a55f62016c087a0369c9fe1ee614d4d; ApplicationGatewayAffinity=3a55f62016c087a0369c9fe1ee614d4d'
  }
};

axios(config)
.then(function (response) {
  const $ = cheerio.load(response.data)
  const title = $('#content > div > div.list-middle > div > div.w664.fl.stream-home.list-middle-content > div > ul > li:nth-child(1) > div.name-news > h3 > a').text().trim()
  const desc = $('#content > div > div.list-middle > div > div.w664.fl.stream-home.list-middle-content > div > ul > li:nth-child(1) > div.name-news > p').text().trim()
  const date = $('#content > div > div.list-middle > div > div.w664.fl.stream-home.list-middle-content > div > ul > li:nth-child(1) > div.published-date.fl > span.second-label').text().trim()
  const img = $('#content > div > div.list-middle > div > div.w664.fl.stream-home.list-middle-content > div > ul > li:nth-child(1) > a.img212x132.pos-rlt > img').attr('src')
  const a = {
      title,
      desc,
      date,
      img,
  }
  console.log(a)
})
.catch(function (error) {
  console.log(error);
});
