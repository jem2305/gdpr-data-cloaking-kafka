package com.ibm.johnem.example.cloaking;

import com.fasterxml.jackson.databind.JsonNode;

public class CloakingPolicyDecisionRequest {

    JsonNode input;

    public CloakingPolicyDecisionRequest() {
    }

    public CloakingPolicyDecisionRequest(JsonNode input) {
        this.input = input;
    }

    public JsonNode getInput() {
        return input;
    }

    public void setInput(JsonNode input) {
        this.input = input;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((input == null) ? 0 : input.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        CloakingPolicyDecisionRequest other = (CloakingPolicyDecisionRequest) obj;
        if (input == null) {
            if (other.input != null)
                return false;
        } else if (!input.equals(other.input))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "PolicyDecisionRequest [input=" + input + "]";
    }
    
}
