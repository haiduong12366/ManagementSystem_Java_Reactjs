package HaiDuong.request;

import HaiDuong.Model.Project;
import HaiDuong.Model.User;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IssueDTO {
    private Long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String title;
    @Column(columnDefinition = "nvarchar(255)")
    private String description;
    private String status;
    private Long projectId;
    private String priority;
    private LocalDate dueDate;
    private List<String> tags = new ArrayList<>();
    private Project project;

    private User assignee;
}
