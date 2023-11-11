import { Routes, Route } from "react-router-dom";
import Home from "../app/Home";
import BoardList from "../board/BoardList";
import BoardWrite from "../board/BoardWrite";
import BoardDetail from "../board/BoardDetail";
import BoardUpdate from "../board/BoardUpdate";
import BoardAnswer from "../board/BoardAnswer";
import Join from "../member/Join";
import Login from "../member/Login";
import Logout from "../member/Logout";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/boardList" element={<BoardList />}></Route>
      <Route path="/boardWrite" element={<BoardWrite />}></Route>
      <Route path="/boardDetail/:seq" element={<BoardDetail />}></Route>
      <Route path="/boardUpdate" element={<BoardUpdate />}></Route>
      <Route path="/boardAnswer/:parentSeq" element={<BoardAnswer />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/join" element={<Join />}></Route>
      <Route path="/logout" element={<Logout />}></Route>
    </Routes>
  );
}

export default Router;
