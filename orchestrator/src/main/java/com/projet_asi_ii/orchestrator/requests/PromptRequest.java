package com.projet_asi_ii.orchestrator.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PromptRequest
{
	String imagePrompt;

	String descriptionPrompt;
}
