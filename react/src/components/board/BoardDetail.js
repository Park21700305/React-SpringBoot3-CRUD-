import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CommentWrite from "../comment/CommentWrite";
import CommentList from "../comment/CommentList";
import { AuthContext } from "../context/AuthProvider";

function BoardDetail() {
  const { auth, setAuth } = useContext(AuthContext);

  const [board, setBoard] = useState({});
  const { seq } = useParams(); // 파라미터 가져오기

  const navigate = useNavigate();

  const getBoardDetail = async () => {
    await axios
      .get(`http://localhost:8080/board/${seq}`, {
        params: { readerId: auth ? auth : "" },
      })
      .then((response) => {
        console.log("");
        console.log(response.data);

        setBoard(response.data.board);
      })
      .catch((error) => {
        console.log("[boardDetail.js] getboardDetail() error :<");
        console.log(error);
      });
  };

  const deleteboard = async () => {
    await axios
      .delete(`http://localhost:3000/board/${seq}`)
      .then((response) => {
        console.log("[boardDetail.js] deleteboard() success :D");
        console.log(response.data);

        if (response.data.deletedRecordCount === 1) {
          alert("게시글을 성공적으로 삭제했습니다 :D");
          navigate("/boardlist");
        }
      })
      .catch((err) => {
        console.log("[boardDetail.js] deleteboard() error :<");
        console.log(err);
      });
  };

  useEffect(() => {
    getBoardDetail();
  }, []);

  const updateBoard = {
    seq: board.seq,
    id: board.id,
    title: board.title,
    content: board.content,
  };

  const parentBoard = {
    id: board.id,
    title: board.title,
  };

  return (
    <div>
      <div className="my-3 d-flex justify-content-end">
        <Link
          className="btn btn-outline-secondary"
          to={{ pathname: `/boardanswer/${board.seq}` }}
          state={{ parentBoard: parentBoard }}
        >
          <i className="fas fa-pen"></i> 답글쓰기
        </Link>{" "}
        &nbsp;
        {
          /* 자신이 작성한 게시글인 경우에만 수정 삭제 가능 */
          localStorage.getItem("id") == board.id ? (
            <>
              <Link
                className="btn btn-outline-secondary"
                to="/boardUpdate"
                state={{ board: updateBoard }}
              >
                <i className="fas fa-edit"></i> 수정
              </Link>{" "}
              &nbsp;
              <button className="btn btn-outline-danger" onClick={deleteboard}>
                <i className="fas fa-trash-alt"></i> 삭제
              </button>
            </>
          ) : null
        }
      </div>

      <table className="table table-striped">
        <tbody>
          <tr>
            <th className="col-3">작성자</th>
            <td>
              <span>{board.id}</span>
            </td>
          </tr>

          <tr>
            <th>제목</th>
            <td>
              <span>{board.title}</span>
            </td>
          </tr>

          <tr>
            <th>작성일</th>
            <td>
              <span>{board.createdAt}</span>
            </td>
          </tr>

          <tr>
            <th>조회수</th>
            <td>
              <span>{board.readCount}</span>
            </td>
          </tr>

          <tr>
            <th>내용</th>
            <td>
              <div>{board.content}</div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="my-3 d-flex justify-content-center">
        <Link className="btn btn-outline-secondary" to="/boardList">
          <i className="fas fa-list"></i> 글목록
        </Link>
      </div>
      <br />
      <br />

      {/* 댓글 작성 컴포넌트 */}
      {auth ? ( // 로그인한 사용자만 댓글 작성 가능
        <CommentWrite seq={seq} />
      ) : null}

      {/* 댓글 리스트 컴포넌트 */}
      <CommentList seq={seq} />
    </div>
  );
}

export default BoardDetail;
