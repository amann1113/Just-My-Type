$(document).ready(function(){

    let $upperKeyboard = $('#keyboard-upper-container');
    let $lowerKeyboard = $('#keyboard-lower-container');
    let numOfSentence = 0;
    let numOfLetter = 0;
    let error = 0;
    var startTime;
    let sentences = [
        'ten ate neite ate nee enet ite ate inet ent eate', 
        'Too ato too nOt enot one totA not anot tOO aNot', 
        'oat itain oat tain nate eate tea anne inant nean', 
        'itant eate anot eat nato inate eat anot tain eat', 
        'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    
    
    let currentSentence = sentences[0];
    let currentLetter = currentSentence.charAt(0);
    
      $upperKeyboard.hide();
    
    $(document).keydown(function(e) {
      if (e.which === 16) {
        $($upperKeyboard).show();
        $($lowerKeyboard).hide();
      }
    });
    $(document).keyup(function(e) {
      if (e.which === 16) {
        $($lowerKeyboard).show();
        $($upperKeyboard).hide();
      }
    });
    
    $(document).keypress(function(e) {
      let $key = $("#" + e.which);
      $($key).css("background-color", "yellow");
      $(document).keyup(function(e) {

        $($key).css("background-color", "#f5f5f5");
      });
    });
    
    $('#sentence').text(currentSentence);
    $('#target-letter').text(currentLetter)
    
    $(document).keypress(function(event){
     
      event.preventDefault();
      if(!startTime){
        startTime = e.timeStamp;
      } else if(e.which === currentLetter.charCodeAt(0)){
        $('#feedback').append('<span class="glyphicon glyphicon-ok"></span>');
        
      } else {
        $('#feedback').append('<span class="glyphicon glyphicon-remove"></span>');
        error++;
        
      }
    
      numOfLetter++;
         
      if(numOfLetter === currentSentence.length){
        $('#yellow-block').css('left', '0');
        numOfSentence++;
        currentSentence = sentences[numOfSentence];
        $('#sentence').text(currentSentence);
        
        if(numOfSentence === sentences.length){
          var endTime = event.timeStamp;
          var timeTaken = (endTime - startTime)/ (60* 1000);
                  
          var winPoints = 54 / timeTaken - 2 * error;
            
          $('#feedback').text('your finals score is ' + winPoints + 'words per minute.');
    
          setTimeout(function(){
            if(confirm('would you like to play again?')) {
              numOfSentence = 0;
              numOfLetter = 0;
              currentSentence = sentences[0];
              currentLetter = currentSentence.charAt(0);
              $('#sentence').text(currentSentence);
              $('#target-letter').text(currentLetter);
              $('#feedback').empty();
              startTime = undefined;
            }
          }, 5000);
        } else {
            
          numOfLetter = 0;
          currentLetter = currentSentence.charAt(numOfLetter);
          $('#target-letter').text(currentLetter);
          $('#feedback').empty();
          $('#yellow-block').css('left', '+=17.5');
        }
      } else {
        
        currentLetter = currentSentence.charAt(numOfLetter);
        $('#target-letter').text(currentLetter);
    
        $('#yellow-block').css('left', '+=17.5');
      }
    });
    
    });

