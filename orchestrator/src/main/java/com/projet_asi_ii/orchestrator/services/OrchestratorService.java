package com.projet_asi_ii.orchestrator.services;

import com.projet_asi_ii.MessageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Service
public class OrchestratorService
{
	@Autowired
	private JmsTemplate jmsTemplate;

	private final ConcurrentHashMap<String, CompletableFuture<List<Map<String, Object>>>> requestFutures = new ConcurrentHashMap<>();

	private List<Map<String, Object>> responses;

	public CompletableFuture<List<Map<String, Object>>> sendRequests(String requestId) {
		Map<String, String> serviceQueues = Map.of(
				"card-image", "service-image.queue",
				"card-prompt", "service-text.queue"
		);

		CompletableFuture<List<Map<String, Object>>> future = new CompletableFuture<>();
		requestFutures.put(requestId, future);

		responses = Collections.synchronizedList(new ArrayList<>());

		for (Map.Entry<String, String> entry : serviceQueues.entrySet()) {
			String serviceId = entry.getKey();
			String queueName = entry.getValue();

			MessageRequest message = new MessageRequest(requestId, serviceId, null);
			jmsTemplate.convertAndSend(queueName, message);
		}

		CompletableFuture.delayedExecutor(5, TimeUnit.SECONDS).execute(() -> {
			if (!future.isDone()) {
				System.out.println("Timeout atteint pour requestId = " + requestId);
				future.complete(responses); // Renvoie ce qui est disponible
			}
		});

		return future;
	}

	@JmsListener(destination = "response.queue")
	public void receiveResponse(MessageRequest message) {
		CompletableFuture<List<Map<String, Object>>> future = requestFutures.get(message.getRequestId());
		if (future != null) {
			responses.add(Map.of("serviceId", message.getServiceId(), "data", message.getPayload().get("data")));

			// Vérifie si toutes les réponses sont reçues
			if (responses.size() == 2) {
				future.complete(responses);
			}
		}
	}
}
