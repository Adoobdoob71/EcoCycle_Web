const NewsAPI = require("newsapi")

const newsAPI = new NewsAPI("7feac3f5002042fda0626f4ec2c44952", { mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } })

export { newsAPI }
