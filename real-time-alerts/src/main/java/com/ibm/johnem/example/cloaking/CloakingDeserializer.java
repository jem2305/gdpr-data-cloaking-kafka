package com.ibm.johnem.example.cloaking;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.kafka.common.serialization.Deserializer;

public abstract class CloakingDeserializer<T extends CloakableEvent<S>, S> implements Deserializer<T> {

    Class<T> deserializerClass;
    ObjectMapper mapper;
    HttpClient httpClient;
    String policyDecisionUrl;

    public CloakingDeserializer(Class<T> typeParameterClass) {
        this.deserializerClass = typeParameterClass;
    }

    public void configure(Map<String,?> configs, boolean isKey) {
        this.httpClient = HttpClient.newHttpClient();
        this.mapper = new ObjectMapper();
        this.policyDecisionUrl = (String) configs.get("policyDecisionUrl");
    }

    @Override
    public T deserialize(String topic, byte[] data) {
        try {
            HttpRequest policyDecisionRequest = createPolicyDecisionRequest(policyDecisionUrl, data);
            HttpResponse<String> response = httpClient.send(policyDecisionRequest, BodyHandlers.ofString());
            CloakingPolicyDecisionResult policyDecisionResult = mapper.readValue(response.body(), CloakingPolicyDecisionResult.class);
            
            T returnValue = deserializerClass.getConstructor().newInstance();
            if(policyDecisionResult.result) {
                returnValue.setCloaked(true);
            }
            else {
                returnValue.setEvent( mapper.readValue(data, returnValue.getEventClass()) );
            }
            return returnValue;
        } catch (IOException | InterruptedException | InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException | NoSuchMethodException | SecurityException e) {
            e.printStackTrace();
            return null;
        }

    }

    private HttpRequest createPolicyDecisionRequest(String policyDecisionUrl, byte[] data) throws IOException {
        CloakingPolicyDecisionRequest request = new CloakingPolicyDecisionRequest( mapper.readTree(data) );
        byte[] requestBytes = mapper.writeValueAsBytes( request );
        return HttpRequest.newBuilder()
            .uri(URI.create(policyDecisionUrl))
            .POST(BodyPublishers.ofByteArray(requestBytes))
            .build();
    }

}