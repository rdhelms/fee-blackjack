(function runGame() {

    //Make the game be displayed in the middle of the page
    document.querySelector('html').style.height = "100%";
    document.querySelector('html').style.width = "100%";
    document.querySelector('body').style.height = "100%";
    document.querySelector('body').style.width = "100%";
    document.querySelector('body').style.background = "tan";
    document.querySelector('body').style.display = "flex";
    document.querySelector('body').style.flexDirection = "column";
    document.querySelector('body').style.justifyContent = "center";
    document.querySelector('body').style.alignItems = "center";

    document.querySelector('aside').style.display = "flex";
    document.querySelector('aside').style.justifyContent = "center";
    document.querySelector('aside').style.alignItems = "center";


    //Make a different display box instead of the alert window
    var alertBox = document.createElement('div');
    alertBox.style.height = "100px";
    alertBox.style.width = "300px";
    alertBox.style.background = "white";
    alertBox.style.display = "flex";
    alertBox.style.justifyContent = "center";
    alertBox.style.alignItems = "center";
    alertBox.style.fontSize = "3vw";
    document.body.appendChild(alertBox);

    //Make reset button
    var reset = document.createElement('button');
    reset.innerHTML = "Reset";
    document.body.appendChild(reset);
    reset.addEventListener('click', function() {
      location.reload();
    });


    var display = document.getElementById('cards');
    var cards = ['A', '2', '3', '4', '5', "6", '7', '8', '9', "10", 'J', 'Q', 'K'];

    function hit() {
        var card = Math.floor(Math.random() * cards.length);
        display.innerHTML += ' ' + cards[card];
        checkResult(false, true);
    }

    /**
     * Check the result of the current cards and alert the game result
     *
     * @param  {Boolean} standing  Whether or not the player is standing
     * @param  {Boolean} hitting   Whether or not the player is hitting
     * @return {void}
     */
    function checkResult(standing, hitting) {
        var currentCards = display.innerHTML.split(' ');

        var cardValue = 0;

        currentCards.forEach(function(card) {
            if (parseInt(card) >= 2 && parseInt(card) <= 10) {
                cardValue += parseInt(card);
            } else if (card === 'J' || card == 'Q' || card === 'K') {
                cardValue = cardValue + 10;
            } else if (card === 'A') {
                if ( cardValue <= 10 ) {
                  cardValue += 11;
                } else {
                  cardValue += 1;
                }
            }
        });


        if (cardValue <= 15 && standing) {
            alertBox.innerHTML = 'Dealer wins.';
        } else if (cardValue <= 18 && standing) {
            alertBox.innerHTML = 'Push!';
        } else if (cardValue >= 19 && standing && cardValue <= 21) {
            alertBox.innerHTML = 'You win!';
        } else if(cardValue === 21) {
            alertBox.innerHTML = 'Blackjack!';
        } else if (cardValue > 21) {
            alertBox.innerHTML = 'You Bust.';
        }
    }

    document.getElementById('stand').addEventListener('click', function() {
        checkResult(true, false);
    });

    document.getElementById('hit').addEventListener('click', hit);

    var card1 = Math.floor(Math.random() * cards.length);
    var card2 = Math.floor(Math.random() * cards.length);
    display.innerHTML = cards[card1] + ' ' + cards[card2];
    checkResult();

})();
