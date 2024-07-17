package com.example.todo_list_back.service;

import com.example.todo_list_back.entity.User;
import com.example.todo_list_back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private JwtTokenProvider jwtTokenProvider;

//    @Lazy
//    @Autowired
//    private AuthenticationManager authenticationManager;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return  userRepository.findByEmail(email).orElseThrow( () -> new UsernameNotFoundException("User not found") );
    }

    public User getById(Long id) {
        return userRepository.findById(id).orElseThrow( () -> new UsernameNotFoundException("User not found") );
    }

    public boolean addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return true;
    }

    public boolean verifyUser(String email, String password) {
        return userRepository.findByEmail(email).map(user ->
                passwordEncoder.matches(password, user.getPassword()
                )).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public boolean checkUserNameExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

//    public String generateToken(String email, String password) {
//        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        return jwtTokenProvider.generateToken(authentication);
//    }
}
