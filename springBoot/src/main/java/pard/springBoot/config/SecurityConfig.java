package pard.springBoot.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class SecurityConfig {

    /**
     * 이 메서드는 정적 자원(HTML, CSS, JavaScript같은 것들)에 대해 보안을 적용하지 않도록 설정.
     * 이들에 대해 보안을 적용하지 않음으로써 성능을 향상ㄱㄱ.
     */
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http,
            CustomAuthenticationFilter customAuthenticationFilter,
            JwtAuthorizationFilter jwtAuthorizationFilter
    ) throws Exception {
        log.debug("[+] WebSecurityConfig Start !!! ");
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/resources/**").permitAll()
                        .requestMatchers("/main/rootPage").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthorizationFilter, BasicAuthenticationFilter.class)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .formLogin(login -> login
                        .loginPage("/login")
                        .successHandler(new SimpleUrlAuthenticationSuccessHandler("/main/rootPage"))
                        .permitAll()
                )
                .addFilterBefore(customAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}
