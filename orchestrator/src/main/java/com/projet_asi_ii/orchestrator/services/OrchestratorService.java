package com.projet_asi_ii.orchestrator.services;

import com.projet_asi_ii.MessageRequest;
import com.projet_asi_ii.orchestrator.entities.CardEntity;
import com.projet_asi_ii.orchestrator.repositories.CardRepository;
import com.projet_asi_ii.orchestrator.requests.PromptRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class OrchestratorService
{
	@Autowired
	private JmsTemplate jmsTemplate;

	@Autowired
	private CardRepository cardRepository;

	private String bearerToken;

	private static final String SERVICE_BACK_API_URL = "http://spring-back:8081/cards/generateFromOrchestrator";

	private static final String SERVICE_2_API_URL = "http://logger:8089/messages";

	public void sendRequests(UUID requestId, String userToken, PromptRequest promptRequest) {
		this.bearerToken = userToken;
		cardRepository.save(new CardEntity(requestId, promptRequest.getName(), null, null));

		Map<String, String> serviceQueues = Map.of(
				"card-image", "service-image.queue",
				"card-prompt", "service-text.queue"
		);

		for (Map.Entry<String, String> entry : serviceQueues.entrySet()) {
			String serviceId = entry.getKey();
			String queueName = entry.getValue();

			MessageRequest message = new MessageRequest(requestId.toString(), serviceId, Map.of("name", promptRequest.getName(), "prompt", promptRequest.getPrompt()));
			jmsTemplate.convertAndSend(queueName, message);
		}
	}

	@JmsListener(destination = "response.queue")
	public void receiveResponse(MessageRequest message) {
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.postForEntity(SERVICE_2_API_URL, message, String.class);

		Optional<CardEntity> optionalCard = cardRepository.findByCardId(UUID.fromString(message.getRequestId()));
		if (optionalCard.isPresent())
		{
			CardEntity finalCard = optionalCard.get();
			switch (message.getServiceId())
			{
				case "card-image":
					finalCard.setImage((String) message.getPayload().get("data"));
					cardRepository.save(finalCard);
					break;
				case "card-prompt":
					finalCard.setPrompt((String) message.getPayload().get("data"));
					cardRepository.save(finalCard);
					break;
				default:
					break;
			}

			if (finalCard.getPrompt() == null || finalCard.getImage() == null)
			{
				return;
			}

			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.setBearerAuth(bearerToken.replace("Bearer ", ""));

			HttpEntity<CardEntity> requestEntity = new HttpEntity<>(finalCard, headers);

			restTemplate.postForObject(SERVICE_BACK_API_URL, requestEntity, String.class);
		}
	}
}
