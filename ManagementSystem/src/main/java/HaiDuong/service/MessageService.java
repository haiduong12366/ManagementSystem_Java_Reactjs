package HaiDuong.service;

import HaiDuong.Model.Message;
import HaiDuong.request.MessageRequest;

import java.util.List;

public interface MessageService {
    Message sendMessage(MessageRequest req) throws Exception;
    List<Message> getMessagesByProjectId(Long projectId) throws Exception;
}
