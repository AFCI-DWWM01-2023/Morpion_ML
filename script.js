// Variable pour stocker le joueur actuel (commence par "X")
var currentPlayer = "X";
// Récupère toutes les cellules du plateau de jeu
var cells = document.getElementsByClassName("cell");
// Variable pour indiquer si le jeu est terminé ou non
var gameOver = false;
// Élément de sélection de mode de jeu (Joueur contre Joueur ou Joueur contre Ordinateur)
var modeSelection = document.getElementById("mode-selection");
// Le mode sélectionné par défaut est "friend" (Joueur contre Joueur)
var selectedMode = "friend";

// Écouteur d'événement pour le changement de mode de jeu
modeSelection.addEventListener("change", function(event) {
  // Met à jour le mode sélectionné
  selectedMode = event.target.value;
  // Réinitialise le plateau de jeu pour commencer une nouvelle partie
  resetBoard();
});

// Fonction pour placer un marqueur (X ou O) dans une cellule
function placeMarker(cellIndex) {
  // Vérifie si le jeu n'est pas terminé et si la cellule est vide
  if (!gameOver && cells[cellIndex].innerHTML === "") {
    // Place le marqueur du joueur actuel dans la cellule
    cells[cellIndex].innerHTML = currentPlayer;
    // Ajoute une classe pour le style (classe "X" ou "O" en fonction du joueur actuel)
    cells[cellIndex].classList.add(currentPlayer);

    // Vérifie si le joueur actuel a gagné
    if (checkWin(currentPlayer)) {
      // Indique que le jeu est terminé
      gameOver = true;
      // Affiche une pop-up avec le message de victoire en fonction du mode de jeu
      if (selectedMode === "friend") {
        showPopup("Le joueur " + currentPlayer + " a gagné !");
      } else {
        if (currentPlayer === "X") {
          showPopup("Vous avez gagné !");
        } else {
          showPopup("L'ordinateur a gagné !");
        }
      }
    } else if (checkDraw()) {
      // Vérifie s'il y a match nul
      // Indique que le jeu est terminé
      gameOver = true;
      // Affiche une pop-up avec le message de match nul
      showPopup("Match nul !");
    } else {
      // Passe au joueur suivant (alterne entre "X" et "O")
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      // Si c'est le tour de l'ordinateur dans le mode Joueur contre Ordinateur
      if (selectedMode === "computer" && currentPlayer === "O") {
        // Ajoute un délai avant le mouvement de l'ordinateur pour une meilleure expérience utilisateur
        setTimeout(computerMove, 500);
      }
    }
  }
}

// Fonction pour le mouvement de l'ordinateur (mode Joueur contre Ordinateur)
function computerMove() {
  // Vérifie si le jeu n'est pas terminé et si le mode est Joueur contre Ordinateur
  if (!gameOver && selectedMode === "computer") {
    // Tableau pour stocker les indices des cellules disponibles
    var availableMoves = [];
    // Parcourt toutes les cellules pour trouver celles qui sont vides
    for (var i = 0; i < cells.length; i++) {
      // Vérifie si la cellule est vide
      if (cells[i].innerHTML === "") {
        // Ajoute l'indice de la cellule au tableau des mouvements disponibles
        availableMoves.push(i);
      }
    }

    // Vérifie s'il y a des mouvements disponibles
    if (availableMoves.length > 0) {
      // Sélectionne un indice aléatoire parmi les mouvements disponibles
      var randomIndex = Math.floor(Math.random() * availableMoves.length);
      // Obtient le mouvement sélectionné
      var move = availableMoves[randomIndex];
      // Place le marqueur de l'ordinateur dans la cellule sélectionnée
      cells[move].innerHTML = currentPlayer;
      // Ajoute une classe pour le style (classe "X" ou "O" en fonction du joueur actuel)
      cells[move].classList.add(currentPlayer);

      // Vérifie si l'ordinateur a gagné après son mouvement
      if (checkWin(currentPlayer)) {
        // Indique que le jeu est terminé
        gameOver = true;
        // Affiche une pop-up avec le message de victoire pour l'ordinateur
        showPopup("L'ordinateur a gagné !");
      } else if (checkDraw()) {
        // Vérifie s'il y a match nul après le mouvement de l'ordinateur
        // Indique que le jeu est terminé
        gameOver = true;
        // Affiche une pop-up avec le message de match nul
        showPopup("Match nul !");
      }

      // Passe au joueur suivant (alterne entre "X" et "O")
      currentPlayer = "X";
    }
  }
}

