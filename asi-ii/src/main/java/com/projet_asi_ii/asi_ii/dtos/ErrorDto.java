package com.projet_asi_ii.asi_ii.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ErrorDto
{
	private int status;

	private String message;

	private String reason;
}
