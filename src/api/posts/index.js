const Router = require("koa-router");
const postsCtrl = require("./posts.ctrl");
const posts = new Router();

const Info = ctx => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params
  };
};

posts.get("/", postsCtrl.list);
posts.post("/", postsCtrl.write);
posts.get("/:id", postsCtrl.checkObjectId, postsCtrl.read);
posts.delete("/:id", postsCtrl.checkObjectId, postsCtrl.remove);
posts.patch("/:id", postsCtrl.checkObjectId, postsCtrl.update);

module.exports = posts;
