package com.projet_asi_ii.asi_ii.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "app_user")
public class User implements Serializable, UserDetails
{
	@Id
	@Column(nullable = false)
	@GeneratedValue(
			strategy= GenerationType.AUTO,
			generator="native"
	)
	private long id;

	@Column(unique = true, length = 100, nullable = false)
	private String username;
	@Column(nullable = false)
	private String password;

	@CreationTimestamp
	@Column(updatable = false)
	private Date createdAt;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of();
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public String getPassword()
	{
		return password;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}