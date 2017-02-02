$(document).ready(function() {
  $.fn.editable.defaults.mode = 'inline';

  //url parameter readers to get event id
  var url = $(location).attr('href').split( '/' );
  var username = url[url.length-2]

  //for the category option
  //make it a json object when free
  //alternatively, can add others when not in the list :D
  let catArr = ["#basketball", "#baseball", '#badminton', '#soccer','#yoga','#etc']

  $('#name, #email, #description').editable({
    send:"always",
    url: "/profile/" + username + "/edit/true",
    success: function(response, newValue) {
      console.log(newValue, "newValue");
      //check the value parameters here, dont let it go through if cannot read doc
      return newValue + " updated";
    },
  });


  //
  // $('#title, #location').editable({
  //   send:"always",
  //   url: "/event/" + id + "/edit/",
  //   success: function(response, newValue) {
  //     console.log(newValue, "newValue");
  //     return newValue + " updated";
  //   },
  //   display: function(value, response) {
  //       //render response into element
  //       $(this).html(response);
  //   },
  //     // bootbox.prompt({
  //     //   size: "small",
  //     //   title:"confirm your title change to from " + $('#title').text() + " to " + params.value ,
  //     //   callback: function(result){
  //     //     console.log($('#title').data('editable'));
  //     //   }
  //     // })
  //   });

  console.log("edit js run");

  $('#interests').editable({
        inputclass:'input-large',
        select2: {
            placeholder: 'Select Category',
            tags: true,
            multiple: true,
            data: catArr,
            tokenSeparators: [",", " "]
        },
        send:"always",
        url: "/profile/" + username + "/edit/true",
        success: function(response, newValue) {
          console.log(newValue, "newValue");
          //check the value parameters here, dont let it go through if cannot read doc
          return newValue + " updated";
        },
    });
})





  //For bootbox. maybe i can ask what is your password. :)
//   bootbox.prompt({
//   size: "small",
//   inputType:"password",
//   title: "Please enter your password before making any changes?",
//   callback: function(result){ /* result = String containing user input if OK clicked or null if Cancel clicked */
//     if(result == null){
//
//     }else{
//
//     }
//   }
// })
