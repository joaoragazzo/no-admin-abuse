-- V3__insert_base_country.sql
-- Insert base countries into the country table
-- Countries are grouped by region

-- Clear existing entries to avoid duplicates
DELETE FROM country;

INSERT INTO country (code, region) VALUES
-- AFRICA (54 países)
('DZ', 'AFRICA'), -- Algeria
('AO', 'AFRICA'), -- Angola
('BJ', 'AFRICA'), -- Benin
('BW', 'AFRICA'), -- Botswana
('BF', 'AFRICA'), -- Burkina Faso
('BI', 'AFRICA'), -- Burundi
('CM', 'AFRICA'), -- Cameroon
('CV', 'AFRICA'), -- Cape Verde
('CF', 'AFRICA'), -- Central African Republic
('TD', 'AFRICA'), -- Chad
('KM', 'AFRICA'), -- Comoros
('CG', 'AFRICA'), -- Congo
('CD', 'AFRICA'), -- Congo (Democratic Republic)
('DJ', 'AFRICA'), -- Djibouti
('EG', 'AFRICA'), -- Egypt
('GQ', 'AFRICA'), -- Equatorial Guinea
('ER', 'AFRICA'), -- Eritrea
('SZ', 'AFRICA'), -- Eswatini
('ET', 'AFRICA'), -- Ethiopia
('GA', 'AFRICA'), -- Gabon
('GM', 'AFRICA'), -- Gambia
('GH', 'AFRICA'), -- Ghana
('GN', 'AFRICA'), -- Guinea
('GW', 'AFRICA'), -- Guinea-Bissau
('KE', 'AFRICA'), -- Kenya
('LS', 'AFRICA'), -- Lesotho
('LR', 'AFRICA'), -- Liberia
('LY', 'AFRICA'), -- Libya
('MG', 'AFRICA'), -- Madagascar
('MW', 'AFRICA'), -- Malawi
('ML', 'AFRICA'), -- Mali
('MR', 'AFRICA'), -- Mauritania
('MU', 'AFRICA'), -- Mauritius
('MA', 'AFRICA'), -- Morocco
('MZ', 'AFRICA'), -- Mozambique
('NA', 'AFRICA'), -- Namibia
('NE', 'AFRICA'), -- Niger
('NG', 'AFRICA'), -- Nigeria
('RW', 'AFRICA'), -- Rwanda
('ST', 'AFRICA'), -- Sao Tome and Principe
('SN', 'AFRICA'), -- Senegal
('SC', 'AFRICA'), -- Seychelles
('SL', 'AFRICA'), -- Sierra Leone
('SO', 'AFRICA'), -- Somalia
('ZA', 'AFRICA'), -- South Africa
('SS', 'AFRICA'), -- South Sudan
('SD', 'AFRICA'), -- Sudan
('TZ', 'AFRICA'), -- Tanzania
('TG', 'AFRICA'), -- Togo
('TN', 'AFRICA'), -- Tunisia
('UG', 'AFRICA'), -- Uganda
('ZM', 'AFRICA'), -- Zambia
('ZW', 'AFRICA'), -- Zimbabwe

-- ASIA (49 países)
('AF', 'ASIA'), -- Afghanistan
('AM', 'ASIA'), -- Armenia
('AZ', 'ASIA'), -- Azerbaijan
('BH', 'ASIA'), -- Bahrain
('BD', 'ASIA'), -- Bangladesh
('BT', 'ASIA'), -- Bhutan
('BN', 'ASIA'), -- Brunei
('KH', 'ASIA'), -- Cambodia
('CN', 'ASIA'), -- China
('CY', 'ASIA'), -- Cyprus
('GE', 'ASIA'), -- Georgia
('IN', 'ASIA'), -- India
('ID', 'ASIA'), -- Indonesia
('IR', 'ASIA'), -- Iran
('IQ', 'ASIA'), -- Iraq
('IL', 'ASIA'), -- Israel
('JP', 'ASIA'), -- Japan
('JO', 'ASIA'), -- Jordan
('KZ', 'ASIA'), -- Kazakhstan
('KP', 'ASIA'), -- North Korea
('KR', 'ASIA'), -- South Korea
('KW', 'ASIA'), -- Kuwait
('KG', 'ASIA'), -- Kyrgyzstan
('LA', 'ASIA'), -- Laos
('LB', 'ASIA'), -- Lebanon
('MY', 'ASIA'), -- Malaysia
('MV', 'ASIA'), -- Maldives
('MN', 'ASIA'), -- Mongolia
('MM', 'ASIA'), -- Myanmar
('NP', 'ASIA'), -- Nepal
('OM', 'ASIA'), -- Oman
('PK', 'ASIA'), -- Pakistan
('PH', 'ASIA'), -- Philippines
('QA', 'ASIA'), -- Qatar
('SA', 'ASIA'), -- Saudi Arabia
('SG', 'ASIA'), -- Singapore
('LK', 'ASIA'), -- Sri Lanka
('SY', 'ASIA'), -- Syria
('TW', 'ASIA'), -- Taiwan
('TJ', 'ASIA'), -- Tajikistan
('TH', 'ASIA'), -- Thailand
('TL', 'ASIA'), -- Timor-Leste
('TR', 'ASIA'), -- Turkey
('TM', 'ASIA'), -- Turkmenistan
('AE', 'ASIA'), -- United Arab Emirates
('UZ', 'ASIA'), -- Uzbekistan
('VN', 'ASIA'), -- Vietnam
('YE', 'ASIA'), -- Yemen
('HK', 'ASIA'), -- Hong Kong

