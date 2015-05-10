'use strict';

var transactionsMockModule = function(){

    var mockedTransactions =  {
        "total":2,
        "first":0,
        "columnOutput":{
            "columns":[
                "TRANSACTIONID",
                "CONSUMERSPEND",
                "TRANSACTIONDATETIME",
                "MERCHANTREFERENCE",
                "TRANSACTIONDESCRIPTION",
                "TYPE",
                "TERMINALSTATUS",
                "PAYMENTPRODUCT",
                "REQUESTEDAMOUNT"
            ],
            "data":[
                {
                    "REQUESTEDAMOUNT":{
                        "currency":"EUR",
                        "amount":27.23
                    },
                    "MERCHANTREFERENCE":"ref",
                    "TYPE":"PAYMENT",
                    "TRANSACTIONDATETIME":1430226762650,
                    "TRANSACTIONID":"11417344252",
                    "PAYMENTPRODUCT":"MC_CREDIT",
                    "CONSUMERSPEND":{
                        "currency":"EUR",
                        "amount":27.23
                    },
                    "TERMINALSTATUS":"SUCCESS",
                    "TRANSACTIONDESCRIPTION":"desc"
                },
                {
                    "REQUESTEDAMOUNT":{
                        "currency":"EUR",
                        "amount":1000.0
                    },
                    "MERCHANTREFERENCE":null,
                    "TYPE":"PAYMENT",
                    "TRANSACTIONDATETIME":1430227586775,
                    "TRANSACTIONID":"11417344253",
                    "PAYMENTPRODUCT":"MAESTRO",
                    "CONSUMERSPEND":{
                        "currency":"EUR",
                        "amount":0
                    },
                    "TERMINALSTATUS":"EXPIRED",
                    "TRANSACTIONDESCRIPTION":null
                }
            ]
        }
    };

    angular.module('portalServerMockModule', ['portalClient','ngMockE2E'])
        .run(function ($httpBackend) {

            $httpBackend.whenPOST(/http:\/\/.*\/tqs\/search/).respond(function(){
                return [200, mockedTransactions];
            });

            $httpBackend.whenGET(/.*/).passThrough();
    });
};

module.exports = transactionsMockModule;
