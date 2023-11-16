package pard.springBoot.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pard.springBoot.dto.response.SignUpResponse;
import pard.springBoot.entity.User;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {
    @PostMapping("/signup")
    public ResponseEntity<SignUpResponse> signUp(@RequestBody JoinRequest joinRequest) {
        User user = userService.signUp(joinRequest);
        // 회원가입 처리 후 적절한 HTTP 응답 반환
    }
}
