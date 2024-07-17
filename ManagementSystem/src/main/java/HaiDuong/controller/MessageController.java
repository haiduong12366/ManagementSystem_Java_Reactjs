package HaiDuong.controller;

import HaiDuong.Model.Chat;
import HaiDuong.Model.Message;
import HaiDuong.Model.User;
import HaiDuong.request.MessageRequest;
import HaiDuong.service.MessageService;
import HaiDuong.service.ProjectService;
import HaiDuong.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;



    @PostMapping("/send")
    public ResponseEntity<Message> getProjects(@RequestBody MessageRequest req
    ) throws Exception {
        User user = userService.findUserById(req.getSenderId());
        if(user==null)
            throw new Exception("User not found with id: "+req.getSenderId());
        Chat chat = projectService.getChatByProjectId(req.getProjectId());
        if(chat==null)
            throw new Exception("Chat not found");

        Message sentMessage = messageService.sendMessage(req);
        return new ResponseEntity<>(sentMessage, HttpStatus.OK);
    }



    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>> getMessagesByChatId(@PathVariable Long projectId
    ) throws Exception {
       List<Message> messages = messageService.getMessagesByProjectId(projectId);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }
}
