require("dotenv").config();

const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const api = require("./api");

const { PORT: port = 4000, MONGO_URI: mongoURI } = process.env;

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use("/api", api.routes());

// 라우터 적용 전 bodyParser 적용
// 미들웨어의 경우 라우터 적용전에 설정해야함
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log("listening to port ", port);
});
