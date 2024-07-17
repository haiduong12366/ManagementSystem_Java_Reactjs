package HaiDuong.controller;

import HaiDuong.Model.Message;
import HaiDuong.request.MessageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat/{productId}")
    public void processMessage(@Payload Message req,
                               @DestinationVariable String productId
    ) throws Exception {
        System.out.println(req);
        messagingTemplate.convertAndSendToUser(productId,"/private" , req);
    }
}
