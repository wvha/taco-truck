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
                    <div class="container button-row">

                        <a class="btn btn-secondary buttons directions"
                            href="#"
                            role="button"

                            i=${i}
                            latitude=${current.latitude}
                            longitude=${current.longitude}>
                            DIRECTIONS
                        </a>
                        <a class="btn btn-secondary buttons moreinfo"
                            href="#"
                            role="button"

                            i=${i}>
                            MORE INFO
                        </a>

                    </div>
                </div>
            `);
        }

        // target.innerHTML = content;
    });




    
    $(document).on("click", ".directions", function() {
        let position = $(this).attr("i");
        let latitude = window.apiData[position].latitude;
        let longitude = window.apiData[position].longitude;
        $('.map').attr('src', `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&scale=2&size=200x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7clabel:1%7C${latitude},${longitude}&key=AIzaSyDxHzdqfYWJ0G93xVaqVEj3tCp5-oNKTMc`)
    });

    $(document).on("click", ".moreinfo", function() {
        document.getElementById("overlay").style.display = "block";
        let position = $(this).attr("i");
        let current = window.apiData[position];

        $("#overlay").html(`

            <div class="popup">
                <button type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>

                <img id="default-image" src="assets/default-image.png" />
                <br />

                <p>Taco Truck ${current.id}</p>
                <p class="address">
                    ${current.address}
                    <br />
                    ${current.city + ', ' + current.state + ' ' + current.postal_code}
                </p>
                <p class="phone-number">
                    <span>
                        <img src="assets/phone-icon.png" />
                        number??
                    </span>
                    <span>
                        <a href=${current.url}>
                            <img src="assets/direction-icon.png" />
                            Get Directions
                        </a>
                    </span>
                </p>

                <table>
                    <tr>
                        <td>Monday</td>
                        <td>${current.monday_open} - ${current.monday_close}</td>
                    </tr>
                    <tr>
                        <td>Tuesday</td>
                        <td>${current.tuesday_open} - ${current.tuesday_close}</td>
                    </tr>
                    <tr>
                        <td>Wednesday</td>
                        <td>${current.wednesday_open} - ${current.wednesday_close}</td>
                    </tr>
                    <tr>
                        <td>Thursday</td>
                        <td>${current.thursday_open} - ${current.thursday_close}</td>
                    </tr>
                    <tr>
                        <td>Friday</td>
                        <td>${current.friday_open} - ${current.friday_close}</td>
                    </tr>
                    <tr>
                        <td>Saturday</td>
                        <td>${current.saturday_open} - ${current.saturday_close}</td>
                    </tr>
                    <tr>
                        <td>Sunday</td>
                        <td>${current.sunday_open} - ${current.sunday_close}</td>
                    </tr>
                </table>

                <p>
                    <a class="btn btn-secondary btn-block"
                        href="#"
                        role="button">
                        VIEW FULL DETAILS
                    </a>
                </p>
            </div>
        `)
    });

    $("#list-button").on("click", function() {
        console.log('list clicked');
    });

    $("#map-button").on("click", function() {
        console.log('map clicked');
    });

    $(document).on("click", ".close", function() {
        console.log('exit meow');
        $("#overlay").css("display", "none");
    })


    // DEMO
    // $('.map').attr('src', 'https://maps.googleapis.com/maps/api/staticmap?center=32.823943,-117.150259&zoom=13&scale=2&size=200x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:1%7C32.823943,-117.150259')
});



/*

            <p>Taco Truck ${current.id}</p>
            <p class="address">
                ${current.address}
                <br />
                ${current.city + ', ' + current.state + ' ' + current.postal_code}
            </p>

            */