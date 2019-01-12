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
