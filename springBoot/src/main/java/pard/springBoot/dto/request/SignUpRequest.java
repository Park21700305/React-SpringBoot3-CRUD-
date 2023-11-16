package pard.springBoot.dto.request;

import lombok.Data;

@Data
public class SignUpRequest {

    private String id;
    private String name;
    private String pwd;
    private String checkPwd;
    private String email;

}
