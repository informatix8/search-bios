export function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

export function jsonOk (body) {
    var mockResponse = new window.Response(JSON.stringify(body), {
        status: 200,
        headers: {
            'Content-type': 'application/json'
        }
    });

    return Promise.resolve(mockResponse);
}

export function jsonError (status, body) {
    var mockResponse = new window.Response(JSON.stringify(body), {
        status: status,
        headers: {
            'Content-type': 'application/json'
        }
    });

    return Promise.resolve(mockResponse);
}

export const searchResultJson = {
    "meta":
        {
            "limit": 10,
            "offset": 0,
            "count": 1381,
            "length": 10
        },
    "data": [
        {
            "documentNumber": "2019-14722",
            "agencies": "Federal Communications Commission",
            "highlighting":
                {
                    "title": "Open <mark>Commission</mark> Meeting, Wednesday, July 10, 2019",
                    "abstract": ["The <mark>Commission</mark> will consider a Report and Order that would allow for more efficient and effective"]
                },
            "title": "Open Commission Meeting, Wednesday, July 10, 2019",
            "type": ["Notice"],
            "abstract": ["The Commission will consider a Report and Order that would allow for more efficient and effective use of 2.5 GHz spectrum by increasing flexibility for existing Educational Broadband Service licensees and providing new opportunities for rural Tribal Nations and other entities to access unused portions of the band. 2..................... OFFICE OF ECONOMICS & TITLE: Incentive Auction ANALYTICS. of Upper Microwave Flexible Use Service Licenses in the Upper 37 GHz, 39 GHz, and 47 GHz Bands for Next- Generation Wireless Services (AU Docket No. 19-59). SUMMARY: The Commission will consider a Public Notice that would establish application and bidding procedures for Auction 103, the incentive auction of Upper Microwave Flexible Use Service licenses in the Upper 37 GHz, 39 GHz, and 47 GHz bands. 3..................... WIRELINE COMPETITION. TITLE: Promoting Access to Connected Care Services (WC Docket No. 18-213). SUMMARY: The Commission will consider a Notice of Proposed Rulemaking that would propose a Connected Care Pilot providing Universal Service Fund support to health care providers to defray the costs of broadband service to enable low-income patients and veterans to access telehealth services. (WC Docket No. 18-213). 4..................... WIRELINE COMPETITION. TITLE: Improving Competitive Broadband Access to Multiple Tenant Environments (GN Docket No. 17-142; MB Docket No. 17-91) SUMMARY: The Commission will consider a Notice of Proposed Rulemaking and Declaratory Ruling that would take steps to promote facilities-based broadband deployment and competition in apartments, condominiums, office buildings, and other multiple tenant environments. 5..................... WIRELINE COMPETITION. TITLE: Business Data Services in an Internet Protocol Environment; Petition of USTelecom for Forbearance Pursuant to 47 U.S.C. 160(c) to Accelerate Investment in Broadband and Next- Generation Networks (WC Docket Nos. 16-143, 05- 25; GN Docket No. 13-5; RM-10593; WC Docket No. 18-141). SUMMARY: The Commission will consider (1) a Report and Order on Remand that would grant price cap carriers relief from ex ante pricing regulation of their lower speed Time Division Multiplexing transport business data services nationwide; and (2) a Memorandum Opinion and Order that would partially grant USTelecom's request for forbearance from DS1 and DS3 transport unbundling obligations for price cap carriers. 6..................... MEDIA................ TITLE: Modernizing Children's Television Programming Rules (MB Docket Nos. 18-202, 17- 105). SUMMARY: The Commission will consider (1) a Report and Order that would modernize children's television programming rules and provide broadcasters greater flexibility in meeting their children's programming obligations; and (2) a Further Notice of Proposed Rulemaking that would seek additional comment on special efforts by broadcasters to produce or support Core Programming. 7..................... MEDIA................ TITLE: Electronic Delivery of Carriage Election Notices (MB Docket Nos. 17-317, 17- 105). SUMMARY: The Commission will consider (1) a Report and Order that would modernize the carriage election notice provisions in Part 76 of the FCC's Rules; and (2) a Further Notice of Proposed Rulemaking that would seek comment on applying these new procedures to entities that are not required to maintain online public inspection files. 8..................... MEDIA................ TITLE: Electronic Delivery of Notices to Broadcast Television Stations (MB Docket Nos. 19-165, 17-105). SUMMARY: The Commission will consider a Notice of Proposed Rulemaking that would propose to modernize certain cable and satellite television provider notice provisions in Part 76 of the FCC's Rules by requiring certain notices to be delivered to broadcasters by email. ------------------------------------------------------------------------"],
            "pdf": ["https://www.govinfo.gov/content/pkg/FR-2019-07-11/pdf/2019-14722.pdf"],
            "excerpts": ["The Commission will consider a Report and Order that would allow for more efficient and effective use of 2.5 GHz spectrum by increasing flexibility for existing Educational Broadband Service licensees and providing new opportunities for rural Tribal..."],
            "id": "58a7ae15-157e-427c-bb76-9192a6f15ce0"
        },
        {
            "documentNumber": "2019-14722",
            "agencies": "Federal Communications Commission",
            "highlighting":
                {
                    "title": "Open <mark>Commission</mark> Meeting, Wednesday, July 10, 2019",
                    "abstract": ["The <mark>Commission</mark> will consider a Report and Order that would allow for more efficient and effective"]
                },
            "title": "Open Commission Meeting, Wednesday, July 10, 2019",
            "type": ["Notice"],
            "abstract": ["The Commission will consider a Report and Order that would allow for more efficient and effective use of 2.5 GHz spectrum by increasing flexibility for existing Educational Broadband Service licensees and providing new opportunities for rural Tribal Nations and other entities to access unused portions of the band. 2..................... OFFICE OF ECONOMICS & TITLE: Incentive Auction ANALYTICS. of Upper Microwave Flexible Use Service Licenses in the Upper 37 GHz, 39 GHz, and 47 GHz Bands for Next- Generation Wireless Services (AU Docket No. 19-59). SUMMARY: The Commission will consider a Public Notice that would establish application and bidding procedures for Auction 103, the incentive auction of Upper Microwave Flexible Use Service licenses in the Upper 37 GHz, 39 GHz, and 47 GHz bands. 3..................... WIRELINE COMPETITION. TITLE: Promoting Access to Connected Care Services (WC Docket No. 18-213). SUMMARY: The Commission will consider a Notice of Proposed Rulemaking that would propose a Connected Care Pilot providing Universal Service Fund support to health care providers to defray the costs of broadband service to enable low-income patients and veterans to access telehealth services. (WC Docket No. 18-213). 4..................... WIRELINE COMPETITION. TITLE: Improving Competitive Broadband Access to Multiple Tenant Environments (GN Docket No. 17-142; MB Docket No. 17-91) SUMMARY: The Commission will consider a Notice of Proposed Rulemaking and Declaratory Ruling that would take steps to promote facilities-based broadband deployment and competition in apartments, condominiums, office buildings, and other multiple tenant environments. 5..................... WIRELINE COMPETITION. TITLE: Business Data Services in an Internet Protocol Environment; Petition of USTelecom for Forbearance Pursuant to 47 U.S.C. 160(c) to Accelerate Investment in Broadband and Next- Generation Networks (WC Docket Nos. 16-143, 05- 25; GN Docket No. 13-5; RM-10593; WC Docket No. 18-141). SUMMARY: The Commission will consider (1) a Report and Order on Remand that would grant price cap carriers relief from ex ante pricing regulation of their lower speed Time Division Multiplexing transport business data services nationwide; and (2) a Memorandum Opinion and Order that would partially grant USTelecom's request for forbearance from DS1 and DS3 transport unbundling obligations for price cap carriers. 6..................... MEDIA................ TITLE: Modernizing Children's Television Programming Rules (MB Docket Nos. 18-202, 17- 105). SUMMARY: The Commission will consider (1) a Report and Order that would modernize children's television programming rules and provide broadcasters greater flexibility in meeting their children's programming obligations; and (2) a Further Notice of Proposed Rulemaking that would seek additional comment on special efforts by broadcasters to produce or support Core Programming. 7..................... MEDIA................ TITLE: Electronic Delivery of Carriage Election Notices (MB Docket Nos. 17-317, 17- 105). SUMMARY: The Commission will consider (1) a Report and Order that would modernize the carriage election notice provisions in Part 76 of the FCC's Rules; and (2) a Further Notice of Proposed Rulemaking that would seek comment on applying these new procedures to entities that are not required to maintain online public inspection files. 8..................... MEDIA................ TITLE: Electronic Delivery of Notices to Broadcast Television Stations (MB Docket Nos. 19-165, 17-105). SUMMARY: The Commission will consider a Notice of Proposed Rulemaking that would propose to modernize certain cable and satellite television provider notice provisions in Part 76 of the FCC's Rules by requiring certain notices to be delivered to broadcasters by email. ------------------------------------------------------------------------"],
            "pdf": ["https://www.govinfo.gov/content/pkg/FR-2019-07-11/pdf/2019-14722.pdf"],
            "excerpts": ["The Commission will consider a Report and Order that would allow for more efficient and effective use of 2.5 GHz spectrum by increasing flexibility for existing Educational Broadband Service licensees and providing new opportunities for rural Tribal..."],
            "id": "7284852b-2f02-4850-adad-011a11a4d33c"
        },
        {
            "documentNumber": "2019-14722",
            "agencies": "Federal Communications Commission",
            "highlighting":
                {
                    "title": "Open <mark>Commission</mark> Meeting, Wednesday, July 10, 2019",
                    "abstract": ["The <mark>Commission</mark> will consider a Report and Order that would allow for more efficient and effective"]
                },
            "title": "Open Commission Meeting, Wednesday, July 10, 2019",
            "type": ["Notice"],
            "abstract": ["The Commission will consider a Report and Order that would allow for more efficient and effective use of 2.5 GHz spectrum by increasing flexibility for existing Educational Broadband Service licensees and providing new opportunities for rural Tribal Nations and other entities to access unused portions of the band. 2..................... OFFICE OF ECONOMICS & TITLE: Incentive Auction ANALYTICS. of Upper Microwave Flexible Use Service Licenses in the Upper 37 GHz, 39 GHz, and 47 GHz Bands for Next- Generation Wireless Services (AU Docket No. 19-59). SUMMARY: The Commission will consider a Public Notice that would establish application and bidding procedures for Auction 103, the incentive auction of Upper Microwave Flexible Use Service licenses in the Upper 37 GHz, 39 GHz, and 47 GHz bands. 3..................... WIRELINE COMPETITION. TITLE: Promoting Access to Connected Care Services (WC Docket No. 18-213). SUMMARY: The Commission will consider a Notice of Proposed Rulemaking that would propose a Connected Care Pilot providing Universal Service Fund support to health care providers to defray the costs of broadband service to enable low-income patients and veterans to access telehealth services. (WC Docket No. 18-213). 4..................... WIRELINE COMPETITION. TITLE: Improving Competitive Broadband Access to Multiple Tenant Environments (GN Docket No. 17-142; MB Docket No. 17-91) SUMMARY: The Commission will consider a Notice of Proposed Rulemaking and Declaratory Ruling that would take steps to promote facilities-based broadband deployment and competition in apartments, condominiums, office buildings, and other multiple tenant environments. 5..................... WIRELINE COMPETITION. TITLE: Business Data Services in an Internet Protocol Environment; Petition of USTelecom for Forbearance Pursuant to 47 U.S.C. 160(c) to Accelerate Investment in Broadband and Next- Generation Networks (WC Docket Nos. 16-143, 05- 25; GN Docket No. 13-5; RM-10593; WC Docket No. 18-141). SUMMARY: The Commission will consider (1) a Report and Order on Remand that would grant price cap carriers relief from ex ante pricing regulation of their lower speed Time Division Multiplexing transport business data services nationwide; and (2) a Memorandum Opinion and Order that would partially grant USTelecom's request for forbearance from DS1 and DS3 transport unbundling obligations for price cap carriers. 6..................... MEDIA................ TITLE: Modernizing Children's Television Programming Rules (MB Docket Nos. 18-202, 17- 105). SUMMARY: The Commission will consider (1) a Report and Order that would modernize children's television programming rules and provide broadcasters greater flexibility in meeting their children's programming obligations; and (2) a Further Notice of Proposed Rulemaking that would seek additional comment on special efforts by broadcasters to produce or support Core Programming. 7..................... MEDIA................ TITLE: Electronic Delivery of Carriage Election Notices (MB Docket Nos. 17-317, 17- 105). SUMMARY: The Commission will consider (1) a Report and Order that would modernize the carriage election notice provisions in Part 76 of the FCC's Rules; and (2) a Further Notice of Proposed Rulemaking that would seek comment on applying these new procedures to entities that are not required to maintain online public inspection files. 8..................... MEDIA................ TITLE: Electronic Delivery of Notices to Broadcast Television Stations (MB Docket Nos. 19-165, 17-105). SUMMARY: The Commission will consider a Notice of Proposed Rulemaking that would propose to modernize certain cable and satellite television provider notice provisions in Part 76 of the FCC's Rules by requiring certain notices to be delivered to broadcasters by email. ------------------------------------------------------------------------"],
            "pdf": ["https://www.govinfo.gov/content/pkg/FR-2019-07-11/pdf/2019-14722.pdf"],
            "excerpts": ["The Commission will consider a Report and Order that would allow for more efficient and effective use of 2.5 GHz spectrum by increasing flexibility for existing Educational Broadband Service licensees and providing new opportunities for rural Tribal..."],
            "id": "3b154868-59c6-47f6-ae14-5d349c4bb357"
        },
        {
            "documentNumber": "2019-14722",
            "agencies": "Federal Communications Commission",
            "highlighting":
                {
                    "title": "Open <mark>Commission</mark> Meeting, Wednesday, July 10, 2019",
                    "abstract": ["The <mark>Commission</mark> will consider a Report and Order that would allow for more efficient and effective"]
                },
            "title": "Open Commission Meeting, Wednesday, July 10, 2019",
            "type": ["Notice"],
            "abstract": ["The Commission will consider a Report and Order that would allow for more efficient and effective use of 2.5 GHz spectrum by increasing flexibility for existing Educational Broadband Service licensees and providing new opportunities for rural Tribal Nations and other entities to access unused portions of the band. 2..................... OFFICE OF ECONOMICS & TITLE: Incentive Auction ANALYTICS. of Upper Microwave Flexible Use Service Licenses in the Upper 37 GHz, 39 GHz, and 47 GHz Bands for Next- Generation Wireless Services (AU Docket No. 19-59). SUMMARY: The Commission will consider a Public Notice that would establish application and bidding procedures for Auction 103, the incentive auction of Upper Microwave Flexible Use Service licenses in the Upper 37 GHz, 39 GHz, and 47 GHz bands. 3..................... WIRELINE COMPETITION. TITLE: Promoting Access to Connected Care Services (WC Docket No. 18-213). SUMMARY: The Commission will consider a Notice of Proposed Rulemaking that would propose a Connected Care Pilot providing Universal Service Fund support to health care providers to defray the costs of broadband service to enable low-income patients and veterans to access telehealth services. (WC Docket No. 18-213). 4..................... WIRELINE COMPETITION. TITLE: Improving Competitive Broadband Access to Multiple Tenant Environments (GN Docket No. 17-142; MB Docket No. 17-91) SUMMARY: The Commission will consider a Notice of Proposed Rulemaking and Declaratory Ruling that would take steps to promote facilities-based broadband deployment and competition in apartments, condominiums, office buildings, and other multiple tenant environments. 5..................... WIRELINE COMPETITION. TITLE: Business Data Services in an Internet Protocol Environment; Petition of USTelecom for Forbearance Pursuant to 47 U.S.C. 160(c) to Accelerate Investment in Broadband and Next- Generation Networks (WC Docket Nos. 16-143, 05- 25; GN Docket No. 13-5; RM-10593; WC Docket No. 18-141). SUMMARY: The Commission will consider (1) a Report and Order on Remand that would grant price cap carriers relief from ex ante pricing regulation of their lower speed Time Division Multiplexing transport business data services nationwide; and (2) a Memorandum Opinion and Order that would partially grant USTelecom's request for forbearance from DS1 and DS3 transport unbundling obligations for price cap carriers. 6..................... MEDIA................ TITLE: Modernizing Children's Television Programming Rules (MB Docket Nos. 18-202, 17- 105). SUMMARY: The Commission will consider (1) a Report and Order that would modernize children's television programming rules and provide broadcasters greater flexibility in meeting their children's programming obligations; and (2) a Further Notice of Proposed Rulemaking that would seek additional comment on special efforts by broadcasters to produce or support Core Programming. 7..................... MEDIA................ TITLE: Electronic Delivery of Carriage Election Notices (MB Docket Nos. 17-317, 17- 105). SUMMARY: The Commission will consider (1) a Report and Order that would modernize the carriage election notice provisions in Part 76 of the FCC's Rules; and (2) a Further Notice of Proposed Rulemaking that would seek comment on applying these new procedures to entities that are not required to maintain online public inspection files. 8..................... MEDIA................ TITLE: Electronic Delivery of Notices to Broadcast Television Stations (MB Docket Nos. 19-165, 17-105). SUMMARY: The Commission will consider a Notice of Proposed Rulemaking that would propose to modernize certain cable and satellite television provider notice provisions in Part 76 of the FCC's Rules by requiring certain notices to be delivered to broadcasters by email. ------------------------------------------------------------------------"],
            "pdf": ["https://www.govinfo.gov/content/pkg/FR-2019-07-11/pdf/2019-14722.pdf"],
            "excerpts": ["The Commission will consider a Report and Order that would allow for more efficient and effective use of 2.5 GHz spectrum by increasing flexibility for existing Educational Broadband Service licensees and providing new opportunities for rural Tribal..."],
            "id": "9da2b32a-edf6-43da-9ab9-7e248181d0c7"
        },
        {
            "documentNumber": "2019-14722",
            "agencies": "Federal Communications Commission",
            "highlighting":
                {
                    "title": "Open <mark>Commission</mark> Meeting, Wednesday, July 10, 2019",
                    "abstract": ["The <mark>Commission</mark> will consider a Report and Order that would allow for more efficient and effective"]
                },
            "title": "Open Commission Meeting, Wednesday, July 10, 2019",
            "type": ["Notice"],
            "abstract": ["The Commission will consider a Report and Order that would allow for more efficient and effective use of 2.5 GHz spectrum by increasing flexibility for existing Educational Broadband Service licensees and providing new opportunities for rural Tribal Nations and other entities to access unused portions of the band. 2..................... OFFICE OF ECONOMICS & TITLE: Incentive Auction ANALYTICS. of Upper Microwave Flexible Use Service Licenses in the Upper 37 GHz, 39 GHz, and 47 GHz Bands for Next- Generation Wireless Services (AU Docket No. 19-59). SUMMARY: The Commission will consider a Public Notice that would establish application and bidding procedures for Auction 103, the incentive auction of Upper Microwave Flexible Use Service licenses in the Upper 37 GHz, 39 GHz, and 47 GHz bands. 3..................... WIRELINE COMPETITION. TITLE: Promoting Access to Connected Care Services (WC Docket No. 18-213). SUMMARY: The Commission will consider a Notice of Proposed Rulemaking that would propose a Connected Care Pilot providing Universal Service Fund support to health care providers to defray the costs of broadband service to enable low-income patients and veterans to access telehealth services. (WC Docket No. 18-213). 4..................... WIRELINE COMPETITION. TITLE: Improving Competitive Broadband Access to Multiple Tenant Environments (GN Docket No. 17-142; MB Docket No. 17-91) SUMMARY: The Commission will consider a Notice of Proposed Rulemaking and Declaratory Ruling that would take steps to promote facilities-based broadband deployment and competition in apartments, condominiums, office buildings, and other multiple tenant environments. 5..................... WIRELINE COMPETITION. TITLE: Business Data Services in an Internet Protocol Environment; Petition of USTelecom for Forbearance Pursuant to 47 U.S.C. 160(c) to Accelerate Investment in Broadband and Next- Generation Networks (WC Docket Nos. 16-143, 05- 25; GN Docket No. 13-5; RM-10593; WC Docket No. 18-141). SUMMARY: The Commission will consider (1) a Report and Order on Remand that would grant price cap carriers relief from ex ante pricing regulation of their lower speed Time Division Multiplexing transport business data services nationwide; and (2) a Memorandum Opinion and Order that would partially grant USTelecom's request for forbearance from DS1 and DS3 transport unbundling obligations for price cap carriers. 6..................... MEDIA................ TITLE: Modernizing Children's Television Programming Rules (MB Docket Nos. 18-202, 17- 105). SUMMARY: The Commission will consider (1) a Report and Order that would modernize children's television programming rules and provide broadcasters greater flexibility in meeting their children's programming obligations; and (2) a Further Notice of Proposed Rulemaking that would seek additional comment on special efforts by broadcasters to produce or support Core Programming. 7..................... MEDIA................ TITLE: Electronic Delivery of Carriage Election Notices (MB Docket Nos. 17-317, 17- 105). SUMMARY: The Commission will consider (1) a Report and Order that would modernize the carriage election notice provisions in Part 76 of the FCC's Rules; and (2) a Further Notice of Proposed Rulemaking that would seek comment on applying these new procedures to entities that are not required to maintain online public inspection files. 8..................... MEDIA................ TITLE: Electronic Delivery of Notices to Broadcast Television Stations (MB Docket Nos. 19-165, 17-105). SUMMARY: The Commission will consider a Notice of Proposed Rulemaking that would propose to modernize certain cable and satellite television provider notice provisions in Part 76 of the FCC's Rules by requiring certain notices to be delivered to broadcasters by email. ------------------------------------------------------------------------"],
            "pdf": ["https://www.govinfo.gov/content/pkg/FR-2019-07-11/pdf/2019-14722.pdf"],
            "excerpts": ["The Commission will consider a Report and Order that would allow for more efficient and effective use of 2.5 GHz spectrum by increasing flexibility for existing Educational Broadband Service licensees and providing new opportunities for rural Tribal..."],
            "id": "770dff55-589f-4363-895e-52ec024b9cf4"
        },
        {
            "documentNumber": "2019-14722",
            "agencies": "Federal Communications Commission",
            "highlighting":
                {
                    "title": "Open <mark>Commission</mark> Meeting, Wednesday, July 10, 2019",
                    "abstract": ["The <mark>Commission</mark> will consider a Report and Order that would allow for more efficient and effective"]
                },
            "title": "Open Commission Meeting, Wednesday, July 10, 2019",
            "type": ["Notice"],
            "abstract": ["The Commission will consider a Report and Order that would allow for more efficient and effective use of 2.5 GHz spectrum by increasing flexibility for existing Educational Broadband Service licensees and providing new opportunities for rural Tribal Nations and other entities to access unused portions of the band. 2..................... OFFICE OF ECONOMICS & TITLE: Incentive Auction ANALYTICS. of Upper Microwave Flexible Use Service Licenses in the Upper 37 GHz, 39 GHz, and 47 GHz Bands for Next- Generation Wireless Services (AU Docket No. 19-59). SUMMARY: The Commission will consider a Public Notice that would establish application and bidding procedures for Auction 103, the incentive auction of Upper Microwave Flexible Use Service licenses in the Upper 37 GHz, 39 GHz, and 47 GHz bands. 3..................... WIRELINE COMPETITION. TITLE: Promoting Access to Connected Care Services (WC Docket No. 18-213). SUMMARY: The Commission will consider a Notice of Proposed Rulemaking that would propose a Connected Care Pilot providing Universal Service Fund support to health care providers to defray the costs of broadband service to enable low-income patients and veterans to access telehealth services. (WC Docket No. 18-213). 4..................... WIRELINE COMPETITION. TITLE: Improving Competitive Broadband Access to Multiple Tenant Environments (GN Docket No. 17-142; MB Docket No. 17-91) SUMMARY: The Commission will consider a Notice of Proposed Rulemaking and Declaratory Ruling that would take steps to promote facilities-based broadband deployment and competition in apartments, condominiums, office buildings, and other multiple tenant environments. 5..................... WIRELINE COMPETITION. TITLE: Business Data Services in an Internet Protocol Environment; Petition of USTelecom for Forbearance Pursuant to 47 U.S.C. 160(c) to Accelerate Investment in Broadband and Next- Generation Networks (WC Docket Nos. 16-143, 05- 25; GN Docket No. 13-5; RM-10593; WC Docket No. 18-141). SUMMARY: The Commission will consider (1) a Report and Order on Remand that would grant price cap carriers relief from ex ante pricing regulation of their lower speed Time Division Multiplexing transport business data services nationwide; and (2) a Memorandum Opinion and Order that would partially grant USTelecom's request for forbearance from DS1 and DS3 transport unbundling obligations for price cap carriers. 6..................... MEDIA................ TITLE: Modernizing Children's Television Programming Rules (MB Docket Nos. 18-202, 17- 105). SUMMARY: The Commission will consider (1) a Report and Order that would modernize children's television programming rules and provide broadcasters greater flexibility in meeting their children's programming obligations; and (2) a Further Notice of Proposed Rulemaking that would seek additional comment on special efforts by broadcasters to produce or support Core Programming. 7..................... MEDIA................ TITLE: Electronic Delivery of Carriage Election Notices (MB Docket Nos. 17-317, 17- 105). SUMMARY: The Commission will consider (1) a Report and Order that would modernize the carriage election notice provisions in Part 76 of the FCC's Rules; and (2) a Further Notice of Proposed Rulemaking that would seek comment on applying these new procedures to entities that are not required to maintain online public inspection files. 8..................... MEDIA................ TITLE: Electronic Delivery of Notices to Broadcast Television Stations (MB Docket Nos. 19-165, 17-105). SUMMARY: The Commission will consider a Notice of Proposed Rulemaking that would propose to modernize certain cable and satellite television provider notice provisions in Part 76 of the FCC's Rules by requiring certain notices to be delivered to broadcasters by email. ------------------------------------------------------------------------"],
            "pdf": ["https://www.govinfo.gov/content/pkg/FR-2019-07-11/pdf/2019-14722.pdf"],
            "excerpts": ["The Commission will consider a Report and Order that would allow for more efficient and effective use of 2.5 GHz spectrum by increasing flexibility for existing Educational Broadband Service licensees and providing new opportunities for rural Tribal..."],
            "id": "4d7e149b-3410-4bd4-9a96-fbceff255c4b"
        },
        {
            "documentNumber": "2019-14722",
            "agencies": "Federal Communications Commission",
            "highlighting":
                {
                    "title": "Open <mark>Commission</mark> Meeting, Wednesday, July 10, 2019",
                    "abstract": ["The <mark>Commission</mark> will consider a Report and Order that would allow for more efficient and effective"]
                },
            "title": "Open Commission Meeting, Wednesday, July 10, 2019",
            "type": ["Notice"],
            "abstract": ["The Commission will consider a Report and Order that would allow for more efficient and effective use of 2.5 GHz spectrum by increasing flexibility for existing Educational Broadband Service licensees and providing new opportunities for rural Tribal Nations and other entities to access unused portions of the band. 2..................... OFFICE OF ECONOMICS & TITLE: Incentive Auction ANALYTICS. of Upper Microwave Flexible Use Service Licenses in the Upper 37 GHz, 39 GHz, and 47 GHz Bands for Next- Generation Wireless Services (AU Docket No. 19-59). SUMMARY: The Commission will consider a Public Notice that would establish application and bidding procedures for Auction 103, the incentive auction of Upper Microwave Flexible Use Service licenses in the Upper 37 GHz, 39 GHz, and 47 GHz bands. 3..................... WIRELINE COMPETITION. TITLE: Promoting Access to Connected Care Services (WC Docket No. 18-213). SUMMARY: The Commission will consider a Notice of Proposed Rulemaking that would propose a Connected Care Pilot providing Universal Service Fund support to health care providers to defray the costs of broadband service to enable low-income patients and veterans to access telehealth services. (WC Docket No. 18-213). 4..................... WIRELINE COMPETITION. TITLE: Improving Competitive Broadband Access to Multiple Tenant Environments (GN Docket No. 17-142; MB Docket No. 17-91) SUMMARY: The Commission will consider a Notice of Proposed Rulemaking and Declaratory Ruling that would take steps to promote facilities-based broadband deployment and competition in apartments, condominiums, office buildings, and other multiple tenant environments. 5..................... WIRELINE COMPETITION. TITLE: Business Data Services in an Internet Protocol Environment; Petition of USTelecom for Forbearance Pursuant to 47 U.S.C. 160(c) to Accelerate Investment in Broadband and Next- Generation Networks (WC Docket Nos. 16-143, 05- 25; GN Docket No. 13-5; RM-10593; WC Docket No. 18-141). SUMMARY: The Commission will consider (1) a Report and Order on Remand that would grant price cap carriers relief from ex ante pricing regulation of their lower speed Time Division Multiplexing transport business data services nationwide; and (2) a Memorandum Opinion and Order that would partially grant USTelecom's request for forbearance from DS1 and DS3 transport unbundling obligations for price cap carriers. 6..................... MEDIA................ TITLE: Modernizing Children's Television Programming Rules (MB Docket Nos. 18-202, 17- 105). SUMMARY: The Commission will consider (1) a Report and Order that would modernize children's television programming rules and provide broadcasters greater flexibility in meeting their children's programming obligations; and (2) a Further Notice of Proposed Rulemaking that would seek additional comment on special efforts by broadcasters to produce or support Core Programming. 7..................... MEDIA................ TITLE: Electronic Delivery of Carriage Election Notices (MB Docket Nos. 17-317, 17- 105). SUMMARY: The Commission will consider (1) a Report and Order that would modernize the carriage election notice provisions in Part 76 of the FCC's Rules; and (2) a Further Notice of Proposed Rulemaking that would seek comment on applying these new procedures to entities that are not required to maintain online public inspection files. 8..................... MEDIA................ TITLE: Electronic Delivery of Notices to Broadcast Television Stations (MB Docket Nos. 19-165, 17-105). SUMMARY: The Commission will consider a Notice of Proposed Rulemaking that would propose to modernize certain cable and satellite television provider notice provisions in Part 76 of the FCC's Rules by requiring certain notices to be delivered to broadcasters by email. ------------------------------------------------------------------------"],
            "pdf": ["https://www.govinfo.gov/content/pkg/FR-2019-07-11/pdf/2019-14722.pdf"],
            "excerpts": ["The Commission will consider a Report and Order that would allow for more efficient and effective use of 2.5 GHz spectrum by increasing flexibility for existing Educational Broadband Service licensees and providing new opportunities for rural Tribal..."],
            "id": "4ba0af80-97de-4c8a-ae73-aa1c22db1ea5"
        },
        {
            "documentNumber": "2019-15453",
            "agencies": "General Services Administration",
            "highlighting":
                {
                    "title": "Women's Suffrage Centennial <mark>Commission</mark>; Notification of Public Meeting",
                    "abstract": [" Women's Suffrage Centennial <mark>Commission</mark> (<mark>Commission</mark>). The meeting is open to the public."]
                },
            "title": "Women's Suffrage Centennial Commission; Notification of Public Meeting",
            "type": ["Notice"],
            "abstract": ["Meeting notice is being provided according to the requirements of the Federal Advisory Committee Act. This notice provides the schedule and agenda for the August 12, 2019, telephonic meeting of the Women's Suffrage Centennial Commission (Commission). The meeting is open to the public."],
            "pdf": ["https://www.govinfo.gov/content/pkg/FR-2019-07-22/pdf/2019-15453.pdf"],
            "excerpts": ["Meeting notice is being provided according to the requirements of the Federal Advisory Committee Act. This notice provides the schedule and agenda for the August 12, 2019, telephonic meeting of the Women's Suffrage Centennial Commission (Commission)...."],
            "id": "7539ed14-9744-4076-860a-08557d0b5171"
        },
        {
            "documentNumber": "2019-15453",
            "agencies": "General Services Administration",
            "highlighting":
                {
                    "title": "Women's Suffrage Centennial <mark>Commission</mark>; Notification of Public Meeting",
                    "abstract": [" Women's Suffrage Centennial <mark>Commission</mark> (<mark>Commission</mark>). The meeting is open to the public."]
                },
            "title": "Women's Suffrage Centennial Commission; Notification of Public Meeting",
            "type": ["Notice"],
            "abstract": ["Meeting notice is being provided according to the requirements of the Federal Advisory Committee Act. This notice provides the schedule and agenda for the August 12, 2019, telephonic meeting of the Women's Suffrage Centennial Commission (Commission). The meeting is open to the public."],
            "pdf": ["https://www.govinfo.gov/content/pkg/FR-2019-07-22/pdf/2019-15453.pdf"],
            "excerpts": ["Meeting notice is being provided according to the requirements of the Federal Advisory Committee Act. This notice provides the schedule and agenda for the August 12, 2019, telephonic meeting of the Women's Suffrage Centennial Commission (Commission)...."],
            "id": "fe0105cc-6424-4819-b7ea-ba97f4727b0d"
        },
        {
            "documentNumber": "2019-15453",
            "agencies": "General Services Administration",
            "highlighting":
                {
                    "title": "Women's Suffrage Centennial <mark>Commission</mark>; Notification of Public Meeting",
                    "abstract": [" Women's Suffrage Centennial <mark>Commission</mark> (<mark>Commission</mark>). The meeting is open to the public."]
                },
            "title": "Women's Suffrage Centennial Commission; Notification of Public Meeting",
            "type": ["Notice"],
            "abstract": ["Meeting notice is being provided according to the requirements of the Federal Advisory Committee Act. This notice provides the schedule and agenda for the August 12, 2019, telephonic meeting of the Women's Suffrage Centennial Commission (Commission). The meeting is open to the public."],
            "pdf": ["https://www.govinfo.gov/content/pkg/FR-2019-07-22/pdf/2019-15453.pdf"],
            "excerpts": ["Meeting notice is being provided according to the requirements of the Federal Advisory Committee Act. This notice provides the schedule and agenda for the August 12, 2019, telephonic meeting of the Women's Suffrage Centennial Commission (Commission)...."],
            "id": "f5263129-6dd9-4962-b887-4715749361bc"
        }]
};


