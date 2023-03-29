// définition des variables requises
//var date = new Date();
var date = new Date;
//var date = document.getElementById("inputDate");
var listArray = [];
var userInput = document.querySelector(".inputField input");
var userDescription = document.getElementById("inputDescription");
var addBtn = document.querySelector(".inputField button");
var todoList = document.querySelector(".todoList");
var deleteAllBtn = document.querySelector(".boxFooter button");


//Affichage de la date et l'heure
/* var getDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
var getTime = date.getHours() + ':' + (date.getMinutes());
var dateTime = getDate + ' à ' + getTime;
 */

//document.getElementsByClassName('date').innerHTML = date;
//cnsole.log(date);
//console.log(date.toLocaleDateString('fr-FR'));

function init() { //Pour le Btn1 est tojours le choix premiere.
    document.inputField.inputTask.focus();
}

// activation d'événement ONKEYUP (Déclenche lorsque qu'une touche du clavier qui a été pressée est relâchée.)
userInput.onkeyup = () => {
    var userEnteredValue = userInput.value; //obtention de la valeur saisie par l'utilisateur
    if (userEnteredValue.trim() != 0) { //si la valeur utilisateur n'est pas que des espaces
        addBtn.classList.add("active"); //activer le bouton d'ajout
    } else {
        addBtn.classList.remove("active"); //inactif le bouton d'ajout
    }
}

showTasks(); //appel de la fonction showTask (Afficher les taches)

addBtn.onclick = () => { //l'utilisateur clique sur le bouton <+>.
    //var date = userInput.value;
    var userEnteredValue = userInput.value; //obtention de la valeur du champ de saisie.
    var description = userDescription.value;
    var toDo = [];
    var ok = 1;
    toDo.push(userEnteredValue, description);
    var getLocalStorageData = localStorage.getItem("task"); //obtenir le local storage.
    if (getLocalStorageData == null) { //si le local storage ne contient aucune donnée
        listArray = []; //créer un tableau vide.
    } else {
        listArray = JSON.parse(getLocalStorageData); //transformer une json str en un objet js
        listArray.forEach(element => {
            if (element[0] == userEnteredValue) {
                ok = 0;
            }
        });
    }
    if (ok == 1) {
        listArray.push(toDo); //ajout d'une nouvelle valeur dans le tableau
        localStorage.setItem("task", JSON.stringify(listArray));
        showTasks(); //appel de la fonction showTask
        addBtn.classList.remove("active");

    } else {
        alert("Votre tâche existe déjà.");
    }
}

//Fonction d'affichage
function showTasks() {
    var getLocalStorageData = localStorage.getItem("task");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    var pendingTasksNumb = document.querySelector(".pendingTasksCounter");
    pendingTasksNumb.textContent = listArray.length;
    if (listArray.length > 0) { //si la longueur du tableau est supérieure à 0
        deleteAllBtn.classList.add("active"); //activer le bouton de suppression.
    } else {
        deleteAllBtn.classList.remove("active");
    }
    var newLiTag = "";
    todoList.innerHTML = newLiTag;
    listArray.forEach((element, index) => {

        newLiTag += '<li><p style=color:green><b>' + (element[0].toUpperCase()) + ' :<i style=color:brown> ' + date.toLocaleDateString("fr-FR") + '</i> </b><span class="icon" onclick="deleteTask(' + index + ')"><i class="fas fa-trash"></i> </span></p> ';
        //}); // elements task et des seperement a l'affichage.******
        //todoList.innerHTML = newLiTag; //ajout d'une nouvelle balise <li> à dans de la balise <ul>.

        //Affichage description
        //var newLiTag1 = "";
        //listArray.forEach((element, index) => {
        newLiTag += '<p>' + (element[1]) + '</p></li > ';

    });
    todoList.innerHTML = newLiTag;
    //date.value = "";
    userInput.value = "";
    userDescription.value = "";
    //une fois la tâche ajoutée, laissez le champ vide.
    //items.push({ value: item, time: (new Date()).toLocaleDateString("fr-FR"), });
}



// fonction de suppression
function deleteTask(index) {
    var getLocalStorageData = localStorage.getItem("task");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1); //suppression le <li>.
    localStorage.setItem("task", JSON.stringify(listArray));
    showTasks(); //appel de la fonction showTask pour afficher les taches restant.
}

// fonction <supprime tout>
deleteAllBtn.onclick = () => {
    listArray = []; //vider le tableau
    localStorage.setItem("task", JSON.stringify(listArray));
    showTasks(); //appel de la fonction showTask pour afficher les lignes vide.
}



/* ------------------------RANDOM IMAGES----------------------------- */

window.onload = init;
var b = [];
document.body.style.backgroundImage = "url(https://picsum.photos/1920/1080)"; //Random image sur BG a l'onload


function init() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://picsum.photos/list", true);
    xhr.send(null);
    xhr.onload = function() {
        if (xhr.status == 200) {
            var picsum = JSON.parse(xhr.responseText)
            console.log(picsum);
            var imageListe = "";
            var a = 0;
            for (var x = 1; x <= 5; x++) {
                a = Math.floor(Math.random() * 100)
                b.push(a);
                imageListe += "<div class = imgContainer>" +
                    "<img src= 'https://picsum.photos/150/150?image=" + a + "' onclick='javascript: changeBackground(" + x + ")' > ";

            }
            //console.log(imageListe);
            document.getElementById("imgList").innerHTML = imageListe;
        }
    }
}

function changeBackground(index) {
    document.body.style.backgroundImage = 'url("https://picsum.photos/1920/1080?image=' + b[index - 1] + '")';
    //console.log('"https://picsum.photos/1920/1080?image=' + b[index] + '"');
}