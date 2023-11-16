package pard.springBoot.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.List;

@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seq;
    private String title;
    private String content;
    private String createdAt;
    private Integer del;
    private Integer readCount;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(mappedBy = "board")
    private List<Comment> comments;

    @Builder
    public Board(String title, String content, String createdAt, Integer del, Integer readCount, User user) {
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.del = del;
        this.readCount = readCount;
        this.user = user;
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }

}