export const searchSuggestJson = {
    "data": [
        {
            "groupId": "boIE0s",
            "groupName": "title",
            "groupFormattedName": "Title",
            "suggestions": [
                {
                    "term": "<b>Commiss</b>ion Interpretation Regarding Standard of Conduct for Investment Advisers",
                    "weight": 0,
                    "payload": "2019-12208",
                    "suggestionId": "5JZNa6"
                },
                {
                    "term": "<b>Commiss</b>ion Interpretation Regarding the Solely Incidental Prong of the Broker-Dealer Exclusion From the Definition of Investment Adviser",
                    "weight": 0,
                    "payload": "2019-12209",
                    "suggestionId": "XHU9mg"
                },
                {
                    "term": "State of Vermont: NRC Staff Assessment of a Proposed Agreement Between the Nuclear Regulatory <b>Commiss</b>ion and the State of Vermont",
                    "weight": 0,
                    "payload": "2019-13412",
                    "suggestionId": "LOxse0"
                },
                {
                    "term": "Open <b>Commiss</b>ion Meeting, Wednesday, July 10, 2019",
                    "weight": 0,
                    "payload": "2019-14722",
                    "suggestionId": "TRWVCd"
                },
                {
                    "term": "Cornell University; Notice of Application Tendered for Filing With the <b>Commiss</b>ion and Soliciting Additional Study Requests and Establishing Procedural Schedule for Relicensing and a Deadline for Submission of Final Amendments",
                    "weight": 0,
                    "payload": "2019-14735",
                    "suggestionId": "MFXTgw"
                },
                {
                    "term": "Information Collection Requirement Being Reviewed by the Federal Communications <b>Commiss</b>ion",
                    "weight": 0,
                    "payload": "2019-15498",
                    "suggestionId": "8MbdeF"
                },
                {
                    "term": "Vitol Inc. and Federico Corteggiano; Updated Notice of Designation of <b>Commiss</b>ion Staff as Non-Decisional",
                    "weight": 0,
                    "payload": "2019-15579",
                    "suggestionId": "ForQfE"
                },
                {
                    "term": "Certain Color Intraoral Scanners and Related Hardware and Software; Notice of a <b>Commiss</b>ion Determination To Review In-Part the Final Initial Determination; Request for Briefing",
                    "weight": 0,
                    "payload": "2019-15684",
                    "suggestionId": "FT7BET"
                },
                {
                    "term": "Information Collections Requirement Being Reviewed by the Federal Communications <b>Commiss</b>ion Under Delegated Authority",
                    "weight": 0,
                    "payload": "2019-15701",
                    "suggestionId": "0lcQ0z"
                },
                {
                    "term": "Women's Suffrage Centennial <b>Commiss</b>ion; Notification of Public Meeting",
                    "weight": 0,
                    "payload": "2019-15453",
                    "suggestionId": "zK0WSW"
                }]
        },
        {
            "groupId": "fiVpdr",
            "groupName": "agencyName",
            "groupFormattedName": "Agency Name",
            "suggestions": [
                {
                    "term": "Federal Communications <b>Commiss</b>ion",
                    "weight": 0,
                    "payload": "https://www.federalregister.gov/api/v1/agencies/161.json",
                    "suggestionId": "Lh99pQ"
                },
                {
                    "term": "Securities and Exchange <b>Commiss</b>ion",
                    "weight": 0,
                    "payload": "https://www.federalregister.gov/api/v1/agencies/466.json",
                    "suggestionId": "8hmJ5H"
                },
                {
                    "term": "Nuclear Regulatory <b>Commiss</b>ion",
                    "weight": 0,
                    "payload": "https://www.federalregister.gov/api/v1/agencies/383.json",
                    "suggestionId": "Z40hom"
                }]
        }]
};
