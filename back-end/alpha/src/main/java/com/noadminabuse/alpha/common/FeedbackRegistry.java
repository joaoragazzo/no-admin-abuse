package com.noadminabuse.alpha.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.reflections.Reflections;
import org.springframework.stereotype.Component;

import com.noadminabuse.alpha.messages.Feedback;

@Component
public class FeedbackRegistry {
    public List<String> allMessages () {
        Reflections reflections = new Reflections("com.noadminabuse");
        Set<Class<? extends Feedback>> subTypes = reflections.getSubTypesOf(Feedback.class);
        List<String> messages = new ArrayList<>();
        for (Class<? extends Feedback> clazz : subTypes) {
            if (clazz.isEnum()) {
                Feedback[] values = clazz.getEnumConstants();
                for (Feedback f : values) {
                    messages.add(f.getMessage());
                }
            }
        }
        return messages;
    }
}
