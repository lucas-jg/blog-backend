require("dotenv").config();

const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const api = require("./api");
const session = require("koa-session");

const { PORT: port = 4000, MONGO_URI: mongoURI, COOKIE_SIGN_KEY: signKey } = process.env;

const mongoose = require("mongoose");

// Node의 Promise를 사용하도록 설정
mongoose.Promise = global.Promise;
mongoose
	.connect(mongoURI)
	.then(() => {
		console.log("connected to mongodb");
	})
	.catch(e => {
		console.log("mongoose ERROR : ", e);
	});

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use("/api", api.routes());

// 라우터 적용 전 bodyParser 적용
// 미들웨어의 경우 라우터 적용전에 설정해야함
app.use(bodyParser());

// 세션/키 적용
const sessionConfig = {
	maxAge: 86400000 // 하루
	// signed: true  // default
};

app.use(session(sessionConfig, app));
app.keys = [signKey];

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
	console.log("listening to port ", port);
});
