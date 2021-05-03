$(document).ready(() => {
    new WOW().init();
});
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});
$('.popover-dismiss').popover({
    trigger: 'focus'
});
let layers_html = $(``)
$('#layers_btn').popover({
    html: true,
    trigger: 'click',
    placement: 'bottom',
    content: function () { return layers_html; }
});
const token = $('#csrf_input').val();

$.ajax({
    url: "/api/katmanlar/",
    headers: {
        "X-CSRF-Token": token
    },
    method: 'POST',
    success: function(result){
        const wrapper = $(`<div></div>`)
        result.map(e => {
            const card = $(`
            <!-- Card -->
            <div class="card promoting-card" data-url="${e.url}" data-icon="${e.icon}" style="cursor: pointer" onclick="addDataToMap(this.dataset.url, this.dataset.icon)">
              <!-- Card image -->
              <div class="view overlay">
                <img class="card-img-top rounded-0" src="${e.img}" alt="Card image cap" style="width: 150px; height: 120px">
                <a href="#!">
                  <div class="mask rgba-white-slight"></div>
                </a>
              </div>
              <!-- Card content -->
              <div class="card-body">            
                <div class="collapse-content">            
                  <!-- Text -->
                  <p style="font-size: large" class="card-text collapse" id="collapseContent">${e.name}</p>     
                </div>
              </div>            
            </div>
            <!-- Card -->
            `);
            card.appendTo(wrapper);
        });
        layers_html = wrapper;
    }
});