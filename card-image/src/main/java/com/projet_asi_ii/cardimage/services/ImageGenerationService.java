package com.projet_asi_ii.cardimage.services;

import com.projet_asi_ii.MessageRequest;
import org.springframework.ai.image.ImageGeneration;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.openai.OpenAiImageModel;
import org.springframework.ai.openai.OpenAiImageOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class ImageGenerationService {
    @Autowired
    private JmsTemplate jmsTemplate;

    @Autowired
    private OpenAiImageModel openAiImageModel;

    private static final String SERVICE_2_API_URL = "http://logger:8089/messages";

    @JmsListener(destination = "service-image.queue")
    public void receiveMessage(MessageRequest message) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.postForEntity(SERVICE_2_API_URL, message, String.class);

        String requestId = message.getRequestId();
        Map<String, Object> payload = message.getPayload();
        String imageUrl = null;

        try {
            // Extract the prompt from the payload
            String prompt = (String) payload.get("prompt");

            // Process the prompt (e.g., send to an image generation service)
            System.out.println("Received image prompt: " + prompt);

            // Generate image using Neural Love API
            imageUrl = generateImage(prompt);
            // imageUrl = prompt;

            // Create response payload with the image URL
            Map<String, Object> responsePayload = Map.of("data", imageUrl);

            // Send the response back to the response queue
            jmsTemplate.convertAndSend("response.queue",
                    new MessageRequest(message.getRequestId(), message.getServiceId(), responsePayload));

        } catch (Exception e) {
            // Handle errors and send error response
            System.out.println("Error generating image: " + e.getMessage());


            Map<String, Object> errorPayload = new HashMap<>();
            errorPayload.put("status", "error");
            errorPayload.put("message", "Failed to generate image: " + e.getMessage());

            jmsTemplate.convertAndSend("response.queue",
                    new MessageRequest(requestId, message.getServiceId(), errorPayload));
        }
    }

    /**
     * Generate an image using Spring AI's OpenAI integration
     */
    private String generateImage(String prompt) throws Exception {
        // Create image options
        OpenAiImageOptions options = OpenAiImageOptions.builder()
                .model("dall-e-3")
                .N(1)  // 1 image
                .height(1024)  // Smaller size reduces cost
                .width(1024)
                .build();


        // Create image prompt with options
        ImagePrompt imagePrompt = new ImagePrompt("in a comic style eerie setting " + prompt, options);

        // Generate image
        ImageResponse response = openAiImageModel.call(imagePrompt);

        // Extract URL from the response
        ImageGeneration generation = response.getResult();
        System.out.println(generation.getOutput().getUrl());

        return generation.getOutput().getUrl();
    }
}