(function() {
  var load_chart;

  load_chart = function() {
    $("body").removeClass("loaded");
    return setTimeout(function() {
      return $("body").addClass("loaded");
    }, 500);
  };

  $(".js-do-it-again").on("click", function() {
    return load_chart();
  });

  load_chart();

}).call(this);