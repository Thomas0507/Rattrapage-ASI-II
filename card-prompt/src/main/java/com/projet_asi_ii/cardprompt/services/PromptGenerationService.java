package com.projet_asi_ii.cardprompt.services;

import com.projet_asi_ii.MessageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PromptGenerationService
{
	@Autowired
	private JmsTemplate jmsTemplate;

	@JmsListener(destination = "service-text.queue")
	public void receiveMessage(MessageRequest message) {
		Map<String, Object> responsePayload = Map.of("data", "Création d'un prompt pour " + message.getRequestId());
		jmsTemplate.convertAndSend("response.queue", new MessageRequest(message.getRequestId(), message.getServiceId(), responsePayload));
	}
}
