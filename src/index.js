const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

// Setting route
router.get("/", ctx => {
  ctx.body = "home";
});

router.get("/about", ctx => {
  ctx.body = "about";
});

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log("listening to port 4000");
});
