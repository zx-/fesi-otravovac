/**
 * Created by z on 18.12.2015.
 */

var FESIO = module.exports;

FESIO.portal_pravnych_predpisov = {
    base_url: 'https://lt.justice.gov.sk',
    parse_url: 'https://lt.justice.gov.sk/Public/AllMaterialsList.aspx?instEID=-1&lCategories=1048574&langEID=1'
};

FESIO.nku = {
    base_url: 'https://www.nku.gov.sk',
    parse_url: 'https://www.nku.gov.sk/spravy-o-vysledkoch-kontrol-od-roku-2012'
};

FESIO.uvo = {
    base_url: 'https://www2.uvo.gov.sk',
    parse_url: 'https://www2.uvo.gov.sk/evestnik'
};

FESIO.rokovania = {
    base_url: 'http://www.rokovania.sk',
    parse_url: 'http://www.rokovania.sk/Rokovanie.aspx'
};

FESIO.supremeCourt = {
    base_url:'http://www.supcourt.gov.sk',
    parse_url: 'http://www.supcourt.gov.sk/tlacove-spravy/'
};

FESIO.server = {};