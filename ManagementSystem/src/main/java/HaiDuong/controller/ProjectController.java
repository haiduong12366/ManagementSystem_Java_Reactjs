package HaiDuong.controller;

import HaiDuong.Model.Chat;
import HaiDuong.Model.Invitation;
import HaiDuong.Model.Project;
import HaiDuong.Model.User;
import HaiDuong.request.InviteRequest;
import HaiDuong.response.InvitationRes;
import HaiDuong.response.MessageResponse;
import HaiDuong.service.InvitationService;
import HaiDuong.service.ProjectService;
import HaiDuong.service.UserService;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @Autowired
    private InvitationService invitationService;

    @GetMapping
    public ResponseEntity<List<Project>> getProjects(@RequestParam(required = false)String category,
                                                     @RequestParam(required = false)String tags,
                                                     @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        List<Project> projects = projectService.getProjectByTeam(user,category,tags);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long projectId,
                                                  @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Project project = projectService.getProjectById(projectId);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project,
                                                  @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Project createdProject = projectService.createProject(project,user);
        return new ResponseEntity<>(createdProject, HttpStatus.OK);
    }
    @PutMapping("/{projectId}")
    public ResponseEntity<Project> updateProject(@PathVariable Long projectId,
                                                 @RequestBody Project project,
                                                 @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Project updatedProject = projectService.updateProject(project,projectId);
        return new ResponseEntity<>(updatedProject, HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<MessageResponse> deleteProject(@PathVariable Long projectId,
                                                         @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        projectService.deleteProject(projectId,user.getId());
        MessageResponse messageResponse = new MessageResponse("project delete successfully");
        return new ResponseEntity<>(messageResponse, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Project>> searchProjects(@RequestParam(required = false) String keyword,
                                                        @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        List<Project> projects = projectService.searchProjects(keyword,user);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/{projectId}/chat")
    public ResponseEntity<Chat> getChatByProductId(@PathVariable Long projectId,
                                                   @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Chat chat = projectService.getChatByProjectId(projectId);
        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @PostMapping("/invite")
    public ResponseEntity<MessageResponse> inviteProject(@RequestBody InviteRequest req,
                                                         @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        invitationService.sendInvitation(req.getEmail(), req.getProjectId());
        MessageResponse res = new MessageResponse("User invitation send");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping("/accept_invitation")
    public ResponseEntity<?> acceptInviteProject(@RequestBody String token,
                                                 @RequestHeader("Authorization") String jwt
    ) throws Exception {
        token = token.substring(1,token.length()-1);
        System.out.println(token);

        User user = userService.findUserProfileByJwt(jwt);
        Invitation invite = invitationService.findByToken(token);
        if(!invite.getEmail().equals(user.getEmail())){
            return new ResponseEntity<>(new MessageResponse("Email doesn't match"), HttpStatus.BAD_REQUEST);
        }

        Invitation invitation = invitationService.acceptInvitation(token, user.getId());
        projectService.addUserToProject(invitation.getProjectId(),user.getId());
        Project  p = projectService.getProjectById(invitation.getProjectId());

        InvitationRes i = new InvitationRes();
        BeanUtils.copyProperties(i,invitation);
        i.setOwner(p.getOwner().getFullName());
        i.setProjectName(p.getName());

        return new ResponseEntity<>(i, HttpStatus.ACCEPTED);
    }
}
