/*
API 명세서: 댓글 생성

URL: /comment

Method: POST

URL Params:
  Required: BoardSeq=[integer] - 게시글의 시퀀스 번호

Data Params:
  id=[string] - 사용자 ID
  content=[string] - 댓글 내용
  BoardSeq=[integer] - 게시글의 시퀀스 번호 (Body에도 포함될 수 있음)

Headers:
  Authorization=[string] - 인증 토큰 (예: Bearer token)

Success Response:
  Code: 200 OK
  Content:{
    "seq": [integer], // 댓글의 시퀀스 번호
    "message": "댓글을 성공적으로 등록했습니다 :D"
  }
Error Response:
  Code: 400 BAD REQUEST
  Content:{
    "error": "Invalid input"
  }
OR
  Code: 500 INTERNAL SERVER ERROR
  Content:{
    "error": "Server error"
  }
예시 Call:
axios.post('http://localhost:8080/comment', {
  id: 'user123',
  content: '이것은 댓글입니다.',
  BoardSeq: 42
}, {
  params: { BoardSeq: 42 },
  headers: { Authorization: 'Bearer token' }
});
  
Notes:
댓글 생성 시 사용자 인증이 필요할 수 있음.
BoardSeq는 URL 파라미터로도 전송되지만, 요청 본문에도 포함될 수 있음.
서버는 성공적으로 댓글을 생성한 후, 생성된 댓글의 seq를 포함한 객체를 응답으로 반환해야 함.
*/

import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

function CommentWrite(props) {
  const { headers, setHeaders } = useContext(HttpHeadersContext);

  const id = localStorage.getItem("id");
  const seq = props.seq;

  const navigate = useNavigate();

  const [content, setContent] = useState("");

  const chageContent = (event) => {
    setContent(event.target.value);
  };

  const createComment = async () => {
    const request = {
      id: id, // 로그인한 사용자의 아이디
      content: content, // 댓글 내용
      BoardSeq: seq, // 게시글 번호
    };

    await axios
      .post(`http://localhost:8080/comment`, request, {
        params: { BoardSeq: seq },
        headers: headers,
      })
      .then((response) => {
        console.log("[CommentWrite.js] createComment() success :D");
        console.log(response.data);

        if (response.data.seq != null) {
          alert("댓글을 성공적으로 등록했습니다 :D");
          navigate(0);
        }
      })
      .catch((err) => {
        console.log("[CommentWrite.js] createComment() error :<");
        console.log(err);
      });
  };

  return (
    <>
      {/* 상단 영역 (프로필 이미지, 댓글 작성자) */}
      <div className="my-1 d-flex justify-content-center">
        <div className="col-1">
          <img
            src="/images/profile-placeholder.png"
            alt="프로필 이미지"
            className="profile-img"
          />
        </div>

        <div className="col-7">
          <span className="comment-id">{id}</span>
        </div>
        <div className="col-2 my-1 d-flex justify-content-end">
          <button className="btn btn-outline-secondary" onClick={createComment}>
            <i className="fas fa-comment-dots"></i> 댓글 추가
          </button>
        </div>
      </div>
      {/* 하단 영역 (댓글 내용) */}
      <div className="my-3 d-flex justify-content-center">
        <textarea
          className="col-10"
          rows="5"
          value={content}
          onChange={chageContent}
        ></textarea>
      </div>
      <br />
      <br />
    </>
  );
}

export default CommentWrite;
