package HaiDuong.service;

import HaiDuong.Model.Chat;
import HaiDuong.Model.Message;
import HaiDuong.Model.User;
import HaiDuong.repository.MessageRepository;
import HaiDuong.repository.UserRepository;
import HaiDuong.request.MessageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private MessageRepository messageRepository;
    @Override
    public Message sendMessage(MessageRequest req) throws Exception {
        Long senderId = req.getSenderId();
        Long projectId = req.getProjectId();
        String content = req.getContent();
        String img = req.getImg();
        User user = userRepository.findById(senderId)
                .orElseThrow(()-> new Exception("User not found with id: "+senderId));

        Chat chat = projectService.getChatByProjectId(projectId);

        Message message = new Message();
        message.setChat(chat);
        message.setContent(content);
        message.setCreatedAt(LocalDateTime.now());
        message.setSender(user);
        message.setImg(img);
        Message savedMessage = messageRepository.save(message);
        chat.getMessages().add(savedMessage);

        return savedMessage;
    }

    @Override
    public List<Message> getMessagesByProjectId(Long projectId) throws Exception {
        Chat chat = projectService.getChatByProjectId(projectId);
        return messageRepository.findByChatIdOrderByCreatedAtAsc(chat.getId());
    }
}
