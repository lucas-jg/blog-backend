const Post = require("models/post");
const { ObjectId } = require("mongoose").Types; // ID 검증
const Joi = require("joi"); // body 검증
const HttpStatus = require("http-status-codes");

/**
 * MongoDB에서 생성되는 고유 ID를 검증
 */
exports.checkObjectId = (ctx, next) => {
	const { id } = ctx.params;

	// 검증 실패
	if (!ObjectId.isValid(id)) {
		ctx.status = HttpStatus.BAD_REQUEST;
		return null;
	}

	return next();
};
/**
 * 포스트 작성
 * POST /api/posts
 * Joi를 사용한 body 검증
 */
exports.write = async ctx => {
	// 검증
	const schema = Joi.object().keys({
		title: Joi.string().required(),
		body: Joi.string().required(),
		tags: Joi.array()
			.items(Joi.string())
			.required()
	});

	const result = Joi.validate(ctx.request.body, schema);

	if (result.error) {
		ctx.status = HttpStatus.BAD_REQUEST;
		ctx.body = result.error;
		return;
	}

	// 검증 이후 정상 루틴
	const { title, body, tags } = ctx.request.body;

	// 새 POST 인스턴스를 만듭니다.
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
		ctx.throw(e, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	console.log(post);
};

/**
 * 포스트 목록 조회
 * GET /api/posts
 */
exports.list = async ctx => {
	console.log("GET /api/posts");
	// page가 주어지지 않았다면 1로 간주, query는 문자열 형태로 받아 오므로 숫자로 변환
	const page = parseInt(ctx.query.page || 1, 10);
	const range = 10;
	const limitBodyLength = 200;
	const { tag } = ctx.query;

	const query = tag
		? {
				tags: tag
		  }
		: {};

	if (page < 1) {
		ctx.status = HttpStatus.NOT_FOUND;
		return;
	}

	try {
		/**
		 * find(query)에서 query의 값이 {tag:undefinde}인 경우 아무것도 조회가 안됨.
		 * 그래서 {} 빈 객체를 넣어줌.
		 */
		const posts = await Post.find(query)
			.sort({ _id: -1 })
			.limit(range)
			.skip((page - 1) * range)
			.lean()
			.exec();

		const postCount = await Post.count(query).exec();

		const limitBody = post => ({
			...post,
			body:
				post.body.length < limitBodyLength
					? post.body
					: `${post.body.slice(0, limitBodyLength)}...`
		});
		ctx.body = posts.map(limitBody);
		ctx.set("Last-Page", Math.ceil(postCount / range));
	} catch (e) {
		ctx.throw(e, HttpStatus.INTERNAL_SERVER_ERROR);
	}
};

/**
 * 특정 포스트 조회
 * GET /api/posts/:id
 */
exports.read = async ctx => {
	const { id } = ctx.params;
	console.log(" GET /api/posts/:id");
	try {
		const post = await Post.findById(id).exec();
		if (!post) {
			ctx.status = HttpStatus.NOT_FOUND;
			return;
		}
		ctx.body = post;
	} catch (e) {
		ctx.throw(e, HttpStatus.INTERNAL_SERVER_ERROR);
	}
};

/**
 * DELETE /api/posts/:id
 */
exports.remove = async ctx => {
	const { id } = ctx.params;
	console.log("DELETE /api/posts/:id");
	try {
		await Post.findByIdAndRemove(id).exec();
		ctx.status = HttpStatus.NO_CONTENT;
	} catch (e) {
		ctx.throw(e, HttpStatus.INTERNAL_SERVER_ERROR);
	}
};

/**
 * 포스트 수정 (특정 필드 변경)
 * PATCH /api/posts/:id
 * {title, body}
 */
exports.update = async ctx => {
	const { id } = ctx.params;
	console.log("PATCH /api/posts/:id");
	try {
		const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
			new: true
			// 이 값을 설정해야 업데이트된 객체를 반환합니다.
		}).exec();

		if (!post) {
			ctx.status = HttpStatus.NOT_FOUND;
			return;
		}
	} catch (e) {
		ctx.throw(e, HttpStatus.INTERNAL_SERVER_ERROR);
	}
};

/**
 * API 인증 기능
 */
exports.checkLogin = (ctx, next) => {
	if (!ctx.session.logged) {
		ctx.status = 401; // Unauthorized
		return null;
	}
	return next();
};
