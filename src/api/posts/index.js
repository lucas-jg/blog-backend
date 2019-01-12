const Router = require("koa-router");

const posts = new Router();

const Info = ctx => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params
  };
};

posts.get("/", Info);
posts.post("/", Info);
posts.get("/:id", Info);
posts.delete("/:id", Info);
posts.put("/:id", Info);
posts.patch("/:id", Info);

module.exports = posts;
