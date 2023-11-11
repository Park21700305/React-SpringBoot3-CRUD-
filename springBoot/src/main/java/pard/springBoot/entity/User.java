package pard.springBoot.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class User {
    @Id
    private String id;
    private String pwd;
    private String name;
    private String email;
}
