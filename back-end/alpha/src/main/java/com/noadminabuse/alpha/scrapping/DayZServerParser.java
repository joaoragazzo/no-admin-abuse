package com.noadminabuse.alpha.scrapping;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import com.noadminabuse.alpha.enums.dayz.DayZGameTags;

public class DayZServerParser {

    /** Clean up regex */

    private final Pattern urlPattern = Pattern.compile("(https?://[^\\s]+|[\\w.-]+\\.[a-z]{2,}/[^\\s]*)", Pattern.CASE_INSENSITIVE);
    private final Pattern instanceNumberPattern = Pattern.compile("#(\\d+)");
    private final Pattern wipedPattern = Pattern.compile(
        "(?i)(?<!\\w)[*=]*\\s*(fresh\\s*)?(wipe[ds]?|inaugurad[oa]|inaugura[çc][ãa]o)\\s*[*=]*(?!\\w)",
        Pattern.CASE_INSENSITIVE
    );
    
    private final Pattern gameplayTagsPattern = Pattern.compile(
        "(vanilla\\+{2}|vanilla\\+(?!\\+)|vanilla(?!\\+)|no-?raid|v\\+{2}|v\\+(?!\\+)|deathmatch|dm|pvp\\+?|pve\\+?|pvevp|rp|roleplay|no-base|nobase|" +
        "hardcore\\+{2}|hardcore\\+(?!\\+)|hardcore(?!\\+)|hc|survival|adventure|quest|quests|trader|trading|" +
        "friendly|modded|casual|softcore|no pvp|fpp|tpp|3pp|1pp|no-base|lite|no base|solo/duo/trio|solo-duo-trio|solo|duo|trio)|" + 
        "",
        Pattern.CASE_INSENSITIVE
    );

    private final Pattern technicalTagsPattern = Pattern.compile(
        "(?i)(?<!\\w)(" +
        "3pp|1pp|first\\s*person|third\\s*person|" +
        "loot\\s*x\\s*\\d+|" +
        "loot\\s*\\++|" +
        "loot\\s*n\\s*x|" +
        "\\d+\\s*x\\s*loot|" +
        "x\\d+\\s*loot|" +
        "start\\s*\\d+k?|bitcoin|dna|ai|bots?|heli?s?|cars?|vehicles?|boats?|" +
        "skill\\s*perks?|skills?|koth|king\\s+of\\s+the\\s+hill|bbp|" +
        "airdrops?|events?|custom|whitelist|no\\s*whitelist|wl|no\\s+kos|nokos|aod|" +
        "aventura\\+\\+|aventura\\+|aventura|" + 
        ")(?=\\b|\\W|$)", 
        Pattern.CASE_INSENSITIVE              
    );

    private final Pattern regionPattern = Pattern.compile(
        "\\b(north\\s*america|latin\\s*america|us/en|ger/eng?|usa|na|eu|europe|brasil|brazil|" +
        "australia|oceania|russia|ukraine|germany|belgium|france|czech|slovakia|" +
        "serbia|hungary|argentina|singapore|taiwan|china|" +
        "br|us|au|ru|uk|ua|fr|be|ger|de|cz|sk|hun|rs|latam|arg|asia|pacific|sy|sg|la|tw|cn)\\d*?\\b",
        Pattern.CASE_INSENSITIVE
    );

