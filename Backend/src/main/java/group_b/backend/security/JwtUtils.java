package group_b.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseCookie;
import org.springframework.lang.NonNull;
import org.springframework.web.util.WebUtils;

import java.security.Key;
import java.util.Date;
import java.util.Objects;

@Component
public class JwtUtils {

    @Value("${quickserve.app.jwtSecret:SecretKeyToGenJWTsSecretKeyToGenJWTsSecretKeyToGenJWTs}")
    private String jwtSecret;

    @Value("${quickserve.app.jwtExpirationMs:86400000}")
    private int jwtExpirationMs;

    @Value("${quickserve.app.jwtCookieName:quickserve-jwt}")
    private String jwtCookie = "";

    public ResponseCookie generateJwtCookie(UserDetails userPrincipal) {
        String jwt = generateTokenFromUsername(userPrincipal.getUsername());
        return ResponseCookie.from(getCookieName(), jwt).path("/api")
                .maxAge(24 * 60 * 60)
                .httpOnly(true).build();
    }

    public ResponseCookie getCleanJwtCookie() {
        return ResponseCookie.from(getCookieName(), "").path("/api").build();
    }

    public String getJwtFromCookies(HttpServletRequest request) {
        if (request == null) {
            return null;
        }
        Cookie cookie = WebUtils.getCookie(request, Objects.requireNonNull(getCookieName()));
        if (cookie != null && cookie.getValue() != null && !cookie.getValue().isEmpty()) {
            return cookie.getValue();
        } else {
            return null;
        }
    }

    @NonNull
    private String getCookieName() {
        return jwtCookie != null ? jwtCookie : "quickserve-jwt";
    }

    @NonNull
    public String generateTokenFromUsername(String username) {
        return Objects.requireNonNull(Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact());
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        if (authToken == null || authToken.trim().isEmpty()) {
            return false;
        }

        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException e) {
            System.err.println("Invalid JWT token: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            System.err.println("JWT token is expired: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.err.println("JWT token is unsupported: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.err.println("JWT claims string is empty: " + e.getMessage());
        }

        return false;
    }
}
