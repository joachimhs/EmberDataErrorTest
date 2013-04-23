EDT.IndexRoute = Ember.Route.extend({
    model: function() {
        console.log('calling model()');
        return EDT.AlertModel.find();
    }
});

EDT.IndexController = Ember.ArrayController.extend({
    contentObserver: function() {
        console.log('indexController content: ' + this.get('content'));
        console.log('indexController content: ' + this.get('content.length'));
    }.observes('content.length')
});

Ember.TEMPLATES['index'] = Ember.Handlebars.compile('' +
    '<table border="1">{{#each controller}}' +
    '<tr><td>{{id}}</td><td>{{alertName}}</td><td>{{warningValue}}</td><td>{{criticalValue}}</td></tr>' +
    '{{/each}}' +
    '</table>'
);

EDT.AlertModel = DS.Model.extend({
    alertName: DS.attr('string'),
    warningValue: DS.attr('number'),
    criticalValue: DS.attr('number'),

    becameError: function() {
        //alert('becameError: ' + this.get('stateManager.currentPath'));
        this.get('stateManager').transitionTo('rootState.loaded.updated.uncommitted');
    },

    becameInvalid: function(errors) {
        alert('Record was invalid because: ' + errors);
    }
});
