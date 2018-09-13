let date = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let todayClose = days[date.getDay()].toLowerCase() + "_close";

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
            // let date = 
            $("#list").append(`
                <div class="card container">
                    <p>Taco Truck ${current.id}</p>
                    <p class="address">
                        ${current.address}
                        <br />
                        ${current.city + ', ' + current.state + ' ' + current.postal_code}
                    </p>
                    <p class="open-until">
                        Open today until ${current[todayClose]}
                    </p>
                    <p class="phone-number">
                        <img src="assets/phone-icon.png" />
                        number??
                    </p>
                    <p>
                        <a class="btn btn-secondary buttons directions"
                            href="#"
                            role="button"
                            latitude=${current.latitude}
                            longitude=${current.longitude}>
                            DIRECTIONS
                        </a>
                        <a class="btn btn-secondary buttons moreinfo"
                            href="#"
                            role="button">
                            MORE INFO
                        </a>
                    </p>
                </div>
            `);
        }

        // target.innerHTML = content;
    });

    $(document).on("click", ".directions", function() {
        console.log('hello clicked');
        let latitude = $(this).attr("latitude");
        let longitude = $(this).attr("longitude");
        console.log(latitude, longitude);
        $('.map').attr('src', `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&scale=2&size=200x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7clabel:1%7C${latitude},${longitude}`)
        // $('.map').attr('src', 'https://maps.googleapis.com/maps/api/staticmap?center=32.823943,-117.150259&zoom=13&scale=2&size=200x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:1%7C32.823943,-117.150259')
    });

    $(document).on("click", ".moreinfo", function() {
        console.log('more info clicked');
    });


    // DEMO
    // $('.map').attr('src', 'https://maps.googleapis.com/maps/api/staticmap?center=32.823943,-117.150259&zoom=13&scale=2&size=200x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:1%7C32.823943,-117.150259')
});


