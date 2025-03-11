package com.projet_asi_ii.asi_ii.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotifRequest
{
	private int status;

	private String username;

	private String message;
}
