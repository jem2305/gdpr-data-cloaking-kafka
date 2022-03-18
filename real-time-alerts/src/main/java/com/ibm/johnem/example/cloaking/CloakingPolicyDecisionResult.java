package com.ibm.johnem.example.cloaking;

public class CloakingPolicyDecisionResult {

    boolean result;

    public CloakingPolicyDecisionResult() {
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (this.result ? 1231 : 1237);
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
        CloakingPolicyDecisionResult other = (CloakingPolicyDecisionResult) obj;
        if (result != other.result)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "PolicyDecisionResult [result=" + result + "]";
    }
    
}
