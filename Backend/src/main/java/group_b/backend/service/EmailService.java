package group_b.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @org.springframework.beans.factory.annotation.Value("${spring.mail.username}")
    private String fromEmail;

    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        // Log the email content (Link) BEFORE sending, so it's visible even if sending
        // fails
        System.out.println("------------------------------------------------");
        System.out.println("PREPARING TO SEND EMAIL");
        System.out.println("To: " + to);
        System.out.println("Subject: " + subject);
        System.out.println("Body:\n" + text);
        System.out.println("------------------------------------------------");

        try {
            mailSender.send(message);
            System.out.println("Email sent successfully.");
        } catch (Exception e) {
            System.err.println("FAILED TO SEND EMAIL via SMTP: " + e.getMessage());
            System.err.println("Continuing flow since the link is available in the logs above.");
            // We catch the exception so the frontend still gets a success response
            // This allows testing the flow even without valid email credentials
        }
    }
}
