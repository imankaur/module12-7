let api_key='bujPhndNRqoU8ciylRfXIKdg59yarR7O6sqOsrWT';


function callParksApi(stateSelected,numResults){
  fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${stateSelected}&limit=${numResults-1}&api_key=bujPhndNRqoU8ciylRfXIKdg59yarR7O6sqOsrWT`)
  .then(results =>
    results.json())
  .then(newResults =>
    displayResults(newResults)
  )
  .catch(error => console.log(error))
}

function loadDropDown(allStates){
  console.log(allStates);
  $('.select-dropdown').empty();
  for(let i = 0; i < allStates.data.length; i++){
    let states = allStates.data[i].states;
    console.log(states);

    $('.select-dropdown').append(
      `
      <option class="dropdown-style" value="${states}">
        ${states}
      </option>
      `
      );
  }
  $(".select-dropdown").removeClass("hidden");
}

function submitButton(){
  $('.form').submit(event => {
    event.preventDefault();
    let stateSelected = $('.state-selected').val();
    console.log(stateSelected);
    let numResults = $('input[type=number]').val();
    callParksApi(stateSelected, numResults);
  })
}

function displayResults(newResults){
  console.log(newResults);
  $('.form').hide();
  $('.results').empty();
  for (let i = 0; i < newResults.data.length; i++){
    let parkName = newResults.data[i].fullName;
    console.log(parkName);

    let parkDescription = newResults.data[i].description;
    console.log(parkDescription);

    let parkWebsite = newResults.data[i].url;
    console.log(parkWebsite);

    $('.results').append(
      `
      <h2>${parkName}</h2>
      <p>${parkDescription}</p>
      <div class="link">
      <a href="${parkWebsite}" target="_blank">Visit Website</a>
      </div>
      `
    );
  }
}

function init() {

	submitButton();
}

$(init);
