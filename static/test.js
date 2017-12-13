axios.get('/breeds')
  .then(function (response) {
    console.log(response);
    var breeds = response.data.message;
    var breedHtml = breeds.map(function(breed) {
      return "<li>" + breed + "</li>";
    });
    $("body").append("<ul class='breeds'>" + breedHtml.join("") + "</ul>");
  })
  .catch(function (error) {
    console.log(error);
  });

  axios.get('/breeds')
  .then(function (response) {
    console.log(response);
    var breeds = response.data.message;
    var breedHtml = breeds.map(function(breed) {
      return "<option value='" + breed + "'>" + breed + "</option>";
    });
    $("form").append("<select name='selected'>" + breedHtml.join("") + "</select>");
  })
  .catch(function (error) {
    console.log(error);
  });