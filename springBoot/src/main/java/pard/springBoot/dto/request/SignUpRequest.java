package pard.springBoot.dto.request;

public record SignUpRequest(
        String id,
        String name,
        String pwd,
        String checkPwd,
        String email) {
}

