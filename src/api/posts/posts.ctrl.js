let postId = 1; // id 초기값

const posts = [
  {
    id: 1,
    title: "제목",
    body: "내용"
  }
];

/**
 * 포스트 작성
 * POST /api/posts
 */

exports.write = ctx => {
  // REST API의 requst body는 ctx.request.body에서 조회가능
  const { title, body } = ctx.request.body;

  postId += 1;

  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
};

/**
 * 포스트 목록 조회
 * GET /api/posts
 */
exports.list = cxt => {
  const { id } = ctx.params;

  // 주어진 id 값으로 포스트를 찾습니다.
  // 파라미터로 받아 온 값은 문자열 형식이니 파라미터를 숫자로 변환하거나,
  // 비교할 p.id 값을 문자열로 변경해야 합니다.

  // 포스트가 없으면 오류를 반환합니다.
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: "포스트가 존재하지 않습니다."
    };
    return;
  }
  ctx.body = post;
};

/**
 * DELETE /api/posts/:id
 */
exports.remove = ctx => {
  const { id } = ctx.params;

  // 해당 id를 가진 post가 몇 번째인지 확인합니다.
  const index = posts.findIndex(p => p.id.toString() === id);

  // 포스트가 없으면 오류를 반환합니다.
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "포스트가 존재하지 않습니다."
    };
    return;
  }

  // index번째 아이템을 제거합니다.
  posts.splice(index, 1);
  ctx.status = 204;
};

/**
 * 포스트 수정 (교체)
 * PUT /api/posts/:id
 * {title, body}
 */

exports.replace = ctx => {
  const { id } = ctx.params;

  // 해당 id를 가진 post가 몇 번째인지 확인합니다.
  const index = posts.findIndex(p => p.id.toString() === id);

  // 포스트가 없으면 오류를 반환합니다.
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "포스트가 존재하지 않습니다."
    };
    return;
  }

  // 전체 객체를 덮어씌웁니다.
  posts[index] = {
    id,
    ...ctx.request.body
  };
  ctx.body = posts[index];
};
