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

import java.util.HashMap;
import java.util.Map;

@Service
public class ImageGenerationService {
    @Autowired
    private JmsTemplate jmsTemplate;

    @Autowired
    private OpenAiImageModel openAiImageModel;

    @JmsListener(destination = "service-image.queue")
    public void receiveMessage(MessageRequest message) {
        String requestId = message.getRequestId();
        Map<String, Object> payload = message.getPayload();
        String imageUrl = null;

        try {
            // Extract the prompt from the payload
            String prompt = (String) payload.get("prompt");
            // Map<String, Object> responsePayload = Map.of("data", response.getResult().getOutput().getText());

            // Process the prompt (e.g., send to an image generation service)
            System.out.println("Received image prompt: " + prompt);

            // Generate image using Neural Love API
            imageUrl = generateImage(prompt);

            // Create response payload with the image URL
            Map<String, Object> responsePayload = new HashMap<>();
            responsePayload.put("status", "success");
            responsePayload.put("url", imageUrl);  // Using "url" as the key for the image URL
            responsePayload.put("message", "Image generated successfully for request " + requestId);

            System.out.println("Error generating image: " + responsePayload);

            // Send the response back to the response queue
            jmsTemplate.convertAndSend("response.queue",
                    new MessageRequest(requestId, message.getServiceId(), responsePayload));

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
                .model("dall-e-2")  // Use DALL·E 2 (cheaper than DALL·E 3)
                .N(1)  // 1 image
                .height(512)  // Smaller size reduces cost
                .width(512)
                .build();


        // Create image prompt with options
        ImagePrompt imagePrompt = new ImagePrompt(prompt, options);

        // Generate image
        ImageResponse response = openAiImageModel.call(imagePrompt);

        // Extract URL from the response
        ImageGeneration generation = response.getResult();
        System.out.println(generation.getOutput().getUrl());

        return generation.getOutput().getUrl();
    }
}