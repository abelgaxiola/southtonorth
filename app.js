(function () {
    'use strict';

    var FlashCards = angular.module('FlashCards', []);

    FlashCards.controller('CitizenshipController', function ($scope, $http) {
        var index, numberOfCards, card, cards, englishCards, spanishCards;

        index = 0;
        numberOfCards = 0;

        $http.get('data/EnglishCards.js').then(function (response) {
            englishCards = response.data;
            cards = englishCards;
            numberOfCards = cards.length;
            card = cards[index];
            $scope.title = 'Citizenship Flashcards';
            $scope.answerButton = 'Answer';
            $scope.questionButton = 'Question';
            $scope.nextButton = 'Next';
            $scope.removeButton = 'Remove';
            $scope.question = card.Question;
            $scope.language = "Espanol";
            $scope.questionNumber = $scope.questionButton + ' #' + card.Id;
        });

        $http.get('data/SpanishCards.js').then(function (response) {
            spanishCards = response.data;
        });

        function clearAnswers() {
            $scope.answers = null;
            $scope.answersMany = false;
            $scope.answers = null;
            $scope.answersCol1 = null;
            $scope.answersCol2 = null;
            $scope.answersCol3 = null;
        }
        $scope.getQuestion = function () {
            clearAnswers();
            $scope.question = card.Question;
            $scope.questionNumber = $scope.questionButton + ' #' + card.Id;
        };
        $scope.getAnswers = function () {
            $scope.question = null;
            $scope.answers = card.Answers;
            if (card.Answers.length > 7) {
                $scope.answersMany = true;
                $scope.answers = null;
                $scope.answersCol1 = card.Answers.slice(0, 7);
                $scope.answersCol2 = card.Answers.slice(7, card.Answers.length);
                if (card.Answers.length > 14) {
                    $scope.answersCol2 = card.Answers.slice(7, 14);
                    $scope.answersCol3 = card.Answers.slice(14, card.Answers.length);
                }
            }
        };
        $scope.getNext = function () {
            clearAnswers();

            index += 1;
            if (index === numberOfCards) {
                index = 0;
            }
            card = cards[index];
            $scope.question = card.Question;
            $scope.questionNumber = $scope.questionButton + ' #' + card.Id;
        };
        $scope.getPrev = function () {
            clearAnswers();

            index -= 1;
            if (index === -1) {
                index = numberOfCards - 1;
            }
            card = cards[index];
            $scope.question = card.Question;
            $scope.questionNumber = $scope.questionButton + ' #' + card.Id;
        };
        $scope.getLanguage = function () {
            clearAnswers();
            if ($scope.language === "English") {
                $scope.language = "Espanol";
                cards = englishCards;
                $scope.title = 'Citizenship Flashcards';
                $scope.answerButton = 'Answer';
                $scope.questionButton = 'Question';
                $scope.nextButton = 'Next';
                $scope.removeButton = 'Remove';
                $scope.questionNumber = $scope.questionButton + ' #' + card.Id;
            } else {
                cards = spanishCards;
                $scope.language = "English";
                $scope.title = 'Preguntas de Ciudadania';
                $scope.answerButton = 'Respuesta';
                $scope.questionButton = 'Pregunta';
                $scope.nextButton = 'Sigui';
                $scope.removeButton = 'Quitar';
                $scope.questionNumber = $scope.questionButton + ' #' + card.Id;
            }
            card = cards[index];
            $scope.question = card.Question;
        };
        $scope.skip = function () {
            englishCards.splice(index, 1);
            spanishCards.splice(index, 1);
            index -= 1;
            numberOfCards -= 1;
            $scope.getNext();
        };
    });
}());