function getUser(url){
    if(!$('.results').hasClass('hidden')){
        $('.results').addClass('hidden');
    }

    fetch(url)
    .then(response => response.json())
    .then(responseJson => 
      showUser(responseJson))
    .catch(error => alert("That wasn't supposed to happen. Try again."));  
}

function showUser(responseJson) {   
    let repoList = '';
    // Displays an error if the breed isn't found.
    if(responseJson.message === "Not Found"){
        $('.noUser').removeClass('hidden');
    } else {
        for(let i=0; i<responseJson.length; i++){
            repoList += `<h3>${responseJson[i].name}</h3>
                        <p>${responseJson[i].html_url}</p>`
        }

      // Replaces the existing HTML with image
      $('.results-img').replaceWith(
        `<div class="results-img">
            ${repoList}
            </div>
        `
      )
      // Unhides the image
      $('.results').removeClass('hidden');

      
    }
  }

function formEvent() {  
    $('#userForm').submit(event => {
      event.preventDefault();
      let userURL = 'https://api.github.com/users/' + $( "#gitUser" ).val().toLowerCase() + '/repos';
      if(!$('.noUser').hasClass('hidden')){
          $('.noUser').addClass('hidden');
      }
      getUser(userURL);
    });
  }

$(function() {
    console.log('Loaded');
    formEvent();
  });