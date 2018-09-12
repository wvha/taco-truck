$(document).ready(function() {
    $.ajax({
        method: "GET",
        url: 'https://my.api.mockaroo.com/locations.json?key=a45f1200',
        dataType: 'json'
    }).success(function (response) {
        // console.log(response);
        window.apiData = response;
        console.log('apidata: ', apiData);
        let target = document.getElementById("list");
        

        for (let i = 0; i < response.length; i++) {
            let current = window.apiData[i];
            let date = 
            $("#list").append(`
                <div class="card container" style="width: 90%;">
                    <p>Taco Truck ${current.id}</p>
                    <p class="address">
                        ${current.address}
                        <br />
                        ${current.city + ', ' + current.state + ' ' + current.postal_code}
                    </p>
                    <p class="open-until">
                        Open today until 
                    </p>
                    <p>
                        <img class="assets/phone-icon.png" />
                        number??
                </div>
            `);
        }

        // target.innerHTML = content;
    });

    // DEMO
    $('.map').attr('src', 'https://maps.googleapis.com/maps/api/staticmap?center=32.823943,-117.150259&zoom=13&scale=2&size=200x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:1%7C32.823943,-117.150259')
});