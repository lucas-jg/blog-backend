const Post = require("models/post");
/**
 * 포스트 작성
 */
exports.write = ctx => {};

/**
 * 포스트 목록 조회
 * GET /api/posts
 */
exports.list = ctx => {};

/**
 * 특정 포스트 조회
 * GET /api/posts/:id
 */
exports.read = ctx => {};

/**
 * DELETE /api/posts/:id
 */
exports.remove = ctx => {};

/**
 * 포스트 수정 (특정 필드 변경)
 * PATCH /api/posts/:id
 * {title, body}
 */
exports.update = ctx => {};