    private final Pattern mapPattern = Pattern.compile(
        "\\b(livonia|namalsk|chernarus|cherno|deer\\s*isle|deerisle|" +
        "banov|sakhal|syberia|enoch|takistan|esseker|altis|" +
        "kamyshovo|expansion)\\b",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern separatorsPattern = Pattern.compile("[\\|\\-•:~★►»→/]");

    private static final Pattern stopWordsPattern = Pattern.compile(
        "\\b(server|srv|discord|gg|www|com|ru|net|org|season|temp|full|new|old|best|top|official)\\b",
        Pattern.CASE_INSENSITIVE
    );

    /** Check tags existence regex */

    private static final Pattern vanillaPPattern = Pattern.compile(
        "\\bvanil{1,2}a\\s*[p\\+](?=\\s|\\||$)",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern vanillaPPPattern = Pattern.compile(
        "\\bvanil{1,2}a\\s*([p\\+]{2})\\b",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern vanillaPattern = Pattern.compile(
        "\\bvanil{1,2}a\\s*\\b",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern hardcorePattern = Pattern.compile(
        "\\bhardcore\\s*",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern fppPattern = Pattern.compile(
        "\\b(fpp|1pp|first\\s*person\\s*view|first\\s*person)\\b",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern tppPattern = Pattern.compile(
        "\\b(tpp|3pp|third\\s*person\\s*view|third\\s*person)\\b",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern pvpPattern = Pattern.compile(
        "\\b(pvp|player\\s*vs\\s*player|players?\\s*vs\\s*players?)\\b",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern pvePattern = Pattern.compile(
        "\\b(pve|player\\s*vs\\s*enviroment|players?\\s*vs\\s*enviroment?)\\b",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern soloPattern = Pattern.compile(
        "\\b(solo)\\b",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern duoPattern = Pattern.compile(
        "\\b(duo|2\\s*man|2-man)\\b",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern trioPattern = Pattern.compile(
        "\\b(trio|3\\s*man|3-man)\\b",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern squadPattern = Pattern.compile(
        "\\b(squad|4\\s*man|4-man|5\\s*man|5-man)\\b",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern fmanPattern = Pattern.compile(
        "\\b(5 man|5\\s*man|5-man|5\\s*max|5-max|5 max)\\b",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern fullModPattern = Pattern.compile(
        "\\b(fullmod|full-mod|full\\s*mod)\\b",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern fullPvpPattern = Pattern.compile(
        "\\b(fullpvp|full-pvp|full\\s*pvp)\\b",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern deathmatchPattern = Pattern.compile(
        "\\b(deathmatch)\\b",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern noBasePattern = Pattern.compile(
        "\\b(nobase|no-base|no\\s*base)\\b",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern noRaidPattern = Pattern.compile(
        "\\b(noraid|no-raid|no\\s*raid)\\b",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern wipePattern = Pattern.compile(
        "\\b(wiped|wipe|new)\\b",
        Pattern.CASE_INSENSITIVE
    );

    private static final Pattern roleplayPattern = Pattern.compile(
        "\\b(roleplay|rp|role\\s*play)\\b",
        Pattern.CASE_INSENSITIVE
    );

    public List<DayZGameTags> extractDayZGameTags(String serverName) {
        List<DayZGameTags> tags = new ArrayList<>();
        
        if (isVanillaPP(serverName)) {
            tags.add(DayZGameTags.VANILLAPP);
        } else if (isVanillaP(serverName)) {
            tags.add(DayZGameTags.VANILLAP);
        } else if (isVanilla(serverName)) {
            tags.add(DayZGameTags.VANILLA);
        }

        if (isThirdPerson(serverName))
            tags.add(DayZGameTags.TPP);

        if (isFirstPerson(serverName))
            tags.add(DayZGameTags.FPP);

        if (isPve(serverName))
            tags.add(DayZGameTags.PVE);

        if (isPvp(serverName))
            tags.add(DayZGameTags.PVP);

        if (isSolo(serverName))
            tags.add(DayZGameTags.SOLO);

        if (isDuo(serverName))
            tags.add(DayZGameTags.DUO);

        if (isTrio(serverName))
            tags.add(DayZGameTags.TRIO);

        if (isSquad(serverName))
            tags.add(DayZGameTags.SQUAD);

        if (isFullmod(serverName))
            tags.add(DayZGameTags.FULLMOD);

        if (isHardcore(serverName))
            tags.add(DayZGameTags.HARDCORE);

        if (isRoleplay(serverName))
            tags.add(DayZGameTags.ROLEPLAY);

        if (isDeathmatch(serverName))
            tags.add(DayZGameTags.DEATHMATCH);
        
        if (isWiped(serverName))
            tags.add(DayZGameTags.WIPE);
            
        if (isNoBase(serverName))
            tags.add(DayZGameTags.NOBASE);

        if (isNoRaid(serverName))
            tags.add(DayZGameTags.NORAID);

        if (isFullpvp(serverName))
            tags.add(DayZGameTags.FULLMOD);

        if (isFMan(serverName))
            tags.add(DayZGameTags.FMAX);

        return tags;
    }

    private boolean isVanillaP(String serverName) {
        if (serverName == null) return false;
        return vanillaPPattern.matcher(serverName).find();
    }

    private boolean isVanillaPP(String serverName) {
        if (serverName == null) return false;
        return vanillaPPPattern.matcher(serverName).find();
    }

    private boolean isVanilla(String serverName) {
        if (serverName == null) return false;
        return vanillaPattern.matcher(serverName).find();
    }

    private boolean isThirdPerson(String serverName) {
        if (serverName == null) return false;
        return tppPattern.matcher(serverName).find();
    }

    private boolean isFirstPerson(String serverName) {
        if (serverName == null) return false;
        return fppPattern.matcher(serverName).find();
    }

    private boolean isPve(String serverName) {
        if (serverName == null) return false;
        return pvePattern.matcher(serverName).find();
    }

    private boolean isPvp(String serverName) {
        if (serverName == null) return false;
        return pvpPattern.matcher(serverName).find();
    }

    private boolean isSolo(String serverName) {
        if (serverName == null) return false;
        return soloPattern.matcher(serverName).find();
    }

    private boolean isDuo(String serverName) {
        if (serverName == null) return false;
        return duoPattern.matcher(serverName).find();
    }

    private boolean isTrio(String serverName) {
        if (serverName == null) return false;
        return trioPattern.matcher(serverName).find();
    }

    private boolean isSquad(String serverName) {
        if (serverName == null) return false;
        return squadPattern.matcher(serverName).find();
    }

    private boolean isFullmod(String serverName) {
        if (serverName == null) return false;
        return fullModPattern.matcher(serverName).find();
    }

    private boolean isDeathmatch(String serverName) {
        if (serverName == null) return false;
        return deathmatchPattern.matcher(serverName).find();
    }

    private boolean isFullpvp(String serverName) {
        if (serverName == null) return false;
        return fullPvpPattern.matcher(serverName).find();
    }

    private boolean isNoBase(String serverName) {
        if (serverName == null) return false;
        return noBasePattern.matcher(serverName).find();
    }

    private boolean isNoRaid(String serverName) {
        if (serverName == null) return false;
        return noRaidPattern.matcher(serverName).find();
    }

    private boolean isRoleplay(String serverName) {
        if (serverName == null) return false;
        return roleplayPattern.matcher(serverName).find();
    }

    private boolean isWiped(String serverName) {
        if (serverName == null) return false;
        return wipePattern.matcher(serverName).find();
    }

    private boolean isHardcore(String serverName) {
        if (serverName == null) return false;
        return hardcorePattern.matcher(serverName).find();
    }

    private boolean isFMan(String serverName) {
        if (serverName == null) return false;
        return fmanPattern.matcher(serverName).find();
    }


    public String processCanonicalName(String serverName) {
        String result = removeInstanceNumber(serverName);
        result = removeUrls(result);

        result = removeMap(result);
        result = removeWiped(result);
        result = removeStopWords(result);
        result = removeRegion(result);
        result = removeGameplayTagsPattern(result);
        result = removeTechnicalTagsPattern(result);

        result = getFirstPart(result);

        result = removeSeparators(result);
        result = removeMap(result);
        result = removeWiped(result);
        result = removeStopWords(result);
        result = removeRegion(result);
        result = removeGameplayTagsPattern(result);
        result = removeTechnicalTagsPattern(result);

        result = removeBracketsKeepContent(result);

        return result;
    }

    private String removeUrls(String input) {
        if (input == null) return null;
        return urlPattern.matcher(input).replaceAll("").trim();
    }

    private String removeWiped(String input) {
        if (input == null) return null;
        return wipedPattern.matcher(input).replaceAll("").trim();
    }

    private String removeInstanceNumber(String input) {
        if (input == null) return null;
        return instanceNumberPattern.matcher(input).replaceAll("").trim();
    }

    private String removeSeparators(String input) {
        if (input == null) return null;
        return separatorsPattern.matcher(input).replaceAll(" ").trim();
    }

    private String getFirstPart(String input) {
        if (input == null) return null;
    
        String[] parts = separatorsPattern.split(input);
    
        if (parts.length == 0) return null;
    
        String first = parts[0] != null ? parts[0].trim() : "";
        if (!first.isEmpty()) return first;
    
        if (parts.length > 1) {
            String second = parts[1] != null ? parts[1].trim() : "";
            if (!second.isEmpty()) return second;
        }
    
        for (int i = 2; i < parts.length; i++) {
            String p = parts[i] != null ? parts[i].trim() : "";
            if (!p.isEmpty()) return p;
        }
    
        return null;
    }

    private String removeMap(String input) {
        if (input == null) return null;
        return mapPattern.matcher(input).replaceAll("").trim();
    }

    private String removeStopWords(String input) {
        if (input == null) return null;
        return stopWordsPattern.matcher(input).replaceAll("").trim();
    }

    private String removeRegion(String input) {
        if (input == null) return null;
        return regionPattern.matcher(input).replaceAll("").trim();
    }

    private String removeGameplayTagsPattern(String input) {
        if (input == null) return null;
        return gameplayTagsPattern.matcher(input).replaceAll("").trim();
    }

    private String removeTechnicalTagsPattern(String input) {
        if (input == null) return null;
        return technicalTagsPattern.matcher(input).replaceAll("").trim();
    }

    private String removeBracketsKeepContent(String input) {
        if (input == null) return null;
        String out = input.replaceAll("[\\[\\]]", " ");
        return out.replaceAll("\\s+", " ").trim();
    }


}
