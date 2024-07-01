document.addEventListener("DOMContentLoaded", function() {
    const destinations = [
      "Amsterdam", "Athens", "Auckland", "Austin", "Agra", "Alexandria", "Anchorage", "Antwerp", "Asheville", "Abu Dhabi",
    "Barcelona", "Bangkok", "Berlin", "Boston", "Brussels", "Buenos Aires", "Budapest", "Bali", "Bora Bora", "Beijing",
    "Cancun", "Cape Town", "Cairo", "Chicago", "Copenhagen", "Caracas", "Colombo", "Cusco", "Cannes", "Cabo San Lucas",
    "Dubai", "Dublin", "Dallas", "Doha", "Denver", "Detroit", "Dusseldorf", "Durban", "Dakar", "Darwin",
    "Edinburgh", "Edmonton", "El Paso", "Entebbe", "Eugene", "Eindhoven", "Exeter", "Evora", "Essex", "Erfurt",
    "Florence", "Fukuoka", "Frankfurt", "Fresno", "Fort Lauderdale", "Fargo", "Fez", "Funchal", "Fort Worth", "Flagstaff",
    "Geneva", "Glasgow", "Guangzhou", "Guatemala City", "Guayaquil", "Gothenburg", "Goa", "Gold Coast", "Granada", "Gaborone",
    "Hawaii", "Hong Kong", "Helsinki", "Hamburg", "Hanoi", "Ho Chi Minh City", "Houston", "Hyderabad", "Havana", "Hobart",
    "Istanbul", "Innsbruck", "Ibiza", "Islamabad", "Incheon", "Irkutsk", "Indianapolis", "Iquitos", "Islamorada", "Isle of Skye",
    "Jakarta", "Johannesburg", "Juneau", "Jaipur", "Jersey City", "Jeddah", "Jerusalem", "Jacksonville", "Jakarta", "Jinan",
    "Kyoto", "Kuala Lumpur", "Kathmandu", "Krakow", "Kuwait City", "Kobe", "Kochi", "Kiev", "Kingston", "Kigali",
    "London", "Lisbon", "Los Angeles", "Lima", "Lagos", "Lyon", "Luxembourg", "Las Vegas", "Ljubljana", "Lahore",
    "Madrid", "Marrakech", "Melbourne", "Mexico City", "Miami", "Milan", "Montreal", "Munich", "Manila", "Moscow",
    "New York", "New Orleans", "Nairobi", "Naples", "Nashville", "Nice", "Nuremberg", "Nagoya", "New Delhi", "Noumea",
    "Osaka", "Oslo", "Ottawa", "Orlando", "Omaha", "Oklahoma City", "Oaxaca", "Oxford", "Odessa", "Oporto",
    "Paris", "Prague", "Phuket", "Perth", "Porto", "Pune", "Phoenix", "Phnom Penh", "Pittsburgh", "Portland",
    "Quebec City", "Queenstown", "Quito", "Quincy", "Quanzhou", "Quezon City", "Queretaro", "Qingdao", "Quzhou", "Quedlinburg",
    "Rome", "Rio de Janeiro", "Reykjavik", "Riyadh", "Rotterdam", "Riga", "Rabat", "Reno", "Richmond", "Rochester",
    "Sydney", "Singapore", "Seoul", "San Francisco", "San Diego", "Sao Paulo", "Shanghai", "Stockholm", "Santiago", "Seattle",
    "Tokyo", "Toronto", "Taipei", "Tehran", "Tallinn", "Tashkent", "Tel Aviv", "Tbilisi", "Tucson", "Tunis",
    "Utrecht", "Ulaanbaatar", "Udaipur", "Ushuaia", "Uluru", "Uppsala", "Utrecht", "Udon Thani", "Ufa", "Umeå",
    "Vienna", "Vancouver", "Venice", "Valencia", "Varanasi", "Vilnius", "Victoria", "Verona", "Valletta", "Vientiane",
    "Warsaw", "Wellington", "Washington D.C.", "Winnipeg", "Wroclaw", "Wuhan", "Windsor", "Wuxi", "West Palm Beach", "Wichita",
    "Xiamen", "Xian", "Xalapa", "Xinyang", "Xianning", "Xichang", "Xuchang", "Xuzhou", "Xiangyang", "Xinxiang",
    "Yokohama", "Yerevan", "Yangon", "Yogyakarta", "Yellowknife", "Yinchuan", "Yaounde", "Yalta", "York", "Yamagata",
    "Zurich", "Zagreb", "Zanzibar", "Zermatt", "Zaragoza", "Zhangjiajie", "Zagreb", "Zamora", "Zanzibar City", "Zaragoza"

      
    ];

    const searchInput = document.querySelector('.search-bar input[type="search"]');
    let currentFocus;

    searchInput.addEventListener("input", function() {
      const val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;

      const list = document.createElement("DIV");
      list.setAttribute("id", this.id + "autocomplete-list");
      list.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(list);

      destinations.forEach(destination => {
        if (destination.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
          const item = document.createElement("DIV");
          item.innerHTML = "<strong>" + destination.substr(0, val.length) + "</strong>";
          item.innerHTML += destination.substr(val.length);
          item.innerHTML += "<input type='hidden' value='" + destination + "'>";

          item.addEventListener("click", function() {
            searchInput.value = this.getElementsByTagName("input")[0].value;
            closeAllLists();
          });

          list.appendChild(item);
        }
      });
    });

    searchInput.addEventListener("keydown", function(e) {
      const list = document.getElementById(this.id + "autocomplete-list");
      if (list) list = list.getElementsByTagName("div");
      if (e.keyCode === 40) {
        currentFocus++;
        addActive(list);
      } else if (e.keyCode === 38) {
        currentFocus--;
        addActive(list);
      } else if (e.keyCode === 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (list) list[currentFocus].click();
        }
      }
    });

    function addActive(list) {
      if (!list) return false;
      removeActive(list);
      if (currentFocus >= list.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (list.length - 1);
      list[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(list) {
      for (let i = 0; i < list.length; i++) {
        list[i].classList.remove("autocomplete-active");
      }
    }

    function closeAllLists(elmnt) {
      const items = document.getElementsByClassName("autocomplete-items");
      for (let i = 0; i < items.length; i++) {
        if (elmnt !== items[i] && elmnt !== searchInput) {
          items[i].parentNode.removeChild(items[i]);
        }
      }
    }

    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  });