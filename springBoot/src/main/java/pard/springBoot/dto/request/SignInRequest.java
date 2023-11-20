package pard.springBoot.dto.request;

public record SignInRequest(
        String id,
        String pwd) {
}