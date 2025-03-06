package com.projet_asi_ii.cardprompt.services;

import com.projet_asi_ii.MessageRequest;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PromptGenerationService
{
	@Autowired
	private OllamaChatModel ollamaChatModel;

	@Autowired
	private JmsTemplate jmsTemplate;

	@JmsListener(destination = "service-text.queue")
	public void receiveMessage(MessageRequest message) {
		ChatResponse response = ollamaChatModel.call(new Prompt("Generate exclusively a short description of a creature based on this: " + message.getPayload().get("prompt")));
		Map<String, Object> responsePayload = Map.of("data", response.getResult().getOutput().getText());
		jmsTemplate.convertAndSend("response.queue", new MessageRequest(message.getRequestId(), message.getServiceId(), responsePayload));
	}
}
