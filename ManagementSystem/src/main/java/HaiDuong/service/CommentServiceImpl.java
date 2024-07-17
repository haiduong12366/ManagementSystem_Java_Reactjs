package HaiDuong.service;

import HaiDuong.Model.Comment;
import HaiDuong.Model.Issue;
import HaiDuong.Model.User;
import HaiDuong.repository.CommentRepository;
import HaiDuong.repository.IssueRepository;
import HaiDuong.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Comment createComment(Long issueId, Long userId, String content) throws Exception {
        Optional<Issue> issueOptional = issueRepository.findById(issueId);
        if(issueOptional.isEmpty()){
            throw new Exception("issue not found with Id "+issueId);
        }
        Optional<User> userOptional = userRepository.findById(userId);
        if(userOptional.isEmpty()){
            throw new Exception("user not found with Id"+userId);
        }
        User user = userOptional.get();
        Issue issue = issueOptional.get();

        Comment comment = new Comment();
        comment.setContent(content);
        comment.setUser(user);
        comment.setIssue(issue);
        comment.setCreatedDateTime(LocalDateTime.now());

        Comment savedComment = commentRepository.save(comment);

        issue.getComments().add(savedComment);

        issueRepository.save(issue);

        return savedComment;

    }

    @Override
    public void deleteComment(Long commentId, Long userId) throws Exception {
        Optional<Comment> commentOptional = commentRepository.findById(commentId);
        if(commentOptional.isEmpty()){
            throw new Exception("comment not found with Id "+commentId);
        }
        Optional<User> userOptional = userRepository.findById(userId);
        if(userOptional.isEmpty()){
            throw new Exception("user not found with Id"+userId);
        }
        User user = userOptional.get();
        Comment comment = commentOptional.get();

        if(comment.getUser().equals(user))
            commentRepository.delete(comment);
        else
            throw new Exception("User doesn't have permission to delete this comment!");
    }

    @Override
    public List<Comment> findCommentByIssueId(Long issueId) {
        return commentRepository.findCommentByIssueIdOrderByCreatedDateTimeDesc(issueId);
    }
}
