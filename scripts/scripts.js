$(document).ready(function() {
    let date = new Date();
    let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    let today = days[date.getDay()];
    let todayClose = today + "_close";

    $.ajax({
        method: "GET",
        url: 'https://my.api.mockaroo.com/locations.json?key=a45f1200',
        dataType: 'json'
    }).success(function (response) {
        window.apiData = response;

        for (let i = 0; i < response.length; i++) {
            let current = window.apiData[i];
            $("#list").append(`
                <div class="card container" i=${i}>
                    <p class="title">Taco Truck ${current.id}</p>
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
                        123-456-7890
                    </p>
                    <div class="container button-row">
                        <a class="btn btn-secondary buttons directions"
                            href=${'https://www.google.com/maps/dir/?api=1&destination=' + current.address.split(' ').join('+') + '%2C+' + current.city.split(' ').join('+') + '+' + current.state + '+' + current.postal_code}
                            target="_blank"
                            role="button"
                            i=${i}>
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
    });

    // More info button 
    // loads information in map-side

    $(document).on("click", ".moreinfo", function() {
        let position = $(this).attr("i");
        let current = window.apiData[position];
        $("#overlay").css("display", "block");
        $("#overlay").attr("i", position);
        $(".map").css("opacity", ".5");
        $("#overlay").html(`
            <div class="popup">
                <button type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>

                <img id="default-image" src="assets/default-image.png" />
                <br />

                <p class="title">Taco Truck ${current.id}</p>
                <p class="address">
                    ${current.address}
                    <br />
                    ${current.city + ', ' + current.state + ' ' + current.postal_code}
                </p>
                <p class="row">
                    <span class="phone-number">
                        <img src="assets/phone-icon.png" />
                        123-456-7890
                    </span>
                    <span>
                        <a class="phone-number" href=${'https://www.google.com/maps/dir/?api=1&destination=' + current.address.split(' ').join('+') + '%2C+' + current.city.split(' ').join('+') + '+' + current.state + '+' + current.postal_code}
                            target="_blank">
                            <img src="assets/direction-icon.png" />
                            Get Directions
                        </a>
                    </span>
                </p>

                <table>
                    <tr id="monday">
                        <td>Monday</td>
                        <td>${current.monday_open} - ${current.monday_close}</td>
                    </tr>
                    <tr id="tuesday">
                        <td>Tuesday</td>
                        <td>${current.tuesday_open} - ${current.tuesday_close}</td>
                    </tr>
                    <tr id="wednesday">
                        <td>Wednesday</td>
                        <td>${current.wednesday_open} - ${current.wednesday_close}</td>
                    </tr>
                    <tr id="thursday">
                        <td>Thursday</td>
                        <td>${current.thursday_open} - ${current.thursday_close}</td>
                    </tr>
                    <tr id="friday">
                        <td>Friday</td>
                        <td>${current.friday_open} - ${current.friday_close}</td>
                    </tr>
                    <tr id="saturday">
                        <td>Saturday</td>
                        <td>${current.saturday_open} - ${current.saturday_close}</td>
                    </tr>
                    <tr id="sunday">
                        <td>Sunday</td>
                        <td>${current.sunday_open} - ${current.sunday_close}</td>
                    </tr>
                </table>
                <p>
                    <a class="btn btn-secondary btn-block"
                        href=${current.url}
                        target="_blank"
                        role="button">
                        VIEW FULL DETAILS
                    </a>
                </p>
            </div>
        `)
        $(`#${today}`).css("font-weight", "bold");
    });

    // cards from list
    // opens map in map-side

    $(document).on("click", ".card", function(e) {
        let position = $(this).attr("i");
        let latitude = window.apiData[position].latitude;
        let longitude = window.apiData[position].longitude;
        switchListToMap(); 
        if ($("#overlay").attr("i") !== position) {
            $("#overlay").css("display", "none");
        }
        if ($("#overlay").css("display") === "none") {
            $(".map").css("opacity", "1");
        }
        $("#default-map-text").css("display", "none");
        $("#list").addClass("list-hide");
        $("#map-side").css("display", "block");
        $("#after-map").html(`                     
            <a class="btn btn-secondary btn-block moreinfo mobile"
                href="#"
                role="button"
                i=${position}
                >
                MORE INFO
            </a>`)
        $('.map').attr('src', `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&scale=2&size=200x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7clabel:1%7C${latitude},${longitude}&key=AIzaSyDxHzdqfYWJ0G93xVaqVEj3tCp5-oNKTMc`)
    });

    // Button click events

    let switchListToMap = function() {
        $("#list-button").removeClass("nav-selected");
        $("#map-button").addClass("nav-selected");
        $("#list").addClass("list-hide");
    }

    $("#list-button").on("click", function() {
        $(this).addClass("nav-selected");
        $("#map-button").removeClass("nav-selected");
        $("#list").removeClass("list-hide");
        $("#overlay").css("display", "none");
        $("#map-side").css("display", "none");
    });

    $("#map-button").on("click", function() {
        switchListToMap();
        $("#map-side").css("display", "block");
        $("#overlay").css("display", "none");
    });

    $(document).on("click", ".close", function() {
        $("#overlay").css("display", "none");
        $(".map").css("opacity", "1");
    });
});