// Fonction pour vérifier si un joueur a gagné en vérifiant toutes les combinaisons gagnantes possibles
function checkWin(player) {
  var winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // lignes
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colonnes
    [0, 4, 8], [2, 4, 6] // diagonales
  ];

  // Parcourt toutes les combinaisons gagnantes possibles
  for (var i = 0; i < winningCombinations.length; i++) {
    var combo = winningCombinations[i];
    // Vérifie si les cellules aux indices spécifiés dans la combinaison contiennent toutes le marqueur du joueur actuel
    if (
      cells[combo[0]].innerHTML === player &&
      cells[combo[1]].innerHTML === player &&
      cells[combo[2]].innerHTML === player
    ) {
      // Retourne true si le joueur a gagné
      return true;
    }
  }

  // Retourne false si le joueur n'a pas gagné
  return false;
}

// Fonction pour vérifier s'il y a match nul (toutes les cellules sont remplies)
function checkDraw() {
  // Parcourt toutes les cellules
  for (var i = 0; i < cells.length; i++) {
    // Vérifie s'il y a encore des cellules vides
    if (cells[i].innerHTML === "") {
      // Retourne false s'il y a au moins une cellule vide
      return false;
    }
  }
  // Retourne true s'il n'y a plus de cellules vides (match nul)
  return true;
}

// Fonction pour réinitialiser le plateau de jeu et commencer une nouvelle partie
function resetBoard() {
  // Parcourt toutes les cellules
  for (var i = 0; i < cells.length; i++) {
    // Efface le contenu des cellules
    cells[i].innerHTML = "";
    // Supprime les classes "X" et "O" pour le style
    cells[i].classList.remove("X", "O");
  }
  // Réinitialise le joueur actuel à "X"
  currentPlayer = "X";
  // Réinitialise le statut du jeu à non terminé
  gameOver = false;
}

// Fonction pour afficher une pop-up avec un message personnalisé
function showPopup(message) {
  // Crée un élément div pour la pop-up
  var popup = document.createElement("div");
  popup.className = "popup";

  // Crée un élément paragraphe pour afficher le message dans la pop-up
  var messageElement = document.createElement("p");
  messageElement.textContent = message;
  popup.appendChild(messageElement);

  // Crée un élément span pour représenter la croix de fermeture de la pop-up
  var closeIcon = document.createElement("span");
  closeIcon.innerHTML = "&#x2716;"; // Utilise le code Unicode pour afficher le symbole "X"
  closeIcon.className = "close";
  closeIcon.addEventListener("click", function() {
    // Ajoute un écouteur d'événement au clic sur la croix pour fermer la pop-up
    // Supprime la pop-up du document lorsque la croix est cliquée
    document.body.removeChild(popup);
    // Réinitialise le plateau de jeu pour commencer une nouvelle partie
    resetBoard();
  });
  // Ajoute la croix à la pop-up
  popup.appendChild(closeIcon);

  // Ajoute la pop-up au corps du document
  document.body.appendChild(popup);
}

// Ajoute des écouteurs d'événement pour les événements de survol du bouton "Réinitialiser"
myButton.addEventListener("mouseover", function() {
  myButton.style.background = "linear-gradient(to right, yellow, green)";
});

myButton.addEventListener("mouseout", function() {
  myButton.style.background = "";
});
