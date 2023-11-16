package pard.springBoot.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.List;

//@ToString(callSuper = true)

@Table(name = "USERS")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;            // 유저pk

    @Column(name = "login_id", nullable = false)
    private String loginId;     // 로그인 ID

    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "email", nullable = false)
    private String email;

    @OneToMany(mappedBy = "user")
    private List<Board> boards;

    @OneToMany(mappedBy = "user")
    private List<Comment> comments;

    @Builder
    public User(Long id, String loginId, String password, String name, String email) {
        this.id = id;
        this.loginId = loginId;
        this.password = password;
        this.name = name;
        this.email = email;
    }
}
