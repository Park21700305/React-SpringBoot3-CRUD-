/*
URL: /board

Method: POST

Headers:
  Required:
    Content-Type: application/json - 요청 본문이 JSON 형식임을 명시
    Authorization: Bearer [access_token] - 사용자 인증을 위한 JWT 또는 다른 토큰 (해당되는 경우)

Request Body:

id=[string] - 게시글을 작성하는 사용자의 ID
title=[string] - 게시글의 제목
content=[string] - 게시글의 내용
Success Response:

Code: 200 OK
Content:
json
Copy code
{
  "seq": [integer], // 생성된 게시글의 고유 시퀀스 번호
  "message": "새로운 게시글을 성공적으로 등록했습니다"
}
Error Response:

Code: 400 BAD REQUEST
Content:
json
Copy code
{
  "error": "Invalid input data"
}
OR
Code: 401 UNAUTHORIZED
Content:
json
Copy code
{
  "error": "Authentication required"
}
OR
Code: 500 INTERNAL SERVER ERROR
Content:
json
Copy code
{
  "error": "Server error"
}
Sample Call:

javascript
Copy code
axios.post('http://localhost:8080/board', {
  id: 'user123',
  title: 'New Post Title',
  content: 'This is the content of the new post.'
}, {
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer access_token'
  }
});
Notes:

사용자 인증이 필요할 수 있으며, 인증되지 않은 사용자는 게시글 작성이 불가능합니다.
게시글 등록에 성공하면 서버는 생성된 게시글의 고유 번호(seq)를 반환합니다.
클라이언트는 반환된 seq를 사용하여 사용자를 게시글 상세 페이지로 리디렉션할 수 있습니다.

 */

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

function BoardWrite() {
  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeContent = (event) => {
    setContent(event.target.value);
  };

  /* [POST /Board]: 게시글 작성 */
  const createBoard = async () => {
    const request = {
      id: localStorage.getItem("id"),
      title: title,
      content: content,
    };

    await axios
      .post("http://localhost:8080/board", request, { headers: headers })
      .then((response) => {
        console.log("[BoardWrite.js] createBoard() success :D");
        console.log(response.data);

        alert("새로운 게시글을 성공적으로 등록했습니다 :D");
        navigate(`/Boarddetail/${response.data.seq}`); // 새롭게 등록한 글 상세로 이동
      })
      .catch((err) => {
        console.log("[BoardWrite.js] createBoard() error :<");
        console.log(err);
      });
  };

  useEffect(() => {
    if (!auth) {
      alert("로그인 한 사용자만 게시글을 작성할 수 있습니다 !");
      navigate(-1);
    }
  }, []);

  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <th className="table-primary">작성자</th>
            <td>
              <input
                type="text"
                className="form-control"
                value={localStorage.getItem("id")}
                size="50px"
                readOnly
              />
            </td>
          </tr>

          <tr>
            <th className="table-primary">제목</th>
            <td>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={changeTitle}
                size="50px"
              />
            </td>
          </tr>

          <tr>
            <th className="table-primary">내용</th>
            <td>
              <textarea
                className="form-control"
                value={content}
                onChange={changeContent}
                rows="10"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="my-5 d-flex justify-content-center">
        <button className="btn btn-outline-secondary" onClick={createBoard}>
          <i className="fas fa-pen"></i> 등록하기
        </button>
      </div>
    </div>
  );
}

export default BoardWrite;
