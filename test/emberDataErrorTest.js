var testController;

module("EDT.EmberDataTest", {
    setup: function() {
        console.log('Ember Data Test Setup');
        //EDT.server.autoRespond = true;
        EDT.server.respondWith("GET", "/alert_models", [200, { "Content-Type": "text/json" },
                 '{"alert_models":[{"id":"new_alert","alert_name": "New Alert","warning_value": 123,"critical_value": 150}]}'
                 ]);

        EDT.server.respondWith("PUT", "/alert_models/new_alert", [500, {}, ""]);

        Ember.run(function() {
            testController = EDT.__container__.lookup("controller:index");

        });
    },

    teardown: function() {
        //EDT.server.restore();
        //delete EDT.server.server;
    }
});

var testCallbacks = {
    verifyOneModel: function() {
        testController.get('content').removeObserver('length', testCallbacks, 'verifyOneModel');
        strictEqual(1, testController.get('content.length'), "Expecting exactly one alert-record");

        var alert = testController.get('content').objectAt(0);
        alert.set('warningValue', 130);
        EDT.store.commit();

        console.log('Responding to PUT');
        EDT.server.respond();

        strictEqual(alert.get('warningValue'), 130, "Expecting a value of 130 after the failed commit");
        strictEqual(alert.get('stateManager.currentPath'), 'rootState.loaded.updated.uncommitted', "Expecting the record to be reset to uncommitted after the failed commit");

        QUnit.start();
    }
};

asyncTest("Create a new Record, Then Update with 500 ERROR", 4, function() {
    ok(testController, "Expecting a non-null testController");
    //QUnit.start();
    testController.get('content').addObserver('length', testCallbacks, 'verifyOneModel');

    console.log('Responding to GET (IndexRoutes model hook)');
    EDT.server.respond();



    /*
    alertAdminController.set('newAlertName', 'New Alert');
    alertAdminController.createNewAlert();*/
    
});