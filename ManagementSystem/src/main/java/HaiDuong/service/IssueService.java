package HaiDuong.service;

import HaiDuong.Model.Issue;
import HaiDuong.Model.User;
import HaiDuong.request.IssueDTO;

import java.util.List;
import java.util.Optional;

public interface IssueService {
    Issue getIssueById(Long issueId) throws Exception;

    List<Issue> getIssueByProjectId(Long projectId) throws Exception;

    Issue createIssue(IssueDTO issue, User user) throws Exception;

    void deleteIssue(Long issueId,Long userId) throws Exception;

    Issue addUserToIssue(Long issueId,Long userId) throws Exception;

    Issue updateStatus(Long issueId,String status) throws Exception;

}
