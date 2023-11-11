package pard.springBoot.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Board {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Integer seq; // 게시글 고유 번호
    private String id; // 게시글 작성자

    private Integer ref; // 게시글 그룹 번호
    private Integer step; // 게시글 그룹 내 순서
    private Integer depth; // 게시글 그룹 내 계층

    private String title; // 게시글 제목
    private String content; // 게시글 내용
    private String createdAt; // 게시글 생성 일자

    private Integer del; // 삭제 여부
    private Integer readCount; // 조회수
}
