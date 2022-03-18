package com.ibm.johnem.example.cloaking;

public interface CloakableEvent<T> {

    public boolean isCloaked();
    public void setCloaked(boolean isCloaked);
    public T getEvent();
    public void setEvent(T event);
    public Class<T> getEventClass();
    
}
