const Post = require("models/post");
/**
 * 포스트 작성
 */
exports.write = async ctx => {
  const { title, body, tags } = ctx.request.body;

  // 새 POST 인스턴스를 만듭니다,.
  const post = new Post({
    title,
    body,
    tags
  });

  try {
    await post.save(); // DB 등록
    ctx.body = post; // 저장된 결과를 반환
  } catch (e) {
    // DB 오류
    ctx.throw(e, 500);
  }
};

/**
 * 포스트 목록 조회
 * GET /api/posts
 */
exports.list = async ctx => {
  try {
    const posts = await Post.find().exec();
    ctx.body = posts;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

/**
 * 특정 포스트 조회
 * GET /api/posts/:id
 */
exports.read = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

/**
 * DELETE /api/posts/:id
 */
exports.remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

/**
 * 포스트 수정 (특정 필드 변경)
 * PATCH /api/posts/:id
 * {title, body}
 */
exports.update = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true
      // 이 값을 설정해야 업데이트된 객체를 반환합니다.
    }).exec();

    if (!post) {
      ctx.status = 404;
      return;
    }
  } catch (e) {
    ctx.throw(e, 500);
  }
};
