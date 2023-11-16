package pard.springBoot.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.sql.Update;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seq;
    private String content;
    @CreatedDate
    private String createdAt;
    private Integer del;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "boardSeq")
    private Board board;

    @Builder
    public Comment(String content, Integer del, User user, Board board) {
        this.content = content;
        this.del = del;
        this.user = user;
        this.board = board;
    }

    public void update(String content) {
        this.content = content;
    }

}
