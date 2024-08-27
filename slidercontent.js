class slidercontent {
    constructor(imagelocation, date, discription, tags) {
        this.imagelocation = imagelocation;
        this.date = date;
        this.discription = discription;
        this.tags = tags;
    }
    makeslideentry() {
        //image
        this.image = document.createElement("img");
        this.image.setAttribute("src", this.imagelocation);
        this.image.setAttribute("class", "slideimage");
        document.getElementById("SlideContainer").appendChild(this.image);

        //information
        this.infocontainer = document.createElement("div");
        this.infocontainer.setAttribute("class", "infocontainer");
        document.getElementById("projectinformation").appendChild(this.infocontainer);

        this.Date = document.createElement("p")
        this.Date.innerHTML = "Date: " + this.date;
        this.Date.setAttribute("class", "slideinformation");
        this.Date.setAttribute("class", "slidedate")
        this.infocontainer.appendChild(this.Date);

        this.Discription = document.createElement("p")
        this.Discription.innerHTML = "Discription: " + this.discription;
        this.Discription.setAttribute("class", "slideinformation");
        this.Discription.setAttribute("class", "slidediscription")
        this.infocontainer.appendChild(this.Discription);

        //adding tags as class
        for (let tag in this.tags) {
            if (this.tags[tag] != null) {
                this.image.classList.add(this.tags[tag]);
                this.infocontainer.classList.add(this.tags[tag]);
            }
        }


        showSlides(0, 1);
    }

}

//VARIABLEN

const slides = [];

var slideindex = 0;

//slide loading slidecontent
//json laden

function getjson() {

    fetch("Content/Slidercontent/images.json")
        .then(res => {
            return res.json();
        })
        .then(data => {
            for (let index = 0; index < data.images.length; index++) {
                slides.push(new slidercontent(data.images[index].imagelocation, data.images[index].Date, data.images[index].Discription, data.images[index].tags));
                slides[slides.length - 1].makeslideentry();
            }
        })
        .catch(error => console.log(error));
}

//prev next button function
function plusSlides(n) {
    showSlides(slideindex += n, n);
}
//erstellen des Sliders    
function showSlides(n, r) {

    const curentfilters = document.getElementById("Filtertags").querySelectorAll("input");
    //console.log(curentfilters);
    if (n > slides.length - 1) { n = 0; }
    if (n < 0) { n = slides.length - 1; }
    for (let index = 0; index < slides.length; index++) {
        slides[index].image.style.display = "none";
        slides[index].infocontainer.style.display = "none";
    }
    outerLoop:
    for (let j = 0; j < slides.length; j++) {
        for (let i = 0; i < curentfilters.length; i++) {
            if (curentfilters[i].checked == true && slides[n].image.classList.contains(curentfilters[i].value)) {
                    //console.log(curentfilters[i].value);
                    //display Sliedes
                    slides[n].image.style.display = "flex";
                    slides[n].infocontainer.style.display = "block";
                    slideindex = n;
                    break outerLoop;
            } else if(i == curentfilters.length - 1 && r > 0){
                n++;
                if (n > slides.length - 1) { n = 0; }
            } else if(i == curentfilters.length - 1 && r < 0){
                n--;
                if (n < 0) { n = slides.length - 1; }
            }
        }
    }
}

//check if at least one filter is checked
function checkCheckboxes(clickedCheckbox) {
    var checkboxes = document.getElementById("Filtertags").querySelectorAll("input");
    
    var checkedCount = 0;
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            checkedCount++;
        }
    });

    if (checkedCount == 0 && !clickedCheckbox.checked) {
        alert("At least one filter must be checked.");
        clickedCheckbox.checked = true;
    }
    showSlides(0, 1);
}


//Upload Lightbox
function openLightbox() {
    document.getElementById("upload").style.display = "block";
}

function closeLightbox() {
    document.getElementById("upload").style.display = "none";
}

//choose if what content to upload
