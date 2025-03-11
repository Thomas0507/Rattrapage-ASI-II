package com.projet_asi_ii.logger.entities;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;
import java.util.Map;

@Getter
@Setter
@Entity
@Table(name = "messages")
public class MessageEntity
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String requestId;
	private String serviceId;

	@Column(length = 1024)
	private String payload;

	private static final ObjectMapper objectMapper = new ObjectMapper();

	public void setPayload(Map<String, Object> payload) throws IOException
	{
		this.payload = objectMapper.writeValueAsString(payload);
	}

	public Map<String, Object> getPayload() throws IOException {
		return objectMapper.readValue(this.payload, Map.class);
	}
}