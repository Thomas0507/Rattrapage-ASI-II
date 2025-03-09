package com.projet_asi_ii.orchestrator.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CardResponse
{
	private String name;
	private String image;
	private String prompt;
}
