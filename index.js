var selectedImages = [];
var selectedCards = [];
var cards = [];
$("button").click(function(){
    // generating grid 12 or 24 cards
    generateGrid(Number(this.id));
  
});
// generating grid by adding cards with number, image, 
// and status(1 for active and 0 for disabled)
function generateGrid(length){
    for (let i=0; i<length;i++){
        $(".row").append('<div class="card" id="'+i+'"></div>');
        cards.push({number: i, image: i%6 , status: 1})
    }
    // randomly sorting the cards
cards.sort(()=> 0.5-Math.random()); 
        $("button").addClass("hidden");
       
}

$(".row").on('click', '.card', function(){
    // checking if card is not disabled means already found match
    //  or not the same card clicked twiced
    if (cards[this.id].status==1 && this.id != selectedCards[0] ){
        selectedImages.push(cards[this.id].image);
        selectedCards.push(this.id);
        $(this).css('background-image','url(images/'+cards[this.id].image+'.jpg)');
        // checking if two cards selected are a match or no
    if(selectedImages.length==2){
        // match found
    if (checkMatch()){

        $("#"+selectedCards[0]).addClass('match');
        $("#"+selectedCards[1]).addClass('match');
        cards[selectedCards[0]].status = 0;
        cards[selectedCards[1]].status = 0;
        selectedCards=[];
        selectedImages=[]; 
    }else  // match not found, flip the cards back
        {setTimeout(() => {
            $("#"+selectedCards[0]).css('background-image', 'url(images/card-design.jpg)');
            $("#"+selectedCards[1]).css('background-image', 'url(images/card-design.jpg)');
            selectedImages=[];
            selectedCards=[];
        }, 500);

    }
}
// Checking if all matches are found
if (win()){
    location.reload();
    return false;
}

}
});
// Function checking if selected cards match
function checkMatch(){
if (selectedImages[0]==selectedImages[1]){
    return true;
}
else return false;
}
// function checking if all possible match are found
function win(){
    if ((cards.filter(function(value){
        return value.status>0;
     })).length==0)
     return true;
     else return false;
}