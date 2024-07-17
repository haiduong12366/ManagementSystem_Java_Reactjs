package HaiDuong.service;


import jakarta.mail.MessagingException;

public interface EmailService {
    void sendEmailWithToken(String userEmail,String Link) throws MessagingException;
}
