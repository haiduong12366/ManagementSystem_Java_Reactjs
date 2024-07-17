package HaiDuong.controller;

import HaiDuong.Model.Comment;
import HaiDuong.Model.Issue;
import HaiDuong.Model.User;
import HaiDuong.request.CommentRequest;
import HaiDuong.response.MessageResponse;
import HaiDuong.service.CommentService;
import HaiDuong.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody CommentRequest req,
                                                 @RequestHeader("Authorization") String jwt ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Comment comment = commentService.createComment(req.getIssueId(),user.getId(),req.getContent());
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<MessageResponse> deleteComment(@PathVariable Long commentId,
                                                         @RequestHeader("Authorization") String jwt ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        commentService.deleteComment(commentId,user.getId());
        MessageResponse res =  new MessageResponse();
        res.setMessage("Comment deleted successfully");
        return ResponseEntity.ok(res);

    }

    @GetMapping("/{issueId}")
    public ResponseEntity<List<Comment>> getCommentsByIssueId(@PathVariable Long issueId){
        List<Comment> comments = commentService.findCommentByIssueId(issueId);

        return ResponseEntity.ok(comments);

    }
}
