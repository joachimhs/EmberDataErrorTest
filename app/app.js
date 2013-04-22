Ember.ENV.RAISE_ON_DEPRECATION = true;

var EDT = Ember.Application.create({

});

EDT.Router.map(function() {
    this.route("index", {path: "/"});
});

EDT.store = DS.Store.create({
    adapter:  "DS.RESTAdapter",
    revision: 12
});