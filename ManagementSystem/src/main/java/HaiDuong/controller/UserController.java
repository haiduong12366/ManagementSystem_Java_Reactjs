package HaiDuong.controller;

import HaiDuong.Model.User;
import HaiDuong.repository.UserRepository;
import HaiDuong.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String jwt ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestHeader("Authorization") String jwt,
                                           @RequestBody User userUpdate) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        user.setEmail(userUpdate.getEmail());
        user.setFullName(userUpdate.getFullName());
        if(userUpdate.getPassword()!=null)
            if(!userUpdate.getPassword().isEmpty() ){
                user.setPassword(userUpdate.getPassword());
            }
        System.out.println(user);
        User userSave = userRepository.save(user);
        return new ResponseEntity<>(userSave, HttpStatus.OK);
    }
}
