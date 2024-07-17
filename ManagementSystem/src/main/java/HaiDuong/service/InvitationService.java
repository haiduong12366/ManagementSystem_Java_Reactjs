package HaiDuong.service;

import HaiDuong.Model.Invitation;
import jakarta.mail.MessagingException;

public interface InvitationService {
    public void sendInvitation (String email,Long projectId) throws MessagingException;

    public Invitation acceptInvitation(String token, Long userId) throws Exception;

    public String getTokenByUserMail(String userEmail);

    void deleteToken(String token);

    Invitation findByToken(String token);
}
