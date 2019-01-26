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
posts.get("/:id", postsCtrl.checkObjectId, postsCtrl.read);

posts.post("/", postsCtrl.checkLogin, postsCtrl.write);
posts.delete("/:id", postsCtrl.checkLogin, postsCtrl.checkObjectId, postsCtrl.remove);
posts.patch("/:id", postsCtrl.checkLogin, postsCtrl.checkObjectId, postsCtrl.update);

module.exports = posts;
