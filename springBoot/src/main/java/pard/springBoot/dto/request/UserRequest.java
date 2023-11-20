package pard.springBoot.dto.request;

public record UserRequest(
        Long id,
        String loginId,
        String name,
        String password,
        String email) {
    // factory method of 선언
    public static UserRequest of(
            Long id,
            String loginId,
            String name,
            String password,
            String email) {
        return new UserRequest(id, loginId, name, password, email);
    }

    // security에서 사용할 팩토리 메서드
    public static UserRequest of(String loginId) {
        return new UserRequest(null, loginId, null, null, null);
    }
}
