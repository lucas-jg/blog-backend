const mongoose = require("mongoose");

const { Schema } = mongoose;

const Post = new Schema({
  title: String,
  body: String,
  tags: [String], // String array
  publishedDate: {
    type: Date,
    default: new Date() // 현재 날짜를 기본 값으로 지정
  }
});

// mongodb는 스키마 이름을 정해 주면 이 이림의 복수 형태로 데이터베이스의 컬렉션을 만듭니다. Post -> posts
module.exports = mongoose.model("Post", Post);

/**
 * Mongodb Type
 * String : 문자열
 * Number : 숫자
 * Date : 날짜
 * Buffer : 버퍼
 * Boolean : Boolean
 * Mixed(Schema.Type.Mixed) : 어떤 데이터도 넣을 수 있는 형식
 * ObjectId(Schema.Types.ObjectId) : 객체 아이디. 주로 다른 객체를 참조할 때 넣음
 * Array : 배열 []로 감싸서 선언, tgas 처럼
 *
 */
