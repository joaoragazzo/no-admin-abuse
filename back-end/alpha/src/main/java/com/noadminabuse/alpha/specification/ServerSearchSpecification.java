package com.noadminabuse.alpha.specification;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.noadminabuse.alpha.model.ServerGroup;
import com.noadminabuse.alpha.model.enums.dayz.DayZGameTags;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;

public class ServerSearchSpecification {
    public static Specification<ServerGroup> hasTags(List<DayZGameTags> tags) {
        return (root, query, builder) -> {
            if (tags == null || tags.isEmpty()) {
                return null;
            }

            Predicate[] predicates = new Predicate[tags.size()];
            
            for (int i = 0; i < tags.size(); i++) {
                DayZGameTags tag = tags.get(i);
                
                Subquery<Long> subquery = query.subquery(Long.class);
                Root<ServerGroup> subRoot = subquery.from(ServerGroup.class);
                Join<Object, Object> subServers = subRoot.join("servers", JoinType.INNER);
                Join<Object, String> subTagsJoin = subServers.join("tags", JoinType.INNER);
                
                subquery.select(builder.literal(1L))
                        .where(
                            builder.equal(subRoot.get("id"), root.get("id")),
                            builder.equal(subTagsJoin, tag)
                        );
                
                predicates[i] = builder.exists(subquery);
            }
            
            return builder.and(predicates);
        };
    }
}
