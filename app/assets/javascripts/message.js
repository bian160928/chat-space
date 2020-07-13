$(function(){
  function buildHTML(message){
    console.log(message)
    if ( message.image ) {
      let html =
        `<div class="field">
          <div class="box">
            <div class="name">
              ${message.user_name}
            </div>
            <div class="date">
              ${message.created_at}
            </div>
          </div>
          <div class="mo">
            <p class="list">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="field">
        <div class="box">
          <div class="name">
            ${message.user_name}
          </div>
          <div class="date">
            ${message.created_at}
          </div>
        </div>
        <div class="mo">
          <p class="list">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }


  $('.Form').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST', 
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat__message-content').append(html);
      $('.chat__message-content').animate({ scrollTop: $('.chat__message-content')[0].scrollHeight});
      $("#submit").prop("disabled", true);
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});