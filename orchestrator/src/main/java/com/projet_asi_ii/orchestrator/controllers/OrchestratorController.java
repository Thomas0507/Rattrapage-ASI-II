package com.projet_asi_ii.orchestrator.controllers;

import com.projet_asi_ii.orchestrator.services.OrchestratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/orchestrator")
public class OrchestratorController
{

	@Autowired
	private OrchestratorService orchestratorService;

	@GetMapping("/generateCard")
	public String generateCard(@RequestHeader("Authorization") String bearerToken) {
		orchestratorService.sendRequests(UUID.randomUUID(), bearerToken);

		return "Request sent";
	}
}
