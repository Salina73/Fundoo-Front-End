package com.springBoot.user.service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.annotation.Annotation;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.nio.file.Files;
import java.util.Optional;
import java.util.UUID;

import javax.tools.JavaFileManager.Location;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.springBoot.exception.Exception;
import com.springBoot.response.Response;
import com.springBoot.response.ResponseToken;
import com.springBoot.user.dto.Logindto;
import com.springBoot.user.dto.Maildto;
import com.springBoot.user.dto.Userdto;
import com.springBoot.user.model.User;
import com.springBoot.user.repository.UserRepo;
import com.springBoot.utility.ResponseHelper;
import com.springBoot.utility.TokenGeneratoration;
import com.springBoot.utility.Utility;

@Component
@SuppressWarnings("unused")
@PropertySource("classpath:message.properties")
@Service("userService")
public  class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepo userRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private TokenGeneratoration tokenUtil;

	@Autowired
	private Response statusResponse;
	@Autowired
	private Utility utility;

	@Autowired
	private Environment environment;
	
	public Response Register(Userdto userDto)
	{
		User user = modelMapper.map(userDto, User.class);
		Optional<User> alreadyPresent = userRepo.findByEmailId(user.getEmailId());
		if (alreadyPresent.isPresent()) {
			throw new Exception(environment.getProperty("status.register.emailExistError"));
		}
	
		String password = passwordEncoder.encode(userDto.getPassword());
		user.setPassword(password);
		user = userRepo.save(user);
		
		String token1 = tokenUtil.createToken(user.getUserId());
		Utility.sendToken(user.getEmailId(), "Verification is required for login.Please click below link.\n",
				"http://localhost:8080/user/"+token1);
		statusResponse = ResponseHelper.statusResponse(200, "register successfully");
		return statusResponse;
	}
	
	public ResponseToken Login(Logindto loginDto) {
		
		Optional<User> user = userRepo.findByEmailId(loginDto.getEmailId());
		System.out.println(user);
		ResponseToken response = new ResponseToken();
		if (user.isPresent()) 
		{
			System.out.println("password..." + (loginDto.getPassword()));
			return authentication(user, loginDto.getPassword(),loginDto.getEmailId());
		}
		return response;
	}
		
	public ResponseToken authentication(Optional<User> user, String password,String email) {

		ResponseToken response = new ResponseToken();
		if(!user.get().isVerify()) 
		{
			response.setStatusCode(401);
			response.setStatusMessage(environment.getProperty("user.login.verification"));
			return response;
		}
		
		else if (user.get().isVerify()) 
		{
			boolean status = passwordEncoder.matches(password, user.get().getPassword());
			System.out.println("status"+status);
			if (status == true) 
			{
				System.out.println("logged in");
				response.setStatusCode(200);
				response.setStatusMessage(environment.getProperty("user.login"));
				return response;
			}
			throw new Exception(401, environment.getProperty("user.login.password"));
		}
		throw new Exception(401, environment.getProperty("user.login.verification"));
	}

	public Response validateEmailId(String token) {
		System.out.println("Hi");
		Long id = tokenUtil.decodeToken(token);
		User user = userRepo.findById(id)
				.orElseThrow(() -> new Exception(404, environment.getProperty("user.validation.email")));
		user.setVerify(true);
		userRepo.save(user);
		statusResponse = ResponseHelper.statusResponse(200, environment.getProperty("user.validation"));
		return statusResponse;
	}

	public Response forgetPassword(Maildto emailDto) throws Exception, UnsupportedEncodingException 
	{
		Optional<User> alreadyPresent=userRepo.findByEmailId(emailDto.getEmailId());
		
		if(!alreadyPresent.isPresent()) 
		{
			throw new Exception(401,environment.getProperty("user.forgetPassword.emailId"));
		}
		else
		{
			Utility.send(emailDto.getEmailId(),"Click below link to reset password",
					" http://localhost:4200/Reset-Password");
		}
		return ResponseHelper.statusResponse(200, environment.getProperty("user.forgetpassword.link"));
	}

	@Override
	public Response setpassword(String emailId, String password)
	{
		Optional<User> alreadyPresent=userRepo.findByEmailId(emailId);
		
		if(!alreadyPresent.isPresent()) 
		{
			throw new Exception(401,environment.getProperty("user.forgetPassword.emailId"));
		}
		else
		{
			Long id=alreadyPresent.get().getUserId();
			
			User user=userRepo.findById(id).
					orElseThrow(() -> new Exception("User not found!!"));
			
			String password1 = passwordEncoder.encode(password);
			
			user.setPassword(password1);
			userRepo.save(user);
			return ResponseHelper.statusResponse(200, "Password set successfully...");
		}
		
	}
	
}