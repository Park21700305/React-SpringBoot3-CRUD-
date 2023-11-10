import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import Comment from "./Comment.js";

function CommentList(props) {
  const seq = props.seq;

  // Paging
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  const [commentList, setCommentList] = useState([]);

  const changePage = (page) => {
    setPage(page);
    getCommentList(page);
  };

  const getCommentList = async (page) => {
    await axios
      .get(`http://localhost:8080/comment`, {
        params: { boardSeq: seq, page: page },
      })
      .then((response) => {
        console.log("[BoardComment.js] getCommentList() success :D");
        console.log(response.data);

        setCommentList(response.data.commentList);
        setTotalCnt(response.data.pageCnt);
      })
      .catch((err) => {
        console.log("[BoardComment.js] getCommentList() error :<");
        console.log(err);
      });
  };

  useEffect(() => {
    getCommentList(1);
  }, []);

  return (
    <>
      <div className="my-1 d-flex justify-content-center">
        <h5>
          <i className="fas fa-paperclip"></i> 댓글 목록{" "}
        </h5>
      </div>

      <Pagination
        activePage={page}
        itemsCountPerPage={5}
        totalItemsCount={totalCnt}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={changePage}
      />
      {commentList.map(function (comment, idx) {
        return (
          <div className="my-5" key={idx}>
            <Comment obj={comment} key={idx} />
          </div>
        );
      })}
    </>
  );
}

export default CommentList;
