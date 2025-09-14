package com.noadminabuse.alpha.specification;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.noadminabuse.alpha.model.Country;
import com.noadminabuse.alpha.model.Server;
import com.noadminabuse.alpha.model.Network;
import com.noadminabuse.alpha.model.enums.dayz.DayZGameTags;
import com.noadminabuse.alpha.model.enums.Region;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;

public class ServerSearchSpecification {
    public static Specification<Network> hasTags(List<DayZGameTags> tags) {
        return (root, query, builder) -> {
            if (tags == null || tags.isEmpty()) {
                return null;
            }

            Predicate[] predicates = new Predicate[tags.size()];
            
            for (int i = 0; i < tags.size(); i++) {
                DayZGameTags tag = tags.get(i);
                
                Subquery<Long> subquery = query.subquery(Long.class);
                Root<Network> subRoot = subquery.from(Network.class);
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

    public static Specification<Network> hasSearch(String search) {
        return (root, query, builder) -> {
            if (search == null || search.isBlank()) {
                return null;
            }

            Join<Network, Server> serverJoin = root.join("servers", JoinType.INNER);

            return builder.like(
                builder.lower(serverJoin.get("name"))
                , "%" + search.toLowerCase() + "%"
            );
        };
    }

    public static Specification<Network> hasRegion(Region region) {
        return (root, query, builder) -> {
            if (region == null) return null;
            
            Subquery<Long> subquery = query.subquery(Long.class);
            Root<Server> serverRoot = subquery.from(Server.class);
            Join<Server, Country> countryJoin = serverRoot.join("country", JoinType.INNER);
            
            subquery.select(builder.literal(1L))
                    .where(
                        builder.and(
                            builder.equal(serverRoot.get("network"), root),
                            builder.equal(countryJoin.get("region"), region)
                        )
                    );
            
            return builder.exists(subquery);
        };
    }

    public static Specification<Network> withPopularityOrder() {
        return (root, query, builder) -> {
            if (Long.class.equals(query.getResultType())) {
                return builder.conjunction();
            }

            Subquery<Long> popularitySubquery = query.subquery(Long.class);
            Root<Server> serverRoot = popularitySubquery.from(Server.class);

            popularitySubquery.select(
                builder.coalesce(
                    builder.sum(serverRoot.get("onlinePlayers")), 
                    0L
                )
            ).where(
                builder.equal(serverRoot.get("network"), root)
            ).groupBy(
                serverRoot.get("network")
            );

            query.orderBy(
                builder.desc(popularitySubquery.getSelection()),
                builder.asc(root.get("name"))
            );

            return builder.conjunction();
        };
    }

    public static Specification<Network> withGameSlug(String gameSlug) {
        return (root, query, builder) -> {
            if (gameSlug == null || gameSlug.isBlank() || gameSlug.isEmpty()) {
                return null;
            }

            return builder.equal(
                builder.upper(root.get("game").get("slug")),
                gameSlug
            );
        };
    }
}
