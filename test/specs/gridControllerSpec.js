'use strict';

describe('UnitTest: gridController', function() {
    var GridService, scope, httpBackend, gridController, gridConstants;
    var footerCellTemplate = '<div class="ui-grid-cell-contents"><span>{{col.displayName}}</span></div>';
    var columnNames = ['Date/Time', 'TransactionID', 'Merchant Reference', 'Requested Amount',
        'Consumer Spend', 'Currency', 'Description', 'Transaction Type', 'Status', 'Payment Product'];
    var gridColumnDefs = [
        {field: 'TRANSACTIONDATETIME', displayName: columnNames[0], width: "10%", enableHiding: false, footerCellTemplate: footerCellTemplate, cellFilter: 'date:\'dd/MM/yyyy HH:mm:ss\': \'UTC\''},
        {field: 'TRANSACTIONID', displayName: columnNames[1], width: "10%", enableHiding: false, footerCellTemplate: footerCellTemplate},
        {field: 'MERCHANTREFERENCE', displayName: columnNames[2], width: "10%", enableHiding: false, footerCellTemplate: footerCellTemplate},
        {field: 'REQUESTEDAMOUNT.amount', displayName: columnNames[3], width: "10%", enableHiding: false, footerCellTemplate: footerCellTemplate, cellFilter: 'number:2', cellClass: 'grid-cell-align-right'},
        {field: 'CONSUMERSPEND.amount', displayName: columnNames[4], width: "10%", enableHiding: false,  footerCellTemplate: footerCellTemplate, cellFilter: 'number:2', cellClass: 'grid-cell-align-right'},
        {field: 'CONSUMERSPEND.currency', displayName: columnNames[5], width: "5%", enableHiding: false, footerCellTemplate: footerCellTemplate},
        {field: 'TRANSACTIONDESCRIPTION', displayName: columnNames[6], width: "10%", enableHiding: false, footerCellTemplate: footerCellTemplate},
        {field: 'TYPE', displayName: columnNames[7], width: "10%", enableHiding: false, footerCellTemplate: footerCellTemplate},
        {field: 'TERMINALSTATUS', displayName: columnNames[8], width: "3%", minWidth: 60,  enableHiding: false, footerCellTemplate: footerCellTemplate},
        {field: 'PAYMENTPRODUCT', displayName: columnNames[9], width: "10%", enableHiding: false, footerCellTemplate: footerCellTemplate}
    ];
    var pageSizes = [10, 50, 75];
    var mockedTransactions ={
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
                    "MERCHANTREFERENCE":null,
                    "TYPE":"PAYMENT",
                    "TRANSACTIONDATETIME":1430226762650,
                    "TRANSACTIONID":"11417344252",
                    "PAYMENTPRODUCT":"MC_CREDIT",
                    "CONSUMERSPEND":{
                        "currency":"EUR",
                        "amount":27.23
                    },
                    "TERMINALSTATUS":"SUCCESS",
                    "TRANSACTIONDESCRIPTION":null
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

    var mockedEmptyResponse ={
        "total":0,
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
            "data":[]
        }
    };

    var mockServerResponse = function($q, result){
        spyOn(GridService, 'getRoles').and.callFake(function () {
            var def = $q.defer();
            def.resolve(result);
            return def.promise;
        });
    };

    var instantiateTheController = function($controller){
        gridController =  $controller('GridController', {GridService: GridService});
        scope.$apply();
    };

    beforeEach(function() {
        module('portalClient');
        module('portalClientGrid');
    });

    beforeEach(inject(function($controller, $rootScope, $injector, $q, _GridService_, uiGridConstants) {
        GridService = _GridService_;
        scope = $rootScope;
        gridConstants = uiGridConstants;
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET(/.*\/images\/PP_Logo_CMYK.png/).respond(200, {});
    }));

    /**
     * Compare grid options other than data
     */
    var compareGridOptions = function(){
        expect(gridController.gridOptions.columnDefs).toEqual(gridColumnDefs);
        expect(gridController.gridOptions.enableHorizontalScrollbar).toEqual(gridConstants.scrollbars.NEVER);
        expect(gridController.gridOptions.showColumnFooter).toEqual(true);
        expect(gridController.gridOptions.useExternalPagination).toEqual(true);
        expect(gridController.gridOptions.paginationPageSizes).toEqual(pageSizes);
    };

    /**
     * Load the grid with transactions from server
     */
    it('should load the grid with transactions', inject(function($q, $controller) {

        mockServerResponse($q, mockedTransactions);
        instantiateTheController($controller);

        expect(gridController.gridOptions.data).toEqual(mockedTransactions.columnOutput.data);
        expect(gridController.gridOptions.totalItems).toEqual(mockedTransactions.total);
        compareGridOptions();
    }));

    /**
     * Load the grid without any result from server
     */
    it('should load the grid with no transactions', inject(function($q, $controller) {

        mockServerResponse($q, mockedEmptyResponse);
        instantiateTheController($controller);

        expect(gridController.gridOptions.data).toEqual(mockedEmptyResponse.columnOutput.data);
        expect(gridController.gridOptions.totalItems).toEqual(mockedEmptyResponse.total);
        compareGridOptions();
    }));
});
