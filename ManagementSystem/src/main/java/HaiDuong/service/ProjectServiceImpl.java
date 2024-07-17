package HaiDuong.service;

import HaiDuong.Model.Chat;
import HaiDuong.Model.Project;
import HaiDuong.Model.User;
import HaiDuong.repository.ProjectRepository;
import HaiDuong.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService{

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private  ChatService chatService;
    @Override
    public Project createProject(Project project, User user) throws Exception {
        Project createProject =  new Project();
        createProject.setOwner(user);
        createProject.setTags(project.getTags());
        createProject.setName(project.getName());
        createProject.setCategory(project.getCategory());
        createProject.setDescription(project.getDescription());
        createProject.getTeam().add(user);

        Project saveProject = projectRepository.save(createProject);

        Chat chat = new Chat();
        chat.setProject(saveProject);

        Chat projectChat = chatService.createChat(chat);

        saveProject.setChat(projectChat);
        projectRepository.save(saveProject);

        return saveProject;
    }

    @Override
    public List<Project> getProjectByTeam(User user, String category, String tag) throws Exception {
        List<Project> projects = projectRepository.findByTeamContainingOrOwner(user,user);
        if(category!=null){
            projects = projects.stream().filter(project -> project.getCategory().equals(category)).collect(Collectors.toList());
        }
        if(tag!=null){
            projects = projects.stream().filter(project -> project.getTags().contains(tag)).collect(Collectors.toList());
        }
        return projects;
    }

    @Override
    public Project getProjectById(Long projectId) throws Exception {
        Optional<Project> optionalProject = projectRepository.findById(projectId);
        if(optionalProject.isEmpty()){
            throw new Exception("Project not found");
        }
        return optionalProject.get();
    }

    @Override
    public void deleteProject(Long projectId, Long userId) throws Exception {
        getProjectById(projectId);
        //userService.findUserById(userId);
        projectRepository.deleteById(projectId);
    }

    @Override
    public Project updateProject(Project updateProject, Long id) throws Exception {
        Project project = getProjectById(id);

        project.setName(updateProject.getName());
        project.setDescription(updateProject.getDescription());
        project.setTags(updateProject.getTags());

        return projectRepository.save(project);
    }

    @Override
    public void addUserToProject(Long projectId, Long userId) throws Exception {
        Project project = getProjectById(projectId);
        User user = userService.findUserById(userId);
        if(!project.getTeam().contains(user)){
            project.getTeam().add(user);
            project.getChat().getUsers().add(user);

        }
        projectRepository.save(project);
    }

    @Override
    public void removeUserToProject(Long projectId, Long userId) throws Exception {
        Project project = getProjectById(projectId);
        User user = userService.findUserById(userId);
        if(!project.getTeam().contains(user)){
            project.getTeam().remove(user);
            project.getChat().getUsers().remove(user);

        }
        projectRepository.save(project);
    }

    @Override
    public Chat getChatByProjectId(Long projectId) throws Exception {
        Project project = getProjectById(projectId);

        return project.getChat();
    }

    @Override
    public List<Project> searchProjects(String keyWord, User user) throws Exception {
        return  projectRepository.findByNameContainingAndTeamContains(keyWord,user);
    }
}
