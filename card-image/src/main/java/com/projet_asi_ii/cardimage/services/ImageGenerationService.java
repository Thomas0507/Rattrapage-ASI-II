package com.projet_asi_ii.cardimage.services;

import com.projet_asi_ii.MessageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ImageGenerationService
{
	@Autowired
	private JmsTemplate jmsTemplate;

	@JmsListener(destination = "service-image.queue")
	public void receiveMessage(MessageRequest message) {
		try
		{
			Thread.sleep(3000);
		}
		catch (InterruptedException e)
		{
			throw new RuntimeException(e);
		}

		Map<String, Object> responsePayload = Map.of("data", "Création d'une image pour " + message.getRequestId());
		jmsTemplate.convertAndSend("response.queue", new MessageRequest(message.getRequestId(), message.getServiceId(), responsePayload));
	}
}
