package com.projet_asi_ii.orchestrator.controllers;

import com.projet_asi_ii.orchestrator.requests.PromptRequest;
import com.projet_asi_ii.orchestrator.services.OrchestratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.smartcardio.Card;
import java.util.UUID;

@RestController
@RequestMapping("/orchestrator")
public class OrchestratorController
{

	@Autowired
	private OrchestratorService orchestratorService;

	@PostMapping("/generateCard")
	public String generateCard(@RequestHeader("Authorization") String bearerToken, @RequestBody PromptRequest promptRequest) {
		orchestratorService.sendRequests(UUID.randomUUID(), bearerToken, promptRequest);

		return "Request sent";
	}
}
