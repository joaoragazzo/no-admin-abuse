package com.noadminabuse.alpha.mapper;

import java.util.Map;


import org.springframework.stereotype.Component;

import com.noadminabuse.alpha.enums.CountryCode;
import com.noadminabuse.alpha.enums.Region;
import com.noadminabuse.alpha.model.Country;

import static java.util.Map.entry;

import java.util.List;

@Component
public class CountryMapper {

    private static final Map<CountryCode, Region> MAPPING = Map.ofEntries(
        entry(CountryCode.DZ, Region.AFRICA),
        entry(CountryCode.AO, Region.AFRICA),
        entry(CountryCode.BJ, Region.AFRICA),
        entry(CountryCode.BW, Region.AFRICA),
        entry(CountryCode.BF, Region.AFRICA),
        entry(CountryCode.BI, Region.AFRICA),
        entry(CountryCode.CM, Region.AFRICA),
        entry(CountryCode.CV, Region.AFRICA),
        entry(CountryCode.CF, Region.AFRICA),
        entry(CountryCode.TD, Region.AFRICA),
        entry(CountryCode.KM, Region.AFRICA),
        entry(CountryCode.CG, Region.AFRICA),
        entry(CountryCode.CD, Region.AFRICA),
        entry(CountryCode.DJ, Region.AFRICA),
        entry(CountryCode.EG, Region.AFRICA),
        entry(CountryCode.GQ, Region.AFRICA),
        entry(CountryCode.ER, Region.AFRICA),
        entry(CountryCode.SZ, Region.AFRICA),
        entry(CountryCode.ET, Region.AFRICA),
        entry(CountryCode.GA, Region.AFRICA),
        entry(CountryCode.GM, Region.AFRICA),
        entry(CountryCode.GH, Region.AFRICA),
        entry(CountryCode.GN, Region.AFRICA),
        entry(CountryCode.GW, Region.AFRICA),
        entry(CountryCode.KE, Region.AFRICA),
        entry(CountryCode.LS, Region.AFRICA),
        entry(CountryCode.LR, Region.AFRICA),
        entry(CountryCode.LY, Region.AFRICA),
        entry(CountryCode.MG, Region.AFRICA),
        entry(CountryCode.MW, Region.AFRICA),
        entry(CountryCode.ML, Region.AFRICA),
        entry(CountryCode.MR, Region.AFRICA),
        entry(CountryCode.MU, Region.AFRICA),
        entry(CountryCode.MA, Region.AFRICA),
        entry(CountryCode.MZ, Region.AFRICA),
        entry(CountryCode.NA, Region.AFRICA),
        entry(CountryCode.NE, Region.AFRICA),
        entry(CountryCode.NG, Region.AFRICA),
        entry(CountryCode.RW, Region.AFRICA),
        entry(CountryCode.ST, Region.AFRICA),
        entry(CountryCode.SN, Region.AFRICA),
        entry(CountryCode.SC, Region.AFRICA),
        entry(CountryCode.SL, Region.AFRICA),
        entry(CountryCode.SO, Region.AFRICA),
        entry(CountryCode.ZA, Region.AFRICA),
        entry(CountryCode.SS, Region.AFRICA),
        entry(CountryCode.SD, Region.AFRICA),
        entry(CountryCode.TZ, Region.AFRICA),
        entry(CountryCode.TG, Region.AFRICA),
        entry(CountryCode.TN, Region.AFRICA),
        entry(CountryCode.UG, Region.AFRICA),
        entry(CountryCode.ZM, Region.AFRICA),
        entry(CountryCode.ZW, Region.AFRICA),
        
        // ASIA
        entry(CountryCode.AF, Region.ASIA),
        entry(CountryCode.AM, Region.ASIA),
        entry(CountryCode.AZ, Region.ASIA),
        entry(CountryCode.BH, Region.ASIA),
        entry(CountryCode.BD, Region.ASIA),
        entry(CountryCode.BT, Region.ASIA),
        entry(CountryCode.BN, Region.ASIA),
        entry(CountryCode.KH, Region.ASIA),
        entry(CountryCode.CN, Region.ASIA),
        entry(CountryCode.CY, Region.ASIA),
        entry(CountryCode.GE, Region.ASIA),
        entry(CountryCode.IN, Region.ASIA),
        entry(CountryCode.ID, Region.ASIA),
        entry(CountryCode.IR, Region.ASIA),
        entry(CountryCode.IQ, Region.ASIA),
        entry(CountryCode.IL, Region.ASIA),
        entry(CountryCode.JP, Region.ASIA),
        entry(CountryCode.JO, Region.ASIA),
        entry(CountryCode.KZ, Region.ASIA),
        entry(CountryCode.KP, Region.ASIA),
        entry(CountryCode.KR, Region.ASIA),
        entry(CountryCode.KW, Region.ASIA),
        entry(CountryCode.KG, Region.ASIA),
        entry(CountryCode.LA, Region.ASIA),
        entry(CountryCode.LB, Region.ASIA),
        entry(CountryCode.MY, Region.ASIA),
        entry(CountryCode.MV, Region.ASIA),
        entry(CountryCode.MN, Region.ASIA),
        entry(CountryCode.MM, Region.ASIA),
        entry(CountryCode.NP, Region.ASIA),
        entry(CountryCode.OM, Region.ASIA),
        entry(CountryCode.PK, Region.ASIA),
        entry(CountryCode.PH, Region.ASIA),
        entry(CountryCode.QA, Region.ASIA),
        entry(CountryCode.SA, Region.ASIA),
        entry(CountryCode.SG, Region.ASIA),
        entry(CountryCode.LK, Region.ASIA),
        entry(CountryCode.SY, Region.ASIA),
        entry(CountryCode.TW, Region.ASIA),
        entry(CountryCode.TJ, Region.ASIA),
        entry(CountryCode.TH, Region.ASIA),
        entry(CountryCode.TL, Region.ASIA),
        entry(CountryCode.TR, Region.ASIA),
        entry(CountryCode.TM, Region.ASIA),
        entry(CountryCode.AE, Region.ASIA),
        entry(CountryCode.UZ, Region.ASIA),
        entry(CountryCode.VN, Region.ASIA),
        entry(CountryCode.YE, Region.ASIA),
        entry(CountryCode.HK, Region.ASIA),
        
        // EUROPE
        entry(CountryCode.AL, Region.EUROPE),
        entry(CountryCode.AD, Region.EUROPE),
        entry(CountryCode.AT, Region.EUROPE),
        entry(CountryCode.BY, Region.EUROPE),
        entry(CountryCode.BE, Region.EUROPE),
        entry(CountryCode.BA, Region.EUROPE),
        entry(CountryCode.BG, Region.EUROPE),
        entry(CountryCode.HR, Region.EUROPE),
        entry(CountryCode.CZ, Region.EUROPE),
        entry(CountryCode.DK, Region.EUROPE),
        entry(CountryCode.EE, Region.EUROPE),
        entry(CountryCode.FI, Region.EUROPE),
        entry(CountryCode.FR, Region.EUROPE),
        entry(CountryCode.DE, Region.EUROPE),
        entry(CountryCode.GR, Region.EUROPE),
        entry(CountryCode.GL, Region.EUROPE),
        entry(CountryCode.HU, Region.EUROPE),
        entry(CountryCode.IS, Region.EUROPE),
        entry(CountryCode.IE, Region.EUROPE),
        entry(CountryCode.IT, Region.EUROPE),
        entry(CountryCode.LV, Region.EUROPE),
        entry(CountryCode.LI, Region.EUROPE),
        entry(CountryCode.LT, Region.EUROPE),
        entry(CountryCode.LU, Region.EUROPE),
        entry(CountryCode.MT, Region.EUROPE),
        entry(CountryCode.MD, Region.EUROPE),
        entry(CountryCode.MC, Region.EUROPE),
        entry(CountryCode.ME, Region.EUROPE),
        entry(CountryCode.MK, Region.EUROPE),
        entry(CountryCode.NL, Region.EUROPE),
        entry(CountryCode.NO, Region.EUROPE),
        entry(CountryCode.PL, Region.EUROPE),
        entry(CountryCode.PT, Region.EUROPE),
        entry(CountryCode.RO, Region.EUROPE),
        entry(CountryCode.RU, Region.EUROPE),
        entry(CountryCode.SM, Region.EUROPE),
        entry(CountryCode.RS, Region.EUROPE),
        entry(CountryCode.SK, Region.EUROPE),
        entry(CountryCode.SI, Region.EUROPE),
        entry(CountryCode.ES, Region.EUROPE),
        entry(CountryCode.SE, Region.EUROPE),
        entry(CountryCode.CH, Region.EUROPE),
        entry(CountryCode.UA, Region.EUROPE),
        entry(CountryCode.GB, Region.EUROPE),
        entry(CountryCode.VA, Region.EUROPE),
        
        // NORTH_AMERICA
        entry(CountryCode.BS, Region.NORTH_AMERICA),
        entry(CountryCode.BB, Region.NORTH_AMERICA),
        entry(CountryCode.BZ, Region.NORTH_AMERICA),
        entry(CountryCode.CA, Region.NORTH_AMERICA),
        entry(CountryCode.CR, Region.NORTH_AMERICA),
        entry(CountryCode.CU, Region.NORTH_AMERICA),
        entry(CountryCode.DM, Region.NORTH_AMERICA),
        entry(CountryCode.DO, Region.NORTH_AMERICA),
        entry(CountryCode.SV, Region.NORTH_AMERICA),
        entry(CountryCode.GD, Region.NORTH_AMERICA),
        entry(CountryCode.GT, Region.NORTH_AMERICA),
        entry(CountryCode.HT, Region.NORTH_AMERICA),
        entry(CountryCode.HN, Region.NORTH_AMERICA),
        entry(CountryCode.JM, Region.NORTH_AMERICA),
        entry(CountryCode.MX, Region.NORTH_AMERICA),
        entry(CountryCode.NI, Region.NORTH_AMERICA),
        entry(CountryCode.PA, Region.NORTH_AMERICA),
        entry(CountryCode.KN, Region.NORTH_AMERICA),
        entry(CountryCode.LC, Region.NORTH_AMERICA),
        entry(CountryCode.VC, Region.NORTH_AMERICA),
        entry(CountryCode.TT, Region.NORTH_AMERICA),
        entry(CountryCode.US, Region.NORTH_AMERICA),
        
        // SOUTH_AMERICA
        entry(CountryCode.AR, Region.SOUTH_AMERICA),
        entry(CountryCode.BO, Region.SOUTH_AMERICA),
        entry(CountryCode.BR, Region.SOUTH_AMERICA),
        entry(CountryCode.CL, Region.SOUTH_AMERICA),
        entry(CountryCode.CO, Region.SOUTH_AMERICA),
        entry(CountryCode.EC, Region.SOUTH_AMERICA),
        entry(CountryCode.GY, Region.SOUTH_AMERICA),
        entry(CountryCode.PY, Region.SOUTH_AMERICA),
        entry(CountryCode.PE, Region.SOUTH_AMERICA),
        entry(CountryCode.SR, Region.SOUTH_AMERICA),
        entry(CountryCode.UY, Region.SOUTH_AMERICA),
        entry(CountryCode.VE, Region.SOUTH_AMERICA),
        
        // OCEANIA
        entry(CountryCode.AU, Region.OCEANIA),
        entry(CountryCode.FJ, Region.OCEANIA),
        entry(CountryCode.KI, Region.OCEANIA),
        entry(CountryCode.MH, Region.OCEANIA),
        entry(CountryCode.FM, Region.OCEANIA),
        entry(CountryCode.NR, Region.OCEANIA),
        entry(CountryCode.NZ, Region.OCEANIA),
        entry(CountryCode.PW, Region.OCEANIA),
        entry(CountryCode.PG, Region.OCEANIA),
        entry(CountryCode.WS, Region.OCEANIA),
        entry(CountryCode.SB, Region.OCEANIA),
        entry(CountryCode.TO, Region.OCEANIA),
        entry(CountryCode.TV, Region.OCEANIA),
        entry(CountryCode.VU, Region.OCEANIA)
    );
    
    public Country toEntity(CountryCode code) {
        Region region = MAPPING.get(code);
        Country country = new Country();
        country.setCode(code);
        country.setRegion(region);
        return country;
    }

    public List<Country> toEntity(List<CountryCode> codes) {
        return codes.stream()
            .distinct()
            .map(this::toEntity)
            .toList();
    }

}
