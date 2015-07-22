$(function() {


// APPENDING THE PAURIS ONTO THE PAGE
var paurisController = {

paurisTemplate: _.template($('#paurisTemplate').html()),

    all: function() {
      console.log("calling all");
      $.get('/pauris', function(data) {
        var allPauris = data;
        _.each(allPauris, function(pauris) {
          //append the pauris so they appear on the page
          var $paurisHtml = $(paurisController.paurisTemplate(pauris));
          // console.log($paurisHtml);
          $('#paurisList').append($paurisHtml); 
          // console.log(allPauris);
        });
      });
    }
  };

  paurisController.all();


// APPENDING THE THOUGHTS ONTO THE PAGE
var thoughtsController = {

  thoughtsTemplate: _.template($('#thoughtsTemplate').html()),

  all: function() {
      // console.log("calling all");
      $.get('/thoughts', function(data) {
        var allThoughts = data;
        _.each(allThoughts, function(thoughts) {
          //append the thoughts so they appear on the page
          var $thoughtsHTML = $(thoughtsController.thoughtsTemplate(thoughts));
          // console.log($thoughtsHTML);
          $('#listOfThoughts').append($thoughtsHTML); 
          // console.log(allThoughts);
        });
        thoughtsController.addEventHandlers();
      });
    },

  create: function(newThought) {
      var thoughtData = {thoughtText: newThought};
      console.log(thoughtData);
    // this is creating a a request to the server to create a new thought 
    $.post('/thoughts', thoughtData, function(data) {
      //passing through the thoughtTemplate to show the thought on the page
      var $thoughtsHTML = $(thoughtsController.thoughtsTemplate(data));
      $('#listOfThoughts').append($thoughtsHTML); 
    });
  },

    // UPDATE FUNCTION // DOES NOT WORK //
  update: function (thoughtId, updatedThought) {
    console.log('hello');
    $.ajax({
      type: 'PUT',
      url: '/thoughts/' + thoughtId,
      data: {
        thoughtText: $(this).find('.updatedComment').val()
      },
      success: function(data) {
        var $thoughtsHTML = $(thoughtsController.thoughtsTemplate(data));
        console.log($thoughtsHTML);
        $('#thought-' + thoughtId).replaceWith($thoughtsHTML);
      }
    });
  },

  delete: function (thoughtId) {
    //sending a request to the server to delete the thought
    $.ajax ({
      type: 'DELETE',
      url: '/thoughts/' + thoughtId,
      success: function(data) {
        $('#thought-' + thoughtId).remove();
      } 
    });
  },

  //my req.params.id is undefined so it won't read event handlers

  addEventHandlers: function() {
    // $('#thoughtsTemplate')
      // for update: submit event on `.updatedThought` form
      $('#listOfThoughts').on('submit', '.updatedComment', function(event) {
        event.preventDefault();
        var thoughtId = $(this).closest('.thought').attr('.data-id');
        var updatedThought = $(this).find('.updatedComment').val();
        thoughtsController.update(thoughtId, updatedThought);
      })
      // for delete on the .deleteComment button
      $('#listOfThoughts').on('click', '.deleteComment', function(event) {
        event.preventDefault();
        var thoughtId = $(this).closest('.thought').attr('.data-id');
        thoughtsController.delete(thoughtId);
      });
    },

    setupView: function() {
    //existing thoughts onto the page 
    thoughtsController.all()

    $('#submitThought').on('submit', function(event) {
      event.preventDefault();
      var thoughtText = $('#thoughtText').val();
      console.log(thoughtText);
      thoughtsController.create(thoughtText);
    });
  }



// CLOSES THE THOUGHTSCONTROLLER
}

thoughtsController.setupView()


//CLOSES THE WHOLE FUNCTION
});




