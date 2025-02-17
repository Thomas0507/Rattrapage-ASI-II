package com.projet_asi_ii.asi_ii.services;

import com.projet_asi_ii.asi_ii.entities.User;
import com.projet_asi_ii.asi_ii.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public class UserDetailsServiceImpl implements UserDetailsService
{
	@Autowired
	private UserRepository userRepository = null;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
	{
		Optional<User> optional = userRepository.findByUsername(username);

		if (optional.isEmpty())
		{
			throw new UsernameNotFoundException(username);
		}

		return optional.get();
	}
}
