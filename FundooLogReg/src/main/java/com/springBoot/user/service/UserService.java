package com.springBoot.user.service;

import java.io.UnsupportedEncodingException;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.springBoot.exception.Exception;
import com.springBoot.response.Response;
import com.springBoot.response.ResponseToken;
import com.springBoot.user.dto.Logindto;
import com.springBoot.user.dto.Maildto;
import com.springBoot.user.dto.Userdto;
import com.springBoot.user.model.User;
@Service
public interface UserService 
{
	//register
	Response Register(Userdto userDto) throws Exception, UnsupportedEncodingException;

	//Login
	ResponseToken Login(Logindto loginDto) throws Exception, UnsupportedEncodingException;

	//verification of email
	Response validateEmailId(String token) throws Exception;

	//forgot password?
	Response forgetPassword(Maildto emailDto) throws Exception, UnsupportedEncodingException;

	//Authenticate user
	ResponseToken authentication(Optional<User> user, String password, String email) 
			throws UnsupportedEncodingException, Exception;

	Response setpassword(String emailId, String password);

}
