(() => {

  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const materialLoader = document.querySelector('#material-loader');
  const materialError = document.querySelector('#material-error');
  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/materials"

  //functions
  function loadInfoBoxes() {

    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    .then(infoBoxes => {
      console.log(infoBoxes);

      infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index + 1}`);

      const titleElement = document.createElement('h2');
      titleElement.textContent = infoBox.heading;

      const textElement = document.createElement('p');
      textElement.textContent = infoBox.description;

      selected.appendChild(titleElement);
      selected.appendChild(textElement);
    });
    })
    .catch(error => {
      //make a meaningful error message and post to DOM
      console.log(error);
    });

   
  }
  loadInfoBoxes();

  function loadMaterialInfo() {

    //Add loader in HTML, write code to show it here
    startLoading();

    //make AJAX Call here
    fetch("https://swiftpixel.com/earbud/api/materials")
      .then(function (response) {
        return response.json();
      })
      .then(function (materials) {
        materials.forEach(function (material) {

          const clone = materialTemplate.content.cloneNode(true);

          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(".material-description");

          materialDescription.textContent = material.description;

          materialList.appendChild(clone);

        });

        stopLoading();
      })

      .catch(function (error) {
        handleMaterialError(error);
      });

      

     //this is the api url https://swiftpixel.com/earbud/api/materials"

  }

  function startLoading() {
    materialLoader.style.display = "block";
    materialError.hidden = true;
    materialError.textContent = "";
  }

  function stopLoading() {
    materialLoader.style.display = "none";
  }

  function handleMaterialError(error) {
    console.log(error);
    stopLoading();
    materialError.hidden = false;
    materialError.textContent = "Error loading materials. Please try again later..."
  }

  loadMaterialInfo();


  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

