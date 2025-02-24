package com.projet_asi_ii.orchestrator.controllers;

import com.projet_asi_ii.orchestrator.services.OrchestratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/orchestrator")
public class OrchestratorController
{

	@Autowired
	private OrchestratorService orchestratorService;

	@GetMapping("/generateCard")
	public CompletableFuture<List<Map<String, Object>>> generateCard() {
		String requestId = UUID.randomUUID().toString();

		return orchestratorService.sendRequests(requestId);
	}
}
