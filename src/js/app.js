
/**
 * Frontend-del av projektet i DT207G
 * Av: Caroline Jungefalk
 */

//hämta id:n
let postCommentBtnEl = document.getElementById("postCommentBtn");

//händelselyssnare
window.addEventListener("load", init);

postCommentBtnEl.addEventListener("click", function (event) {
    event.preventDefault();
    postComments();
})


//init
function init() {

    console.log("Sidan har laddat...")
    getComments();
    getGelato();
};

//Hämta kommentarer
async function getComments() {

    //hämta id
    let commentListEl = document.getElementById("comment-list");

    //Töm innerHTML
    commentListEl.innerHTML = "";
    nameInputErr.innerHTML = "";
    ratingInputErr.innerHTML = "";


    try {

        const response = await fetch(`https://dt207g-proj-backend.onrender.com/api/comment`)
        if (!response.ok) {
            throw new Error("Fel vid anslutning " + response.status)
        };

        //lagra datan
        const data = await response.json();
        console.log(data);

        //Loopa data skriv ut till skärmen med innerHTML
        data.forEach(comment => {

            //formattera datum
            let date = new Date(comment.date);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            if (day < 10) {
                day = "0" + day;
            }

            if (month < 10) {
                month = "0" + month;
            }

            let formattedDate = `${year}-${month}-${day}`

            //skapa article-element och skriv ut till innerHTML
            let newArticleEl = document.createElement("article");
            newArticleEl.classList.add("comment")
            newArticleEl.innerHTML = `<h4>${comment.name}</h4>
            <p>${comment.rating}</p>
            <p>${comment.comment}</p>
            <p>${formattedDate}</p>`

            commentListEl.appendChild(newArticleEl);
        });


    } catch (error) {
        console.log("det uppstod ett fel " + error.message);
    }
};

//Lägg till kommentar
async function postComments() {

    //hämta id:n
    let nameEl = document.getElementById("name");
    let ratingEl = document.getElementById("rating");
    let recensionEl = document.getElementById("recension");
    let nameInputErr = document.getElementById("nameInputErr");
    let ratingInputErr = document.getElementById("ratingInputErr");

    //kontrollera inputfälten
    if (nameEl.value === "") {
        nameInputErr.innerHTML = "Vänligen ange ditt namn";
    };

    if (ratingEl.value === "") {
        ratingInputErr.innerHTML = "Vänligen välj ett betyg"
        return;
    };

    //Lagra värden från input
    let newComment = {
        name: nameEl.value,
        rating: ratingEl.value,
        comment: recensionEl.value
    };

    //postanrop
    try {
        const response = await fetch(`https://dt207g-proj-backend.onrender.com/api/comment`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newComment)
        });
        if (!response.ok) {
            throw new Error("Fel vid anslutning: " + response.status);
        }

        //Töm inputfält
        nameEl.value = "";
        ratingEl.value = "";
        recensionEl.value = "";

        getComments();

    } catch (error) {
        console.error("Det uppstod ett fel: " + error.message);
    };

};

//Ta bort kommentar
async function deleteComments() {

};

//Hämta gelato
async function getGelato() {

    //hämta id
    let menuGelatoEl = document.getElementById("menu-gelato");

    //Get-anrop
    try {
        const response = await fetch(`https://dt207g-proj-backend.onrender.com/api/gelato`)
        if (!response.ok) {
            throw new Error("Fel vid anslutning: " + response.status);
        }

        const data = await response.json();

        data.forEach(gelato => {

            let newArticleEl = document.createElement("article");
            newArticleEl.innerHTML = `
            <h3>${gelato.name}</h3>
            <p>${gelato.ingredients}</p>
            <p>${gelato.info}</p>
            <p>${gelato.price} kr</p>
            `
            menuGelatoEl.appendChild(newArticleEl);

        });

        console.log(data);

    } catch (error) {
        console.error("Det uppstod ett fel: " + error.message);
    }


};

//Lägg till gelato
async function postGelato() {

};

//Uppdatera gelato
async function putGelato() {

};

//Ta bort gelato
async function deleteGelato() {

};

//Hämta topping
async function getTopping() {

};

//Lägg till topping
async function postTopping() {

};

//Ta bort topping
async function deleteTopping() {

};

//Hämta drink
async function getDrink() {

};

//Lägg till drink
async function postDrink() {

};

//Ta bort drink
async function deleteDrink() {

};


