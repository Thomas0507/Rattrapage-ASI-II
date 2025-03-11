package com.projet_asi_ii.logger.controllers;

import com.projet_asi_ii.MessageRequest;
import com.projet_asi_ii.logger.entities.MessageEntity;
import com.projet_asi_ii.logger.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/messages")
public class MessageController {

	@Autowired
	private MessageRepository messageRepository;

	@PostMapping
	public void saveMessage(@RequestBody MessageRequest message) throws IOException
	{
		// Sauvegarde du message dans la base de données
		MessageEntity messageEntity = new MessageEntity();
		messageEntity.setRequestId(message.getRequestId());
		messageEntity.setServiceId(message.getServiceId());
		messageEntity.setPayload(message.getPayload());

		messageRepository.save(messageEntity);

		// Logge le message
		System.out.println("Message reçu et sauvegardé : " + message);
	}
}