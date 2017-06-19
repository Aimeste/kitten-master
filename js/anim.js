$(document).ready(function(){
    
    // Owl Carousel
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        responsive:{
            0:{
                items:1
            }
        }
    });
    
    $(".owl-nav").hide();
    
    // Jquery Validation
    
    $("#enter-form").validate({
        rules: {
            name: "required",
            description: "required",
            email: {
                required: true,
                email: true
            },
            pic: {
                required: true,
                url: true
            }
        },
        messages: {
            name: "Please enter your name",
            description: "Please enter your description",
            email: "Please enter a valid email address",
            pic: "Please enter a valid url"
        }
    });
    
    // Smooth Scroll
    
    $('.smooth').click(function(){
        
        var $lienAttribut = $(this).attr("href");
        
        if($lienAttribut == "#"){
            var $duration = $(this).data("duration");
            $('html, body').animate( 
                { 
                    scrollTop: $("body").offset().top
                }, $duration );
            return false;
        }
        else{
            $('html, body').animate( 
                { 
                    scrollTop: $($lienAttribut).offset().top - 50
                }, "slow" );
            return false;
        }
    });
    
    // Animation au Scroll
    $(document).scroll(function () {
        var scrollTop = $(document).scrollTop();

        $(".content-section").each(function(){
            if(scrollTop > $(this).offset().top - 100){
                $(this).find("div[data-content-type='text']").fadeIn("2000");
                $(this).find("div[data-content-type='image']").delay("500").fadeIn("2000");
            }
        });
    });
    
    // Handlebars + Appel ajax
    
	var sourceKitten = $("#kitten-template").html();
	var templateKitten = Handlebars.compile(sourceKitten);
    
    function success(data){
        
        $("#vote").on("click", ".btn", function(){
            
            var thisBtn = $(this);
            
            function success2(data){
                swal({
                  title: "Merci !",
                  text: data.message + " " + data.details,
                  type: "success"
                });
                $("#vote .btn").attr("disabled", true);
                $(thisBtn).closest(".kitten").addClass("selected");
            } 
            
            function error(data){
                swal({
                  title: "Erreur !",
                  text: data.responseJSON.message + " " + data.responseJSON.details,
                  type: "error"
                });
                $("#vote .btn").attr("disabled", true);
            } 
        
            $.post("https://kittenweekapi-nbwns.c9users.io/api/vote",
                   {
                    kittenname: $(thisBtn).closest(".kitten").data("id"),
                    username: "XavierG"
                   })
              .done(success2)
              .fail(error);
            return false;
            
        });
        
        var html = templateKitten(data);
        $("#vote").append(html);  
        
    }
    
    function erreur(){
	   $("#vote").append("Une erreur est survenue, nous n'avons pas pu charger les chatons");
    } 
    
    function always(){
        $("#kitten-loader").hide();
    }

    $.getJSON(
      "https://kittenweekapi-nbwns.c9users.io/api/kittens",
      {
      }
    )
    .done(success)
    .fail(erreur)
    .always(always);

});