-- EUROPE (45 países)
('AL', 'EUROPE'), -- Albania
('AD', 'EUROPE'), -- Andorra
('AT', 'EUROPE'), -- Austria
('BY', 'EUROPE'), -- Belarus
('BE', 'EUROPE'), -- Belgium
('BA', 'EUROPE'), -- Bosnia and Herzegovina
('BG', 'EUROPE'), -- Bulgaria
('HR', 'EUROPE'), -- Croatia
('CZ', 'EUROPE'), -- Czech Republic
('DK', 'EUROPE'), -- Denmark
('EE', 'EUROPE'), -- Estonia
('FI', 'EUROPE'), -- Finland
('FR', 'EUROPE'), -- France
('DE', 'EUROPE'), -- Germany
('GR', 'EUROPE'), -- Greece
('GL', 'EUROPE'), -- Greenland
('HU', 'EUROPE'), -- Hungary
('IS', 'EUROPE'), -- Iceland
('IE', 'EUROPE'), -- Ireland
('IT', 'EUROPE'), -- Italy
('LV', 'EUROPE'), -- Latvia
('LI', 'EUROPE'), -- Liechtenstein
('LT', 'EUROPE'), -- Lithuania
('LU', 'EUROPE'), -- Luxembourg
('MT', 'EUROPE'), -- Malta
('MD', 'EUROPE'), -- Moldova
('MC', 'EUROPE'), -- Monaco
('ME', 'EUROPE'), -- Montenegro
('MK', 'EUROPE'), -- North Macedonia
('NL', 'EUROPE'), -- Netherlands
('NO', 'EUROPE'), -- Norway
('PL', 'EUROPE'), -- Poland
('PT', 'EUROPE'), -- Portugal
('RO', 'EUROPE'), -- Romania
('RU', 'EUROPE'), -- Russia
('SM', 'EUROPE'), -- San Marino
('RS', 'EUROPE'), -- Serbia
('SK', 'EUROPE'), -- Slovakia
('SI', 'EUROPE'), -- Slovenia
('ES', 'EUROPE'), -- Spain
('SE', 'EUROPE'), -- Sweden
('CH', 'EUROPE'), -- Switzerland
('UA', 'EUROPE'), -- Ukraine
('GB', 'EUROPE'), -- United Kingdom
('VA', 'EUROPE'), -- Vatican City

-- NORTH_AMERICA (23 países)
('BS', 'NORTH_AMERICA'), -- Bahamas
('BB', 'NORTH_AMERICA'), -- Barbados
('BZ', 'NORTH_AMERICA'), -- Belize
('CA', 'NORTH_AMERICA'), -- Canada
('CR', 'NORTH_AMERICA'), -- Costa Rica
('CU', 'NORTH_AMERICA'), -- Cuba
('DM', 'NORTH_AMERICA'), -- Dominica
('DO', 'NORTH_AMERICA'), -- Dominican Republic
('SV', 'NORTH_AMERICA'), -- El Salvador
('GD', 'NORTH_AMERICA'), -- Grenada
('GT', 'NORTH_AMERICA'), -- Guatemala
('HT', 'NORTH_AMERICA'), -- Haiti
('HN', 'NORTH_AMERICA'), -- Honduras
('JM', 'NORTH_AMERICA'), -- Jamaica
('MX', 'NORTH_AMERICA'), -- Mexico
('NI', 'NORTH_AMERICA'), -- Nicaragua
('PA', 'NORTH_AMERICA'), -- Panama
('KN', 'NORTH_AMERICA'), -- Saint Kitts and Nevis
('LC', 'NORTH_AMERICA'), -- Saint Lucia
('VC', 'NORTH_AMERICA'), -- Saint Vincent and the Grenadines
('TT', 'NORTH_AMERICA'), -- Trinidad and Tobago
('US', 'NORTH_AMERICA'), -- United States

-- SOUTH_AMERICA (12 países)
('AR', 'SOUTH_AMERICA'), -- Argentina
('BO', 'SOUTH_AMERICA'), -- Bolivia
('BR', 'SOUTH_AMERICA'), -- Brazil
('CL', 'SOUTH_AMERICA'), -- Chile
('CO', 'SOUTH_AMERICA'), -- Colombia
('EC', 'SOUTH_AMERICA'), -- Ecuador
('GY', 'SOUTH_AMERICA'), -- Guyana
('PY', 'SOUTH_AMERICA'), -- Paraguay
('PE', 'SOUTH_AMERICA'), -- Peru
('SR', 'SOUTH_AMERICA'), -- Suriname
('UY', 'SOUTH_AMERICA'), -- Uruguay
('VE', 'SOUTH_AMERICA'), -- Venezuela

-- OCEANIA (14 países)
('AU', 'OCEANIA'), -- Australia
('FJ', 'OCEANIA'), -- Fiji
('KI', 'OCEANIA'), -- Kiribati
('MH', 'OCEANIA'), -- Marshall Islands
('FM', 'OCEANIA'), -- Micronesia
('NR', 'OCEANIA'), -- Nauru
('NZ', 'OCEANIA'), -- New Zealand
('PW', 'OCEANIA'), -- Palau
('PG', 'OCEANIA'), -- Papua New Guinea
('WS', 'OCEANIA'), -- Samoa
('SB', 'OCEANIA'), -- Solomon Islands
('TO', 'OCEANIA'), -- Tonga
('TV', 'OCEANIA'), -- Tuvalu
('VU', 'OCEANIA'); -- Vanuatu
-- End of V3__insert_countries.sql